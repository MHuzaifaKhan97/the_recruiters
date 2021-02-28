import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Title, Input, Item, Body, Label, Icon, Spinner } from 'native-base';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class Profile extends Component {

    state = {
        isPasswordShown: false,
        name: '',
        email: '',
        contactNo: '',
        password: '',
        address: '',
        loggedInUser: {},
        authUser: {},
        isDataLoaded: false,
    }
    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            this.setState({ authUser: user })
            if (user) {
                database().ref('users').once('value', (data) => {
                    for (var key in data.val()) {
                        if (data.val()[key].email.toLowerCase() === user.email.toLowerCase()) {
                            this.setState({
                                loggedInUser: data.val()[key]
                            })
                        }
                    }
                })
            }
            setTimeout(() => {
                this.setState({ isDataLoaded: true });
            }, 1200);
        })
    }

    
    updateProfile = () => {

    }
    render() {
        const { isPasswordShown, name, email, password, contactNo, loggedInUser, isDataLoaded } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="transparent" />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={{ marginTop: '5%', marginRight: '10%' }}>
                        <Icon name="arrow-left" type="FontAwesome" style={{ color: '#3597cc' }} />
                    </TouchableOpacity>
                    <Image style={styles.logo} source={require('../assets/logo.png')} />
                </View>

                {
                    isDataLoaded ? 
                    <View style={styles.loginBody}>
                            <View>
                                <Image
                                    source={require('../assets/profile.png')}
                                    style={{ width: 100, height: 100, marginTop: 13, borderRadius: 100, borderWidth: 3, borderColor: 'white' }}
                                ></Image>
                            </View>
                            <Item regular style={{ marginTop: '5%', borderRadius: 10, borderColor: '#3597cc', borderWidth: 2 }}>
                                <Input style={{ color: '#3597cc', backgroundColor: 'white', borderRadius: 10, fontWeight: '700', fontSize: 18 }} value={loggedInUser? loggedInUser.name:''} maxLength={30} onChangeText={(text) => this.setState({ name: text })} />
                            </Item>
                            <Item regular style={{ marginTop: '5%', borderRadius: 10, borderColor: '#3597cc', borderWidth: 2 }}>
                                <Input style={{ color: '#3597cc', backgroundColor: 'white', borderRadius: 10, fontWeight: '700', fontSize: 18 }} value={loggedInUser? loggedInUser.email:''} maxLength={30} onChangeText={(text) => this.setState({ email: text })} />
                            </Item>
                            <Item regular style={{ marginTop: '5%', borderRadius: 10, borderColor: '#3597cc', borderWidth: 2 }}>
                                <Input style={{ color: '#3597cc', backgroundColor: 'white', borderRadius: 10, fontWeight: '700', fontSize: 18 }} value={loggedInUser? loggedInUser.password:''} maxLength={30} onChangeText={(text) => this.setState({ password: text })} />
                            </Item>
                            <Item regular style={{ marginTop: '5%', borderRadius: 10, borderColor: '#3597cc', borderWidth: 2 }}>
                                <Input style={{ color: '#3597cc', backgroundColor: 'white', borderRadius: 10, fontWeight: '700', fontSize: 18 }} value={loggedInUser? loggedInUser.contactNo:''} maxLength={30} onChangeText={(text) => this.setState({ contactNo: text })} />
                            </Item>
                          

                            <TouchableOpacity style={{
                                backgroundColor: '#ffa929',
                                width: '100%',
                                alignItems: 'center',
                                marginTop: 30,
                                paddingTop: 15,
                                paddingBottom: 15,
                                borderRadius: 10,
                            }}
                                onPress={this.updateProfile}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="edit" type="FontAwesome" size={15} style={{ marginTop: 3,color:'#fff',fontSize:15 }} />
                                    <Text style={{ marginLeft: 8, color: '#fff', fontSize: 15, fontWeight: '700' }}>
                                        UPDATE PROFILE
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                     
                            :
                            <Spinner  color="#3597cc" />
                }
             
            </View>


        )
    }
}
export default Profile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        display: 'flex',
        fontFamily: 'monospace',
        flex: 1,
        // justifyContent: 'space-between',
        alignItems:'center'
    },
    header: {
        flex: 0.15,
        flexDirection: 'row',
        marginTop: '5%',
        width: '90%',
        justifyContent: 'center',

    },
    body: {
        flex: 0.85,
        display: 'flex',
        backgroundColor: '#3597cc',
        alignItems: 'center',
        justifyContent:'center',
        borderTopStartRadius: 45,
        borderTopEndRadius: 45,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    logo: {
        width: 220,
        height: 60,
    },
    loginBody: {
        width: '80%',
        alignItems: 'center',
        marginTop:'15%'
    },
   

    optionsButton: {
        width: '90%',
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 30,
        padding: 15,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    optionsButtonText: {
        fontWeight: '700',
        color: '#3597cc',
        fontSize: 18,
        marginLeft: 10,
    },
    userTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 5,
        // paddingBottom: 10,
        // marginLeft: 10,
        fontFamily: 'monospace',
        textShadowColor: 'rgba(227, 89, 79, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        fontWeight: '700',
        color: '#3597cc',
    }

})