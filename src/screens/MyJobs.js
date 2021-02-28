import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { Card, CardItem, Body, Icon, Spinner } from 'native-base';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class MyJobs extends Component {

    state = {
        showSpinner: false,
        authUser: [],
        jobs: [],
    }

    componentDidMount() {

        auth().onAuthStateChanged((user) => {
            if (user) {

                database().ref('users').once('value', (data) => {
                    for (var key in data.val()) {
                        if (data.val()[key].email == user.email) {
                            // setTimeout(() => {
                            this.setState({
                                authUser: data.val()[key]?.appliedCompanies?.filter((data) => data != "")
                            })
                            console.log(data.val()[key])
                            // }, 1200);
                            this.setState({
                                showSpinner: true
                            })
                        }
                    }
                })
            }

            else {
                this.props.navigation.navigate('_____________________________', { screen: 'Login' })
            }

        })
    }

    render() {
        const { authUser } = this.state;
        console.log("authUser")
        console.log(authUser)
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

                        <Text style={styles.bodyTitle}>MY APPLEID JOBS</Text>

                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', height: '85%' }}>
                            {
                                authUser ? authUser.map((job, key) => {
                                    return <TouchableOpacity key={key} style={styles.homes}>

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


                                            </View>
                                        </Card>


                                    </TouchableOpacity>

                                })
                                    : <Spinner color="#ffa929" />
                            }


                        </ScrollView>





                    </View>
                </View>
            </View>
        )
    }
}


export default MyJobs;

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
        fontSize: 24,
        alignItems: 'center',
        color: '#3597cc',

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
        justifyContent: 'center'
    }
})