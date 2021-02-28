import * as React from "react";
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from "@react-navigation/drawer";
import {
    Body,
    Button,
    Container,
    Content,
    Footer,
    H3,
    Header,
    Icon,
    Left,
    List,
    ListItem,
    Right,
    Switch,
    Text,
    Thumbnail
} from "native-base";
import { AsyncStorageStatic, StatusBar } from 'react-native';
import Animated from "react-native-reanimated";
import { DrawerActions } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

function SideBar({ progress, ...props }) {
    const translateX = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [-100, 0]
    });
    const logOut = () => {
        auth().signOut().then(() => {
            props.navigation.navigate('_____________________________', { screen: 'Login' })
        })
    }
    let [authUser, setAuthUser] = useState({});
    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                database().ref('users').once('value', (data) => {
                    for (var key in data.val()) {
                        if (data.val()[key].email.toLowerCase() === user.email.toLowerCase()) {
                            // setTimeout(() => {
                            setAuthUser(data.val()[key])
                            // }, 1200);
                        }
                    }
                })
            }
        })
        // console.log(authUser);
    }, [])

    return (
        <Container>
            <StatusBar backgroundColor="#fff" />
            <Header style={{ backgroundColor: '#3597cc' }}>
                <Right style={{ backgroundColor: '#3597cc' }}>
                    <TouchableOpacity style={{ backgroundColor: '#fff' }} onPress={() =>
                        props.navigation.dispatch(DrawerActions.closeDrawer())
                    }>
                        <Icon name="menu" style={{ color: '#fff', backgroundColor: '#3597cc' }} />
                    </TouchableOpacity>
                </Right>
            </Header>
            <Content contentContainerStyle={{ flex: 1, backgroundColor: '#3597cc' }}>
                <ListItem thumbnail>
                    <Left>
                        <Thumbnail source={{
                            uri: authUser.photoURL ? authUser.photoURL : 'https://attiehandassociates.co.za/wp-content/uploads/2014/08/Profile-Pic-Demo.png'
                        }} />
                    </Left>
                    <Body>
                        <H3 style={{ color: '#fff' }}>{authUser ? authUser.name : ""}</H3>
                        <Text style={{ color: '#fff' }} note>{authUser ? authUser.email : ""}</Text>
                    </Body>
                </ListItem>
                <DrawerContentScrollView {...props}>
                    <Animated.View style={{ transform: [{ translateX }] }}>
                        <DrawerItemList {...props} labelStyle={{ color: '#fff' }} activeTintColor="orange" activeBackgroundColor="#a1c9d1" />
                        <DrawerItem
                            labelStyle={{ color: '#fff' }}
                            label="Log Out"
                            icon={({ color, size }) => (
                                <Icon type="FontAwesome" name="sign-out" style={{ fontSize: size, color: '#fff' }} />
                            )}
                            onPress={() => logOut()}
                        />
                    </Animated.View>
                </DrawerContentScrollView>
            </Content>
        </Container>

    )
}

export default SideBar;