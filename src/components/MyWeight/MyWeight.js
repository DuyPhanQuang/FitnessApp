import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import Picker from 'react-native-picker';
import { DEVICE_HEIGHT } from '../Constants/AppConstants';

export default class MyWeight extends Component {
    constructor(props, context) {
        super(props, context);
    }

    _createWeightData() {
        let weight = [];
        for(var i=0;i<300;i++){
            weight.push(i);
        }
        return weight;
    }
    render() {
        return (
            <View style={{ flex: 1, height: DEVICE_HEIGHT, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                //   onPress={this._showWeightPicker.bind(this)}
                  style={{ marginTop: 40, marginLeft: 20 }}
                >
                    <Text style={{ color: '#F66D6A', fontSize: 25 }}>Please select your weight!</Text>
                </TouchableOpacity>
            </View>
        );
    }
}