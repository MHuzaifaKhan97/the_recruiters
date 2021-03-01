import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { Card, CardItem, Body, Icon, Spinner } from 'native-base';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class Student extends Component {

    state = {
        showSpinner: false,
        userInfo: [],
        students: [],
        isDataLoaded: false,
    }

    componentDidMount() {
        database().ref('users').once('value', (data) => {
            let dataArr = [];
            for (var key in data.val()) {
                if(data.val()[key].registerAs == 'student'){
                    dataArr.push(data.val()[key]);
                }
            }
            this.setState({
                students: dataArr
            })
            setTimeout(() => {
                this.setState({ isDataLoaded: true });
            }, 1200);
        })
    }

    showHidePassword = () => {
        this.setState({
            isPasswordShown: !this.state.isPasswordShown
        });
        console.log('Clicked');
    }

    render() {
        const { jobs, showSpinner,students, isDataLoaded} = this.state;
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

            {
                isDataLoaded ? 
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', height: '95%' }}>


{
    students.map((student) => {
        return <View key={student.id} style={styles.homes}>

            <Card style={{ padding: 10, elevation: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text style={styles.homesTitle}>{student ? student.name : ''}</Text>
                    <Text style={styles.homeSalary}>{student ? student.contactNo:''}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text style={styles.homesTitle}>{student ? student.email:''}</Text>
                    <Text style={styles.homeSalary}>{student ? student.universityName:''}</Text>
                </View>
                 
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text style={styles.homesTitle}>{student ? student.lastDegree:''}</Text>
                </View>
             
            </Card>


        </View>


    })
}


</ScrollView> :
<Spinner color="#3597cc" />

            }
                  
                      
                    </View>
                </View>
            </View>
        )
    }
}

export default Student;

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
        justifyContent: 'center'
    }
})