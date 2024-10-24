import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View,/*  ListView, */ Image } from 'react-native';
import { RTCView } from 'react-native-webrtc';
import config from "../../src/assets/config/app";
import styles from "../style/fullScreenVideo";
import ListView from 'deprecated-react-native-listview'
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InCallManager from 'react-native-incall-manager';


export default class FullScreenVideo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mic: true,
      speaker: false,
      camera: false
    };
  }

  render() {
    //console.log('active stream',this.props.stream.getTracks());
    return <View style={styles.container}>
      {
        config.useRCTView ?
          <>
            <RTCView streamURL={this.props.streamURL} style={{
              width: '100%', height: '55%', /* borderColor: 'gray',
              borderWidth: 10, */
            }} />
            <View style={{ ...styless.buttonsContainer }}>
              <TouchableOpacity onPress={() => {
                let audioTrack = this.props.stream.getTracks().filter(track => track.kind === 'audio')
                audioTrack[0].enabled = !audioTrack[0].enabled
                this.setState({
                  mic: audioTrack[0].enabled
                })
                // alert(this.state.mic)
              }
              } style={{ padding: 10, borderRadius: 50 }}>
                {this.state.mic ? <Icon name='microphone' color="white" size={30} /> : <Icon name='microphone-slash' color="gray" size={30} />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.friendLeft(this.props.stream)} style={{ backgroundColor: 'red', padding: 10, borderRadius: 50 }}>
                <Icon name='phone' color="white" size={20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.setState({ speaker: !this.state.speaker });
                //let enable = (this.state.speaker === true) ? true : false;
                 InCallManager.setSpeakerphoneOn(this.state.speaker)
              }} style={{ backgroundColor: this.state.speaker ? 'white' : 'transparent', padding: 10, borderRadius: 50 }}>
                <Icon name='volume-up' color={this.state.speaker ? 'black' : 'white'} size={25} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.setState({ camera: !this.state.camera })
                this.props.stream && this.props.stream._tracks[1]._switchCamera()
              }
              } style={{ padding: 10, borderRadius: 50 }}>

                {
                  this.state.camera ? <Icon name='camera-retro' color="white" size={30} /> : <MaterialCommunityIcons name="camera-flip-outline" color="#fff" size={32} />
                }


              </TouchableOpacity>
            </View>
          </>
          :
          <Image source={this.props.streamURL} style={styles.video} resizeMode={"contain"} />
      }
    </View>
  }
}

const styless = StyleSheet.create({
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

})
