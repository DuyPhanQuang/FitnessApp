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
      console.log('check dd', this.camera.takePictureAsync);
      if (this.camera) {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync();
        console.log('check data takepictur', data);
      }
    }

    startCapture = async () => {
      console.log('check', this.camera);
      const options = {mute: false, maxDuration: 10, mode: RNCamera.Constants.VideoQuality["460p"]}
      if (this.camera) {
        const data = await this.camera.recordAsync(options, this.camera._cameraHandle).
        then((data) => console.log('check data', data));
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
      console.log('check init type', this.state.camera.type);
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
              <View style={{ justifyContent: 'flex-end' }}>
                <TouchableOpacity style={styles.captureButton} onPress={this.takePicture}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='ios-camera' style={{ fontSize: 30, }} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.captureButton} onPress={this.startCapture}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name='ios-camera' style={{ fontSize: 30, }} />
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
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25
  }
});
