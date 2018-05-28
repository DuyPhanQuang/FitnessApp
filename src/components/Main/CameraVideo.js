import React, { Component } from 'react';
import { 
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Platform,
  StyleSheet,
  PermissionsAndroid
} from 'react-native';
import { 
  Icon,
  Left,
  Right,
  Body
} from 'native-base';
import { RNCamera } from 'react-native-camera';
import IconEN from 'react-native-vector-icons/Entypo';
import IconFT from 'react-native-vector-icons/Feather';
import { NavigationActions } from 'react-navigation';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class CameraVideoScreen extends Component {
    constructor(props) {
      super(props);
      this.navigation = props.navigation;
      this.camera = null;
      this.state = {
        camera: {
          aspect: 'fill',
          type: RNCamera.Constants.Type.back,
          flashMode: RNCamera.Constants.FlashMode.auto,
          captureTarget: (Platform.OS === 'ios') ? 'temp' : 'cameraRoll',
          // orientation: Camera.constants.Orientation.auto,
          isWaitToSave: true
        },
        sketch: {
          strokeColor: '#fff',
          thickness: 2
        },
        isModal: false,
        isSketch: false,
        isRecording: false,
        path: null
        };
        
    }


    takePicture = async () => {
      if (this.camera) {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync();
      }
    }

    startCapture = async () => {
      const options = {mute: false, mode: RNCamera.Constants.VideoQuality["460p"]}
      if (this.camera) {
        const data = await this.camera.recordAsync(options, this.camera._cameraHandle);
        this.setState({
          isRecording: true
  
        });
  
      }
    }

    stopRecording = () => {
       if (this.camera) {
        this.camera.stopRecording();
        this.setState({
           isRecording: false
        });
       }
    }

    switchType() {
      let newType;
      const { back, front } = RNCamera.Constants.Type;

      if (this.state.camera.type === back) {
          newType = front;
      } else if (this.state.camera.type === front) {
          newType = back;
      }

      this.setState({
          camera: {
            ...this.state.camera,
            type: newType
          }
      }, () => {
      });
    }

    render() {
      return (
        <View style={styles.container}>
            <RNCamera
            ref={(cam) => { this.camera = cam }}
            style={styles.preview}
            aspect='fill'
            captureAudio={true}
            captureTarget={this.state.camera.captureTarget}
            type={this.state.camera.type}
            defaultTouchToFocus
            mirrorImage={false}
            useCamera2Api={true}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            permissionDialogTitle={'Permission to use camera'}

            >
              <View style={{ justifyContent: 'flex-end', paddingVertical: 3 }}>
                <TouchableOpacity style={styles.captureButton} onPress={this.takePicture}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='ios-camera' style={{ fontSize: 30, }} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.captureButton} onPress={this.stopRecording}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <IconFT name='camera-off' style={{ fontSize: 15, color: 'black' }} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.captureButton} onPress={this.startCapture}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <IconEN name='video-camera' style={{ fontSize: 15, color: 'black' }} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.captureButton} onPress={() => this.switchType()}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='ios-reverse-camera' style={{ fontSize: 30 }} />
                  </View>
                </TouchableOpacity>
            </View>
            </RNCamera>
            
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  preview: {
    flex: 1,
    position: 'relative'
  },
  overlay: {
    padding: 15,
    position: 'absolute'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: 60,
    width: deviceWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  },
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20
  },
  captureButton: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 25
  }
});
