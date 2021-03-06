import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { Card, CardItem, Body, Icon, Spinner } from 'native-base';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class Home extends Component {

    state = {
        showSpinner: false,
        userInfo: [],
        authUser: {},
        users: [],
        jobs: [],
        authType: '',
        updateUser: {}
    }

    componentDidMount() {
        database().ref('jobs').once('value', (data) => {
            let dataArr = [];
            for (var key in data.val()) {
                dataArr.push(data.val()[key]);
            }
            this.setState({
                jobs: dataArr
            })
        })

        database().ref('users').once('value', (data) => {
            let dataArr = [];
            for (var key in data.val()) {
                dataArr.push(data.val()[key]);
                // }
            }
            this.setState({
                users: dataArr
            })
        })

        auth().onAuthStateChanged((user) => {
            if (user) {

                database().ref('users').once('value', (data) => {
                    for (var key in data.val()) {
                        if (data.val()[key].email == user.email) {
                            this.setState({
                                authType: data.val()[key].registerAs
                            })
                        }
                    }
                })
            } else {
                this.props.navigation.navigate('_____________________________', { screen: 'Login' })
            }
        })
    }

    applyForJob = async (job) => {
        // console.log(post);
        auth().onAuthStateChanged((user) => {

            database().ref('users').once('value', (data) => {
                for (var key in data.val()) {
                    if (user.email == data.val()[key].email) {
                        this.setState({
                            updateUser: data.val()[key]
                        })
                    }
                }
            })
        })
        setTimeout(() => {
            this.update(job);
        }, 1200);

    }
    update = (job) => {
        const { updateUser } = this.state;

        let id = updateUser.id;
        let updatedCompanies = [];
        updatedCompanies = [...updateUser.appliedCompanies, job];

        database().ref('users').child(updateUser.id).set({
            contactNo: updateUser.contactNo,
            email: updateUser.email,
            id: updateUser.id,
            lastDegree: updateUser.lastDegree,
            name: updateUser.name,
            password: updateUser.password,
            photoURL: updateUser.photoURL,
            registerAs: updateUser.registerAs,
            universityName: updateUser.universityName,
            appliedCompanies: updatedCompanies
        }).then(() => {
            // Alert.alert("Success", "Successfully Applied for Job")

        })

        let appliedUsers = [];
        appliedUsers = [...job.userApplies, updateUser.name];
        database().ref('jobs').child(job.id).set({
            id: job.id,
            address: job.address,
            amount: job.amount,
            companyName: job.companyName,
            experience: job.experience,
            jobAddedByName: job.jobAddedByName,
            jobAddedByEmail: job.jobAddedByEmail,
            qualification: job.qualification,
            title: job.title,
            userApplies: appliedUsers,

        }).then(() => {
            Alert.alert("Success", "Successfully Applied for Job");

        })
    }

    render() {
        const { jobs, showSpinner, authType, updateUser } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="transparent" />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={{ marginTop: '5%', marginRight: '10%' }}>
                        <Icon name="menu" style={{ color: '#3597cc' }} />
                    </TouchableOpacity>
                    <Image style={styles.logo} source={require('../assets/logo.png')} />
                </View>
                <View style={styles.body}>
                    <View style={styles.loginBody}>


                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', height: '95%' }}>
                            {
                                jobs.map((job) => {
                                    return <View key={job.id} style={styles.homes}>

                                        <Card style={{ padding: 10, elevation: 10 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                                                <Text style={styles.homesTitle}>{job ? job.title : ''}</Text>
                                                <Text style={styles.homeSalary}>{job ? `PKR ${job.amount}` : ''}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                                                <Text style={styles.homesTitle}>{job ? job.companyName : ''}</Text>
                                                <Text style={styles.homesTitle}>{job ? `${job.userApplies?.length} People Applied` : '0'}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', margin: 5 }}>
                                                <Text style={styles.homeother}>{job ? job.address : ''}</Text>
                                                <Text style={styles.homeother}>{job ? `${job.experience} Years` : ''}</Text>
                                                <Text style={styles.homeother}>{job ? job.qualification : ''}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                                                <Text style={styles.homesTitle}>{job ? job.date : ''}</Text>
                                                <Image width={40} height={40} source={{ uri: 'https://attiehandassociates.co.za/wp-content/uploads/2014/08/Profile-Pic-Demo.png' }} />
                                                <Text style={styles.homesTitle}>{job ? job.jobAddedByName : ''}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                                                {
                                                    authType == 'student' ? <TouchableOpacity onPress={() => this.applyForJob(job)} style={{ width: '50%', height: 40, backgroundColor: '#3597cc', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                                                        <Text style={{ color: '#fff', fontWeight: 'bold' }} >Apply</Text>
                                                    </TouchableOpacity>
                                                        :
                                                        <View />
                                                }
                                            </View>
                                        </Card>
                                    </View>
                                })
                            }

                        </ScrollView>
                        {
                            authType == 'company' || authType == 'admin' ?
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('_____________________________', { screen: 'AddJob' })} style={styles.jobAddButton} >
                                    <Icon style={{ fontSize: 30, color: '#fff' }} type="MaterialIcons" name="insert-invitation" />
                                </TouchableOpacity>
                                : <View />
                        }

                    </View>
                </View>
            </View>
        )
    }
}

export default Home;

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
        // marginBottom: 20,
        // marginTop: '16%',
    },
    loginBody: {
        width: '80%',
        alignItems: 'center',
    },
    bodyTitle: {
        marginTop: '5%',
        marginBottom: '5%',
        fontWeight: '700',
        fontSize: 30,
        alignItems: 'center',
        color: '#3597cc',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 8,
    },
    homes: {
        // backgroundColor:'#fff',
        width: '100%',
        shadowColor: "red",

    },
    homesTitle: {
        color: '#3597cc',
    },
    homeSalary: {
        color: '#ffa929',
        fontSize: 16,
    },
    homeother: {
        color: '#a0abbd',
    },
    jobAddButton: {
        width: 60,
        height: 60,
        backgroundColor: '#ffa929',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 15,
        // left:0,
        // right:0
    }
})