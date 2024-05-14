import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Linking, Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Navbar from '../Components/Navbar/Navbar';
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
import Icon from 'react-native-vector-icons/FontAwesome5';
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client'
import axios from 'axios';
import NavigationService from '../navigation/NavigationService';

const dimensions = Dimensions.get('window')
const callscreen = "SI://app/CallScreen"
const Live = props => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState(null);
  const [mic, setMic] = useState(false);
  const [name, setName] = useState('')
  const [roomId, setRoomId] = useState(null)
  const [socketId, setSocketId] = useState(null)
  const [peerConnections, setPeerConnections] = useState({})
  // console.log('props from live main', props?.route?.params?.callData);
  const callData = props?.route?.params?.callData;


  let sdp;
  let socket = null
  let candidates = [];

  useEffect(() => {

    //  console.log('param from liveScreen', callData?.data?.roomId);

    if (callData?.data) {
      setName(callData.data.caller)
      setRoomId(callData.data.roomId)
    }


    // join(roomId ? caller : 12345, name ? name : 'naz', 'Mobile')

    join(12345, 'client', 'Mobile')

    socket.emit("join", function (friend) {
      //new friend:
      console.log("New friend joint conversation: ", friend);
      candidates.push(friend);


    });

  }, [])

  const join = (roomId, name, type, callback) => {

    socket = io(
      //  'wss://adremoteinspection.com',
      'https://6205-2a00-f28-4e0-66b4-5538-b3e-3ac0-1692.in.ngrok.io'
      //  'https://adremoteinspection.com:443',
    )


    socket.on("connect", () => {
      console.log('socket connected', socket.connected, socket.id); // true
      setSocketId(socket.id)
      console.log('socketid', socketId);
      getLocalStream()


      socket.emit('join', { roomId, name }, function (result) {

        candidates = result;

        console.log('Joins List from client', candidates);


      });

      createPeerConnection(socket.id, pc => {
        console.log('pc from create peerconnection', pc, socket.id);
        console.log('id from create peerconnection', socket.id);
        if (pc) {

          pc.createOffer({ offerToReceiveVideo: 1, OfferToReceiveAudio: 1 })
            .then(sdp => {
              pc.setLocalDescription(sdp)

              socket.emit('exchange', { to: socket.id, sdp: sdp })

            })
        }
      })

      socket.on('exchange', data => {
        // get remote's peerConnection
        createPeerConnection(data.socketID, pc => {
          pc.addStream(localStream)

          pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {
            // 2. Create Answer
            pc.createAnswer({ offerToReceiveVideo: 1, OfferToReceiveAudio: 1 })
              .then(sdp => {
                pc.setLocalDescription(sdp)

                socket.emit('exchange', { to: socket.id, sdp: sdp })

              })
          })
        })
      })

      socket.on('exchange', (data) => {
        // get remote's peerConnection
        // const pc = peerConnections[data.to]
        console.log('RTCIceCandidate(data.candidate)', data);
        // if (pc)
        pc.addIceCandidate(new RTCIceCandidate(data.candidate))
      })

    });




  }


  const createAnswer = () => {
    console.log('Answer')
    pc.createAnswer({ offerToReceiveVideo: 1 })
      .then(sdp => {
        console.log('client createAnswer', JSON.stringify(sdp))

        // set answer sdp as local description
        pc.setLocalDescription(sdp)
        socket.emit('exchange', { sdp: sdp })

        // sendToPeer('offerOrAnswer', sdp)
      })
  }


  const createPeerConnection = (socketId, callback) => {
    const pc_config = {
      "iceServers": [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    }
    const pc = new RTCPeerConnection(pc_config)
    //peerConnections[socketId] = pc;

    const peerConnections = { ...peerConnections, [socketId]: pc }
    //setPeerConnections(peerConnections);

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit('exchange', { to: socketId, candidate: e.candidate });
      }
    }

    pc.oniceconnectionstatechange = (e) => {
    }


    if (localStream) {
      pc.addStream(localStream)
    }

    pc.onaddstream = (e) => {
      debugger
      console.log('remote stream onaddstream', e.stream);

      let remoteVideo = {}

      remoteVideo = {
        id: socketID,
        name: socketID,
        stream: e.stream,
      }
      remoteStreams = [...remoteStreams, remoteVideo]
    }


    //  return pc
    callback(pc)
  }





  const micChange = () => {
    localStream._tracks[1].enabled = !localStream._tracks[1].enabled
    console.log('localStream._tracks[1]._switchCamera()', localStream._tracks[1].enabled);
    setMic(!mic)
  }

  const getLocalStream = () => {
    const success = (stream) => {
      console.log('tourl', stream.toURL())
      setLocalStream(stream)
    }

    const failure = (e) => {
      console.log('getUserMedia Error: ', e)
    }

    let isFront = true;
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

      //   createAnswer();

    });
  }
  return (

    <View style={{ flex: 1, }}>

      <Navbar nav={'tab'} />

      <View style={{ height: dimensions.height / 2 }}>

        <ScrollView style={{ ...styles.scrollView }}>
          <View style={{
            flex: 1,
            width: '100%',
            height: '100%',
            /*   backgroundColor: 'black', */
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {remoteStream ?
              (
                <RTCView
                  key={2}
                  mirror={true}
                  style={styles.rtcViewRemote}
                  objectFit='contain'
                  streamURL={remoteStream && remoteStream.toURL()}
                />
              ) :
              (
                <View style={{ padding: 15, }}>
                  <Text style={{ fontSize: 22, textAlign: 'center', color: 'white' }}>Waiting for Peer connection ...</Text>
                </View>
              )}
          </View>
        </ScrollView>
      </View>
      <View style={{ ...styles.buttonsContainer }}>
        <TouchableOpacity onPress={() => micChange()} style={{ padding: 10, borderRadius: 50 }}>
          {mic ? <Icon name='microphone' color="gray" size={30} /> : <Icon name='microphone-slash' color="gray" size={30} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => NavigationService.navigate('Join')} style={{ backgroundColor: 'red', padding: 10, borderRadius: 50 }}>
          <Icon name='phone' color="white" size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => localStream && localStream._tracks[1]._switchCamera()} style={{ padding: 10, borderRadius: 50 }}>
          <Icon name='camera-retro' color="gray" size={30} />
        </TouchableOpacity>
      </View>

      <View style={{
        position: 'absolute',
        zIndex: 1,
        bottom: 10,
        left: 10,

        backgroundColor: 'black',
      }}>
        <View style={{ flex: 1, width: 120, height: 120, }}>
          <TouchableOpacity onPress={() => localStream?._tracks[1]?._switchCamera()/* localStream?setLocalStream(remoteStream&& remoteStream.toURL()):setRemoteStream(localStream&& localStream.toURL()) */}>
            <View>
              <RTCView
                key={1}
                zOrder={0}
                objectFit='cover'
                style={{ ...styles.rtcView }}
                streamURL={localStream && localStream.toURL()}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );






};

const styles = StyleSheet.create({
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  button: {
    margin: 5,
    paddingVertical: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  textContent: {
    fontFamily: 'Avenir',
    fontSize: 20,
    textAlign: 'center',
  },
  videosContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: dimensions.height / 2
  },
  rtcView: {
    width: '100%', //dimensions.width,
    height: '100%',//dimensions.height / 2,
    backgroundColor: 'black',
  },
  scrollView: {
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: 'teal',
    /* height:'100%', */
    /* padding: 15, */
  },
  rtcViewRemote: {
    width: '100%',
    height: 400,
    backgroundColor: 'black',
  }
});

export default Live;



