import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar
} from 'react-native';
import icApp from '../../Media/appicon/ic_app.png';
import { APP_THEME } from '../Constants/Color';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../Constants/AppConstants';

StatusBar.setHidden(true);

export default class StepOne extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            loading: false,
        });
    }
    render() {
        const {
            container, one, two, three,
            iconStyle, btnStyle, textBtnStyle
        } = styles;
        const { navigate } = this.props.navigation;
        return (
            <View style={container}>
                <View style={{ flex: 1 }}>
                    <Text style={one} >Hello</Text>
                </View>
                <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={icApp} style={iconStyle} />
                    <Text style={two} >Welcome to Fitness{'\n'} for Weight Loss!</Text>
                </View>
                
                <TouchableOpacity
                  onPress={
                      () => {
                        if (this.state.loading === false) {
                            this.setState({ loading: true }, async () => {
                                setTimeout(async () => {
                                    navigate('ManHinh_Fitness');
                                    this.setState({ loading: false });
                                }, 500);
                            });
                        }
                      }
                  }
                  style={btnStyle}
                >   
                    <View style={{ flex: 1 }}>
                        <Text style={textBtnStyle} >NEXT</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: APP_THEME
    },
    one: {
        fontSize: 30,
        textAlign: 'center',
        color: '#FFF',
    },
    two: {
        fontSize: 30,
        textAlign: 'center',
        color: '#FFF',
        paddingTop: 15
    },
    three: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FFF',
        fontStyle: 'italic'
    },
    iconStyle: {
        width: 100,
        height: 100,
    },
    btnStyle: {
        backgroundColor: '#FFF',
        height: DEVICE_HEIGHT / 13,
        width: DEVICE_WIDTH / 1.3,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    textBtnStyle: {
        fontSize: 30,
        color: APP_THEME
    }
});
