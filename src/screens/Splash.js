import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, Animated } from 'react-native';


class Splash extends Component {

  
    componentDidMount(){
        setTimeout(() => {
            this.props.navigation.navigate('OnBoarding');
        }, 3000);

    }
 
    render() {
     
        return (
            <React.Fragment>
                <View style={styles.container}>
                <StatusBar backgroundColor="#fff" />
                   <View style={styles.topSide}>
                        <Image
                            source={require('../assets/logo.png')}
                            style={{ width: "90%", height: 60 }}
                        />
                   </View>
                </View>
                <View style={styles.developedBy}>
                    <Text style={styles.developedByText}>Developed By Huzaifa Khan</Text>
                </View>
            </React.Fragment>
        );
    }
}

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        // marginHorizontal: 40,
        justifyContent: 'center',
        backgroundColor: '#3597cc'
    },
    topSide: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent:'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    developedBy: {
        flex: 0.3,
        alignItems: 'center',
        backgroundColor: '#46a0b3',
    },
    developedByText: {
        fontSize: 18,
        color: '#fff',
        justifyContent: 'center',
        marginTop: 50,
        fontWeight: '700',
        marginBottom: 60
    },
  
});