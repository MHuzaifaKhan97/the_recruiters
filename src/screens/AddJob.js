import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, Alert, PermissionsAndroid, ScrollView } from 'react-native';
import { Title, Input, Item, Body, Label, Icon, Textarea } from 'native-base';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { add } from 'react-native-reanimated';

class AddJob extends Component {

    state = {
        authUser: {},
        title: '',
        amount: '',
        companyName: '',
        address: '',
        experience: '',
        qualification: '',
        date: '',
        jobAddedByEmail: '',
        jobAddedByName: ''

    }
    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            if (user) {
                database().ref('users').once('value', (data) => {
                    for (var key in data.val()) {
                        if (data.val()[key].email.toLowerCase() === user.email.toLowerCase()) {
                            setTimeout(() => {
                                this.setState({
                                    authUser: data.val()[key]
                                })
                            }, 1200);
                        }
                    }
                })
            }
        });
    }
    addjob = () => {

        const { title, amount, companyName, address, experience, qualification, authUser } = this.state;
        let id = database().ref("users").push().key;

        if (title == "") {
            Alert.alert('Error', 'Please Enter job Title',);
        } else if (amount == "") {
            Alert.alert('Error', 'Please Enter Amount',);
        } else if (companyName == "") {
            Alert.alert('Error', 'Please Enter Company Name',);
        } else if (address == "") {
            Alert.alert('Error', 'Please Enter Company Address',);
        } else if (experience == "") {
            Alert.alert('Error', 'Please Enter Experience In Years',);
        } else if (qualification == "") {
            Alert.alert('Error', 'Please Enter Required Qualification',);
        }
        else {

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
            database().ref(`jobs/${id}`).set({
                id: id,
                title: title,
                amount: amount,
                companyName: companyName,
                address: address,
                experience: experience,
                qualification: qualification,
                jobAddedByEmail: authUser.email,
                date:today,
                jobAddedByName: authUser.name,
            }).then(() => {
                Alert.alert('Success', 'Successfully job Added.');
                this.props.navigation.navigate('Home');
                this.setState({
                    title: '',
                    amount: '',
                    companyName: '',
                    address: '',
                    experience: '',
                    qualification: '',
                    jobAddedByName: '',
                    jobAddedByEmail: ''
                })
            }).catch((error) => {
                Alert.alert('Error', error.message);
            })

        }
    }

    render() {
        const { title, amount, companyName, address, experience, qualification } = this.state;

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#fff" />

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={{ marginTop: '5%', marginRight: '10%' }}>
                        <Icon name="arrow-left" type="FontAwesome" style={{ color: '#3597cc' }} />
                    </TouchableOpacity>
                    <Image style={styles.logo} source={require('../assets/logo.png')} />
                </View>
                <View style={styles.body}>
                    <View style={styles.signUpBody}>
                        <Text style={styles.bodyTitle}>ADD JOB</Text>


                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', height: '100%' }} >
                            <Item floatingLabel style={{ marginTop: 10 }}>
                                <Label style={{ color: '#3597cc', fontSize: 16 }}>Enter job Title</Label>
                                <Input style={{ color: '#3597cc', fontSize: 16 }} value={title} maxLength={50} onChangeText={(text) => this.setState({ title: text })} />
                            </Item>
                            <Item floatingLabel style={{ marginTop: 5 }}>
                                <Label style={{ color: '#3597cc', fontSize: 16 }}>Enter Amount </Label>
                                <Input style={{ color: '#3597cc', fontSize: 16 }} keyboardType="number-pad" value={amount} maxLength={30} onChangeText={(text) => this.setState({ amount: text })} />
                            </Item>
                            <Item floatingLabel style={{ marginTop: 5 }}>
                                <Label style={{ color: '#3597cc', fontSize: 16 }}>Enter Company Name</Label>
                                <Input style={{ color: '#3597cc', fontSize: 16 }} value={companyName} maxLength={50} onChangeText={(text) => this.setState({ companyName: text })} />
                            </Item>
                            <Item floatingLabel style={{ marginTop: 5 }}>
                                <Label style={{ color: '#3597cc', fontSize: 16 }}>Enter Company Address</Label>
                                <Input style={{ color: '#3597cc', fontSize: 16 }} value={address} maxLength={50}
                                    onChangeText={(text) => this.setState({ address: text })}
                                />
                            </Item>
                            <Item floatingLabel style={{ marginTop: 5 }}>
                                <Label style={{ color: '#3597cc', fontSize: 16 }}>Enter Required Experience</Label>
                                <Input style={{ color: '#3597cc', fontSize: 16 }} value={experience} keyboardType="number-pad" maxLength={50} onChangeText={(text) => this.setState({ experience: text })} />
                            </Item>
                            <Item floatingLabel style={{ marginTop: 5 }}>
                                <Label style={{ color: '#3597cc', fontSize: 16 }}>Enter Required Qualification</Label>
                                <Input style={{ color: '#3597cc', fontSize: 16 }} value={qualification} keyboardType="default" maxLength={50} onChangeText={(text) => this.setState({ qualification: text })} />
                            </Item>

                            <TouchableOpacity style={{
                                backgroundColor: '#ffa929',
                                width: '100%',
                                alignItems: 'center',
                                marginTop: '15%',
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderRadius: 8,
                            }}
                                onPress={this.addjob}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <MyIcon name="file-text-o" color='#fff' size={14} style={{ marginTop: 3, fontWeight: 'bold' }} />
                                    <Text style={{ marginLeft: 8, color: '#fff', fontSize: 16, fontWeight: '700' }}>
                                        ADD JOB
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>

                    </View>
                </View>
            </View>
        )
    }
}

export default AddJob;



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        display: 'flex',
        fontFamily: 'monospace',
        flex: 1,
    },
    header: {
        flex: 0.15,
        flexDirection: 'row',
        marginTop: '5%',
        width: '90%',
        justifyContent: 'center',
    },
    body: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    logo: {
        width: 220,
        height: 60,
    },
    signUpBody: {
        width: '80%',
        alignItems: 'center',
    },
    bodyTitle: {
        marginTop: 20,
        fontWeight: '700',
        fontSize: 30,
        alignItems: 'center',
        color: '#3597cc',
    },

})