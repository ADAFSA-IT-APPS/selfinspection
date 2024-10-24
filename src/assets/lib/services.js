/**
 * rewebrtc-server project
 *
 * Tho Q Luong <thoqbk@gmail.com>
 * Feb 12, 2017
 */

window.navigator.userAgent = 'react-native';
import io from 'socket.io-client'

const IS_BROWSER = (module == null || module.exports == null);

let WebRTC = null;

WebRTC = require('react-native-webrtc');


import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
} from 'react-native-webrtc';

let socket = null;
let onFriendLeftCallback = null;
let onFriendConnectedCallback = null;
let onDataChannelMessageCallback = null;


if (IS_BROWSER) {
    socket = io({ allowEIO3: true });

} else {
    //const socketIOClient = require('socket.io-client');
    //socket = socketIOClient('https://rewebrtc.herokuapp.com', {transports: ['websocket'], jsonp: false});
    socket = io(
        //  'ws://adremoteinspection.com', {
        //     transports: ["websocket"]
        //   }
        //  'https://f23f-2001-8f8-152f-226d-b8ac-76a1-fae8-1f81.in.ngrok.io'
        'https://adremoteinspection.com', { secure: true, timeout: 50000, upgrade: false }
        //    'https://rewebrtc.herokuapp.com', 
    )
}

var configuration = {
    "iceServers": [{
        urls: 'turn:adremoteinspection.com:3478?transport=udp',
        credential: 'ADFCA@1234',
        // credential: 'Adafsa@123456',
        username: 'ADFCA'
    },
    {
        urls: 'stun:adremoteinspection.com:3478?transport=udp',
        credential: 'ADFCA@1234',
        // credential: 'Adafsa@123456',
        username: 'ADFCA'
  //  urls: "stun:stun.l.google.com:19302"
/* "url": 'turn:192.158.29.39:3478?transport=udp',
credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
username: '28224511:1379330808' */ }]
};
var peerConnections = {}; //map of {socketId: socket.io id, RTCPeerConnection}
let localStream = null;
let friends = null; //list of {socketId, name}
let me = null; //{socketId, name}

function createPeerConnection(friend, isOffer, onDataChannelMessage) {
    console.log('isOffer', isOffer)
    let socketId = friend.socketId;
    var retVal = new RTCPeerConnection(configuration);
    peerConnections[socketId] = retVal;

    retVal.onicecandidate = function (event) {
        // console.log('onicecandidate',event);
        if (event.candidate) {
            socket.emit('exchange', { 'to': socketId, 'candidate': event.candidate });
        }
    };

    function createOffer() {
        console.log('in offer');
        retVal.createOffer({ offerToReceiveVideo: 1, OfferToReceiveAudio: 1 })
            .then(sdp => {
                console.log('createOffer', sdp);
                retVal.setLocalDescription(sdp)
                socket.emit('exchange', { to: socketId, sdp: sdp })
            })
    }

    retVal.onnegotiationneeded = function () {
        console.log('onnegotiationneeded check', isOffer);
        if (isOffer) {
            console.log('test offer',);
            createOffer();
        }
    }

    retVal.oniceconnectionstatechange = function (event) {
        console.log('oniceconnectionstatechange');
        console.log('peerc', peerConnections.iceConnectionState, event);
        if (event.target.iceConnectionState === 'failed') {

            // createDataChannel();
            // createOffer();

        }
    };

    retVal.onsignalingstatechange = function (event) {
        console.log('onsignalingstatechange');
    };

    retVal.onaddstream = function (event) {
        console.log('onaddstream', event);
        //var element = document.createElement('video');
        //element.id = "remoteView" + socketId;
        //element.autoplay = 'autoplay';
        //element.src = URL.createObjectURL(event.stream);
        //remoteViewContainer.appendChild(element);
        if (onFriendConnectedCallback != null) {
            onFriendConnectedCallback(socketId, event.stream);
        }
    };

    retVal.addStream(localStream);



    return retVal;
}

