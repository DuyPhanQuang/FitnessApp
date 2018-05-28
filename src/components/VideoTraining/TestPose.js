import React, { Component } from 'react';
import { 
  View,
  Text, 
  Image, 
  Dimensions,
  ImageBackground,
  StyleSheet
} from 'react-native';
import { 
  Icon
} from 'native-base';
// import * as posenet from '@tensorflow-models/posenet';

const imageScaleFactor = 0.5;
const outputStride = 16;
const flipHorizontal = false;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class TestPose extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Image
          ref={i => this.image = i}
          source={require('../../../assets/dumbbell.jpg')}
          style={{ width: deviceWidth, height: deviceHeight }}
        />
      </View>     
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1
  }
});