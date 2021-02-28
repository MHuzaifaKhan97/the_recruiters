import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, Alert, ToastAndroid, ScrollView } from 'react-native';
import { Title, Input, Item, Body, Label, Icon } from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class Register extends Component {

    state = {
        isPasswordShown: false,
        name: '',
        email: '',
        password: '',
        registerAs: ' ',
        companyName: '',
        designation: '',
        contactNo: '',
        universityName: '',
        lastDegree: '',
        photoURL: ''
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
        console.log('Clicked');
    }
    createUser = () => {
        const { name, email, password, registerAs, photoURL, contactNo, companyName, designation, universityName, lastDegree } = this.state;
        let id = database().ref("users").push().key;
        if (name == "") {
            Alert.alert('Error', 'Please Enter Your Name',);
        } else if (email == "") {
            Alert.alert('Error', 'Please Enter Your Email',);
        }
        else if (password == "") {
            Alert.alert('Error', 'Please Enter Your Password',);
        }
        else if (registerAs == " ") {
            Alert.alert('Error', 'Please Select either Student or Company Employee',);
        }
        else {
            let user = {};
            if (password.length <= 8) {
                Alert.alert('Error', 'Weak Password');
            }
            if (registerAs == 'student') {
                user = {
                    id: id,
                    name,
                    email,
                    password,
                    registerAs,
                    universityName,
                    lastDegree,
                    contactNo,
                    photoURL,
                }
            }
            else if (registerAs == 'company') {
                user = {
                    id,
                    name,
                    email,
                    password,
                    registerAs,
                    companyName,
                    designation,
                    contactNo,
                    photoURL,
                }
            }
            console.log(user);
            auth().createUserWithEmailAndPassword(email, password)
                .then((response) => {
                    database().ref(`users/${id}`).set(user);
                    Alert.alert('Success', 'Successfully User Created.');
                    this.props.navigation.navigate('Home');
                }).catch((error) => {
                    Alert.alert('Error', error.message);
                })
            // this.setState({
            //     name: '',
            //     email: '',
            //     password: '',
            //     registerAs: ' ',
            //     companyName: '',
            //     designation: '',
            //     photoURL: '',
            //     universityName: '',
            //     lastDegree: ''
            // })

        }

        // else {
        //     if (password.length <= 8) {
        //         Alert.alert('Error', 'Weak Password');
        //     }
        //     else if (contactNo.length != 11) {
        //         Alert.alert('Error', 'Invalid Contact Number');
        //     }
        //     else {
        //         auth().createUserWithEmailAndPassword(email, password)
        //             .then((response) => {
        //                 database().ref(`users/${id}`).set({
        //                     id: id,
        //                     name: name,
        //                     email: email,
        //                     password: password,
        //                     contactNo: contactNo,
        //                     photoURL: '',
        //                 });
        //                 Alert.alert('Success', 'Successfully User Created.');
        //                 this.props.navigation.navigate('Home');
        //             }).catch((error) => {
        //                 Alert.alert('Error', error.message);
        //             })
        //         this.setState({
        //             name: '',
        //             email: '',
        //             password: '',
        //             contactNo: '',
        //         })

        //     }
        // }
    }

    render() {
        const { name, email, password, registerAs, photoURL, contactNo, companyName, designation, universityName, lastDegree, isPasswordShown } = this.state;

        return (
            <>
                <View style={styles.container}>
                    <StatusBar backgroundColor="#fff" />
                    <View style={styles.body}>
                        <View style={styles.loginBody}>
                            <Image source={require('../assets/logo.png')} style={styles.logo} />
                            <Text style={styles.bodyTitle}>CREATE NEW USER</Text>
                            <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%', width: '100%', backgroundColor: '#fff' }}>

                                <Item floatingLabel style={{ marginTop: 15 }}>
                                    <Label style={{ color: '#3597cc' }}>Enter Name</Label>
                                    <Input value={name} maxLength={30} keyboardType="default" onChangeText={(text) => this.setState({ name: text })} />
                                </Item>
                                <Item floatingLabel style={{ marginTop: 8 }}>
                                    <Label style={{ color: '#3597cc' }}>Enter Email</Label>
                                    <Input value={email} maxLength={50} keyboardType="email-address" onChangeText={(text) => this.setState({ email: text })} />
                                </Item>
                                <Item floatingLabel style={{ marginTop: 8 }}>
                                    <Label style={{ color: '#3597cc' }}>Enter Contact Number</Label>
                                    <Input value={contactNo} maxLength={11} keyboardType="number-pad" onChangeText={(text) => this.setState({ contactNo: text })} />
                                </Item>
                                <DropDownPicker
                                    items={[
                                        { label: 'Register As', value: ' ' },
                                        { label: 'Company Employee', value: 'company', icon: () => <Icon style={{ color: '#3597cc', fontSize: 15 }} type="FontAwesome" name="user-circle-o" /> },
                                        { label: 'Student', value: 'student', icon: () => <Icon style={{ color: '#3597cc', fontSize: 15 }} name="user" type="FontAwesome" /> },
                                    ]}
                                    defaultValue={this.state.registerAs}
                                    containerStyle={{ height: 50, width: '100%', marginTop: 20 }}
                                    style={{ backgroundColor: '#fafafa', color: '#3597cc' }}
                                    itemStyle={{
                                        justifyContent: 'flex-start',
                                    }}
                                    labelStyle={{ color: '#3597cc' }}
                                    dropDownStyle={{ backgroundColor: '#fff' }}
                                    onChangeItem={item => this.setState({
                                        registerAs: item.value
                                    })}
                                />
                                {
                                    registerAs == 'company' ? (
                                        <>
                                            <Item floatingLabel>
                                                <Label style={{ color: '#3597cc' }}>Company Name</Label>
                                                <Input value={companyName} maxLength={50} onChangeText={(text) => this.setState({ companyName: text })} />
                                            </Item>
                                            <Item floatingLabel style={{ marginTop: 8 }}>
                                                <Label style={{ color: '#3597cc' }}>Designation</Label>
                                                <Input value={designation} maxLength={50} onChangeText={(text) => this.setState({ designation: text })} />
                                            </Item>
                                        </>
                                    ) :
                                        registerAs == 'student' ? (
                                            <>
                                                <Item floatingLabel>
                                                    <Label style={{ color: '#3597cc' }}>University Name</Label>
                                                    <Input value={universityName} maxLength={50} onChangeText={(text) => this.setState({ universityName: text })} />
                                                </Item>
                                                <Item floatingLabel style={{ marginTop: 8 }}>
                                                    <Label style={{ color: '#3597cc' }}>Last Degree</Label>
                                                    <Input value={lastDegree} maxLength={50} onChangeText={(text) => this.setState({ lastDegree: text })} />
                                                </Item>
                                            </>
                                        ) : <View />
                                }
                                <Item floatingLabel>
                                    <Label style={{ color: '#3597cc' }}>Enter Password</Label>
                                    <Input value={password} maxLength={25} onChangeText={(text) => this.setState({ password: text })} secureTextEntry={!isPasswordShown} />
                                    <Icon active solid={true} name={isPasswordShown ? "eye-slash" : "eye"} type='FontAwesome5' style={{ color: '#3597cc', fontSize: 16 }} onPress={this.showHidePassword} />
                                </Item>
                                <View style={{ marginTop: 20, alignItems: 'flex-end', width: '100%' }}>
                                    <TouchableOpacity style={{
                                        backgroundColor: '#ffa929',
                                        width: 60,
                                        height: 60,
                                        alignItems: 'center',
                                        borderRadius: 100
                                    }}
                                        onPress={this.createUser}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon name="arrow-right" style={{ color: '#fff', margin: 18, fontSize: 20 }} type="FontAwesome" />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>

                        </View>
                    </View>

                </View>

                <View style={styles.footer}>
                    <Text>Already have account? </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{ color: '#ffa929', fontWeight: 'bold' }}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }
}

export default Register;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        display: 'flex',
        fontFamily: 'monospace',
        flex: 1,
    },
    body: {
        flex: 1,
        height: '100%',
        display: 'flex',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    logo: {
        width: 210,
        height: 50,
        marginTop: 30,
    },
    loginBody: {
        width: '80%',
        height: '100%',
        flex: 1,
        alignItems: 'flex-start'
    },
    bodyTitle: {
        marginTop: 30,
        fontWeight: '700',
        fontSize: 25,
        alignItems: 'center',
        color: '#3597cc',
    },
    footer: {
        backgroundColor: '#fff',
        flex: 0.10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
})