function exchange(data) {
    console.log('exchange data', data);
    var fromId = data.from;
    var pc;
    if (fromId in peerConnections) {
        pc = peerConnections[fromId];
    } else {
        let friend = friends.filter((friend) => friend.socketId == fromId)[0];
        if (friend == null) {
            friend = {
                socketId: fromId,
                name: ""
            }
        }
        pc = createPeerConnection(friend, false);
    }

    if (data.sdp) {
        console.log('exchange sdp>>>>>>', data.sdp);
        // pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
        //     console.log('pc.remoteDescription.type',pc.remoteDescription.type );
        //     if (pc.remoteDescription.type == "offer")
        //         pc.createAnswer(function (desc) {
        //             console.log('createAnswer', desc);
        //             pc.setLocalDescription(desc, function () {
        //                 //console.log('setLocalDescription', pc.localDescription);
        //                 socket.emit('exchange', { 'to': fromId, 'sdp': pc.localDescription });
        //             }, logError);
        //         }, logError);
        // }, logError);


        pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {
            // 2. Create Answer
            console.log('pc.setRemoteDescription', pc.remoteDescription.type);
            if (pc.remoteDescription.type == "offer")
                pc.createAnswer({ offerToReceiveVideo: 1, OfferToReceiveAudio: 1 })
                    .then(sdp => {
                        console.log('createAnswer', sdp);
                        pc.setLocalDescription(sdp).then(desc => {
                            console.log('desc from answer', sdp);
                            socket.emit('exchange', { 'to': fromId, 'sdp': sdp });
                        })
                    })
        })
    } else {
        console.log('exchange candidate', data);
        pc.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
}

function leave(socketId) {
    console.log('leave', socketId);
    var pc = peerConnections[socketId];
    pc.close();
    delete peerConnections[socketId];
    if (onFriendLeftCallback != null) {
        onFriendLeftCallback(socketId);
    }
}

socket.on('exchange', function (data) {
    exchange(data);
});

socket.on("reconnect_attempt", (err) => {
    //console.log('reconnect from client', err);
});

socket.on("connect_error", (err) => {
    // console.log('connect_error due to',err);
});

socket.on('leave', function (socketId) {
    leave(socketId);
});

socket.on('connect', function (data) {
    console.log('connect client');
});

socket.on("join", function (friend) {
    //new friend:
    friends.push(friend);
    console.log("New friend joint conversation: ", friend);
});

function logError(error) {
    console.log("logError", error);
}

//------------------------------------------------------------------------------
//  Utils

//------------------------------------------------------------------------------
// Services
function countFriends(roomId, callback) {
    socket.emit("count", roomId, (count) => {
        console.log("Count friends result: ", count);
        callback(count);
    });
}



function getLocalStream(isFront, callback) {
    const success = (stream) => {
        console.log('tourl', stream.toURL())
        localStream = stream;
        callback(stream);
    }
    const failure = (e) => {
        console.log('getUserMedia Error: ', e)
    }
    // let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
        let videoSourceId;
        for (let i = 0; i < sourceInfos.length; i++) {
            const sourceInfo = sourceInfos[i];
            if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
                videoSourceId = sourceInfo.deviceId;
            }
        }
        const constraints = {
            audio: true,
            video: {
                mandatory: {
                    minWidth: 500, // Provide your own width, height and frame rate here
                    minHeight: 300,
                    minFrameRate: 30
                },
                facingMode: (isFront ? "user" : "environment"),
                optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
            }
        }
        mediaDevices.getUserMedia(constraints)
            .then(success)
            .catch(failure);
    });
}

function broadcastMessage(message) {
    for (var key in peerConnections) {
        var pc = peerConnections[key];
        pc.textDataChannel.send(JSON.stringify(message));
    }
}

/**
 *
 * callbacks: {
 *    joined: function of () => {},
 *    friendConnected: (socketId, stream) => {},
 *    friendLeft: (socketId) => {},
 *    dataChannelMessage: (message) => {}
 * }
 *
 */
function join(roomId, name, callbacks) {
    onFriendLeftCallback = callbacks.friendLeft;
    onFriendConnectedCallback = callbacks.friendConnected;
    onDataChannelMessageCallback = callbacks.dataChannelMessage;
    console.log('join from services',);
    console.log('socket connect check', socket);
    socket.emit('join', { roomId, name }, function (result) {
        console.log('join from socket',);
        friends = result;
        console.log('Joins', friends);
        friends.forEach((friend) => {
            createPeerConnection(friend, true);
        });
        if (callbacks.joined != null) {
            me = {
                socketId: socket.id,
                name: name
            }
            callbacks.joined();
        }
    });
}
//------------------------------------------------------------------------------
// Exports
if (!IS_BROWSER) {
    module.exports = {
        join,
        countFriends,
        getLocalStream,
        broadcastMessage
    }
}
