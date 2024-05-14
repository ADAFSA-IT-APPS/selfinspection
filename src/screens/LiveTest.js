import React, { Component } from 'react';
import { StyleSheet, Text, Alert, TouchableHighlight, Dimensions, View, TouchableOpacity,/*  ListView, */ Image, TextInput } from 'react-native';
import { RTCView } from 'react-native-webrtc';
import Thumbnails from '../Components/Thumbnails';
import FullScreenVideo from "../Components/FullScreenVideo";
import styles from "../style/app";
import Navbar from '../Components/Navbar/Navbar';
import NavigationService from '../navigation/NavigationService';
import socket from 'socket.io-client/lib/socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart'
import { activateKeepAwake, deactivateKeepAwake} from "@sayem314/react-native-keep-awake";

const dimensions = Dimensions.get('window')

const FRONT_CAMERA = true;
const webRTCServices = require("../../src/assets/lib/services");
//const VIDEO_CONFERENCE_ROOM = "12345";

const SELF_STREAM_ID = "self_stream_id";

export default class LiveTest extends Component {

  constructor(props) {
    super(props);
    this.closeCall=this.closeCall.bind(this);
    this.state = {
      activeStreamId: null,
      //streamURLs: sampleStreamURLs,
      streams: [], //list of (id, url: friend Stream URL). Id = socketId
      joinState: "ready", //joining, joined
      //  joinState: "joined", //joining, joined
      name: "",
      mic: false,
      localStream: null,
      callData :props?.route?.params?.callData,
      VIDEO_CONFERENCE_ROOM:null
    }
  }

  componentDidMount() {
    webRTCServices.getLocalStream(true, (stream) => {
      console.log('stream', stream);
      console.log('callData from livetest',this.state?.callData.caller );
      this.setState({
        activeStreamId: SELF_STREAM_ID,
        localStream: stream,
        VIDEO_CONFERENCE_ROOM:this.state?.callData?.roomId,
        name:this.state?.callData?.caller,
        streams: [{
          id: SELF_STREAM_ID,
          url: stream.toURL(),
          
        }]
      })
    });

  }

  render() {
    let activeStreamResult = this.state.streams.filter(stream => stream.id == this.state.activeStreamId);
    return <View style={styless.container}>
      <Image source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }} blurRadius={3} style={styles.backgroundImage} />
      <View style={styles.backgroundOverlay} />
      <Navbar nav={'tab'} />

      {
        this.state.joinState == "joined" ?
          <>
            <FullScreenVideo friendLeft={this.closeCall} stream={this.state.localStream} streamURL={activeStreamResult.length > 0 ? activeStreamResult[0].url : null} />


          </>
          :
          null
      }
      {
        this.state.joinState == "joined" ?
          <Thumbnails streams={this.state.streams}
            setActive={this.handleSetActive.bind(this)}
            activeStreamId={this.state.activeStreamId} />
          :
          null
      }
      {this.renderJoinContainer()}
    </View>
  }


  renderJoinContainer() {
    if (this.state.joinState != "joined") {
      return <View style={styles.joinContainer}>
        <Text style={styles.joinLabel}>Be the first to join this conversation</Text>
        <TextInput style={styles.joinName}
          placeholder={"Enter your name"} placeholderTextColor={"#888"}
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name} 
          editable = {false}/>
        <TouchableHighlight style={styles.joinButton}
          onPress={this.handleJoinClick.bind(this)}>
          <Text style={styles.joinButtonText}>{this.state.joinState == "ready" ? "Join" : "Joining..."}</Text>
        </TouchableHighlight>
      </View>
    }
    return null;
  }

  handleSetActive(streamId) {
    this.setState({
      activeStreamId: streamId
    });
  }

  stopTracks = (stream) => {
    stream.getTracks().forEach(track => track.stop())
  }
  async closeCall(stream) {
    console.log('close call clicked', this.state?.streams);
    let userToken = await AsyncStorage.getItem('userToken');
    // setTimeout(() => {
    //   console.log('usertoken from livetest', userToken);
    // }, 1000);

    Alert.alert("", "Are you sure you want to Disconnect the call?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      {
        text: "YES", onPress: () => {
          deactivateKeepAwake();
          if (userToken === null) {
            stream.getTracks().forEach(track => track.stop())
            
            this.setState({
              streams:[]
            })
            this.handleFriendLeft(stream);
            // setTimeout(() => {
            //   console.log('state from livetest streams',this.state.streams );
            // }, 1000);
            NavigationService.navigate('Login');
            RNRestart.Restart()
          } else {
            stream.getTracks().forEach(track => track.stop())
            this.handleFriendLeft(stream);

            this.setState({
              streams:[]
            }) 
            NavigationService.navigate('Dashboard');
            RNRestart.Restart()
          }
        }
      }
    ]);

    // webRTCServices.leave(stream.id)
  }
  handleJoinClick() {
    console.log('join function', );
    activateKeepAwake();
    if (this.state.name?.length == 0 || this.state.joinState != "ready") {
      console.log('return from ready', );
      return;
    }
    //ELSE:  
    this.setState({
      joinState: "joining"
    });
    let callbacks = {
      joined: this.handleJoined.bind(this),
      friendConnected: this.handleFriendConnected.bind(this),
      friendLeft: this.handleFriendLeft.bind(this),
      dataChannelMessage: this.handleDataChannelMessage.bind(this)
    }
    webRTCServices.join(this.state.VIDEO_CONFERENCE_ROOM, this.state.name, callbacks);
  }

  //----------------------------------------------------------------------------
  //  WebRTC service callbacks
  handleJoined() {
    console.log("Joined");
    this.setState({
      joinState: "joined"  
    });   
  }

  handleFriendLeft(socketId) {
    console.log('left from client',);
    let newState = {
      streams: this.state.streams.filter(stream => stream.id != socketId)
    }
    if (this.state.activeStreamId == socketId) {
      newState.activeStreamId = newState.streams[0].id;
    }
    this.setState(newState);
  }

  handleFriendConnected(socketId, stream) {
    console.log('handleFriendConnected', stream.toURL());
    this.setState({
      streams: [
        ...this.state.streams,
        {
          id: socketId,
          url: stream.toURL()
        }
      ]
    })

    // setTimeout(() => {
    //   console.log('streams', this.state.streams.length);
    // }, 2000)
  }

  handleDataChannelMessage(message) {

  }
}
const styless = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: 'red',
    borderWidth: 10
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
