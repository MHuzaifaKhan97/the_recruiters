import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, Alert, ToastAndroid, ScrollView } from 'react-native';
import { Title, Input, Item, Body, Label, Icon, Spinner } from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class Login extends Component {

    state = {
        isPasswordShown: false,
        email: '',
        password: '',
        showSpinner: false,
        socialLoggedIn: false,
        userInfo: [],
        loginAs: ' ',

    }

    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('Home');
            }
        })
    }

    showHidePassword = () => {
        this.setState({
            isPasswordShown: !this.state.isPasswordShown
        });
    }
    loggedIn = async () => {

        const { email, password, loginAs } = this.state;
        // console.log(email, password, loginAs);
        if (email == "") {
            Alert.alert('Error', 'Please Enter Your Email',);
        } else if (password == "") {
            Alert.alert('Error', 'Please Enter Your Password',);
        }
        else if (loginAs == ' ') {
            Alert.alert('Error', 'Kindly Select Either Student or Company',);
        }
        else {

            database().ref('/users').once('value', (data) => {
                for (var key in data.val()) {
                    // console.log(data.val()[key])
                    if (data.val()[key].email == email && data.val()[key].registerAs == loginAs) {
                        auth().signInWithEmailAndPassword(email, password)
                            .then((response) => {
                                this.setState({
                                    showSpinner: true,
                                })
                                setTimeout(() => {
                                    this.props.navigation.navigate('Home');
                                    this.setState({
                                        showSpinner: false,
                                        email: '',
                                        password: '',
                                        // loginAs: ' '
                                    })
                                }, 2500);
                                return <View><Spinner color='3597cc' /></View>
                            }).catch((error) => {
                                this.setState({
                                    showSpinner: false,
                                })
                                Alert.alert('Error', error.message);
                            })
                    }
                    else {
                        // Alert.alert('Error',"Username or Password is incorrect");
                        // return;
                    }
                }
            })

        }
    }


    render() {
        const { isPasswordShown, email, password, showSpinner } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#fff" />
                <View style={styles.body}>
                    <View style={styles.loginBody}>
                        <Image source={require('../assets/logo.png')} style={styles.logo} />
                        <Text style={styles.bodyTitle}>SIGN IN</Text>
                        <ScrollView style={{width:'100%',height:'100%'}}>
                            <Item floatingLabel style={{ marginTop: 10 }}>
                                <Label style={{ color: '#3597cc' }}>Enter Email</Label>
                                <Input value={email} maxLength={30} keyboardType="email-address" onChangeText={(text) => this.setState({ email: text })} />
                            </Item>
                         
                            <Item floatingLabel style={{ marginTop: 10 }}>
                                <Label style={{ color: '#3597cc' }}>Enter Password...</Label>
                                <Input value={password} maxLength={25} onChangeText={(text) => this.setState({ password: text })} secureTextEntry={!isPasswordShown} />
                                <Icon active solid={true} name={isPasswordShown ? "eye-slash" : "eye"} type='FontAwesome5' style={{ color: '#3597cc', fontSize: 16 }} onPress={this.showHidePassword} />
                            </Item>
                            <DropDownPicker
                                items={[
                                    { label: 'Login As', value: ' ' },
                                    { label: 'Company Employee', value: 'company', icon: () => <Icon style={{ color: '#3597cc', fontSize: 15 }} type="FontAwesome" name="user-circle-o" /> },
                                    { label: 'Student', value: 'student', icon: () => <Icon style={{ color: '#3597cc', fontSize: 15 }} name="user" type="FontAwesome" /> },
                                    { label: 'Admin', value: 'admin', icon: () => <Icon style={{ color: '#3597cc', fontSize: 15 }} name="user-secret" type="FontAwesome" /> },
                                ]}
                                defaultValue={this.state.loginAs}
                                containerStyle={{ height: 50, width: '100%', marginTop: 20 }}
                                style={{ backgroundColor: '#fafafa', color: '#3597cc' }}
                                itemStyle={{
                                    justifyContent: 'flex-start',
                                }}
                                labelStyle={{ color: '#3597cc' }}
                                dropDownStyle={{ backgroundColor: '#fff' }}
                                onChangeItem={item => this.setState({
                                    loginAs: item.value
                                })}
                            />
                            <View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'space-around' }}>
                                <View style={{ flex: 5, alignItems: 'flex-start', margin: 5, marginRight: 10 }}>
                                    <Text style={{ color: '#3597cc', fontWeight: '700' }}>
                                        Forgot Password?
                            </Text>
                                </View>
                                <View style={{ flex: 4, alignItems: 'flex-start' }}>
                                    <Spinner color="#3597cc" style={{ display: showSpinner ? 'flex' : 'none' }} />
                                </View>
                                <TouchableOpacity style={{
                                    backgroundColor: '#ffa929',
                                    width: 60,
                                    height: 60,

                                    alignItems: 'center',
                                    borderRadius: 100
                                }}
                                    onPress={this.loggedIn}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="arrow-right" style={{ color: '#fff', margin: 18, fontSize: 20 }} type="FontAwesome" />
                                    </View>
                                </TouchableOpacity>

                            </View>

                <View style={styles.footer}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} >
                        <Text style={{ color: '#ffa929', fontWeight: 'bold' }}>Register</Text>
                    </TouchableOpacity>
                </View>
                        </ScrollView>

                    </View>
                </View>

            </View>
        )
    }
}

export default Login;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        display: 'flex',
        fontFamily: 'monospace',
        flex: 1,
    },
    body: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    logo: {
        width: '90%',
        height: 60,
        marginTop: 100,
    },
    loginBody: {
        width: '80%',
        height:'100%',
        alignItems: 'flex-start',
    },
    bodyTitle: {
        marginTop: 40,
        fontWeight: '700',
        fontSize: 35,
        alignItems: 'center',
        color: '#3597cc',
    },
    footer: {
        flex: 0.10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:'20%'
    }
})