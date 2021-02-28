import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import 'react-native-gesture-handler';
import {
  Icon,
} from "native-base";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import SideBar from "./CustomDrawer";
// import Splash from './Splash';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';
import Recruiter from './Recruiter';
import Student from './Student';
import AddJob from './AddJob';
import Splash from './Splash';
import OnBoarding from './OnBoarding';


const Drawer = createDrawerNavigator();

const AppDrawer = ({ props }) => {
  const [loginAs, setLoginAs] = useState({});

  useEffect(() => {
    console.log(props);
    auth().onAuthStateChanged((user) => {
      if (user) {
        database().ref('users').once('value', (data) => {
          for (var key in data.val()) {
            if (data.val()[key].email.toLowerCase() === user.email.toLowerCase()) {
              setLoginAs(data.val()[key])
            }
          }
        })
      }
    })

  }, [])

  return (
    <>
      {
        loginAs.registerAs == "company" ?

          <Drawer.Navigator
            drawerContent={(props) => (<SideBar {...props} />)
            }
            drawerContentOptions={{
              style: { backgroundColor: '#3597cc' }
            }}
            initialRouteName="Splash"

          >
            <Drawer.Screen
              name="Profile"
              component={Profile}
              options={{
                drawerIcon: ({ focused, color, size }) => (
                  <Icon type="FontAwesome" name="briefcase" style={{ fontSize: size, color: '#fff' }} />
                ),
              }}
            />
            <Drawer.Screen
              name="Home"
              component={Home}
              options={{
                drawerIcon: ({ focused, color, size }) => (
                  <Icon name="home" style={{ fontSize: size, color: '#fff' }} />
                ),
              }}
            />

            <Drawer.Screen
              name="Student"
              component={Student}
              options={{
                drawerIcon: ({ focused, color, size }) => (
                  <Icon name="people" style={{ fontSize: size, color: '#fff' }} />
                ),
              }}
            />
            <Drawer.Screen
              name="_____________________________"
              component={Root2}
              options={{
                headerStyle: { color: '#fff' },
              }}
            />
          </Drawer.Navigator>
          :
          loginAs.registerAs == 'student' ?

            <Drawer.Navigator
              drawerContent={(props) => (<SideBar {...props} />)
              }
              drawerContentOptions={{
                style: { backgroundColor: '#3597cc' }
              }}
              initialRouteName="Splash"

            >

              <Drawer.Screen
                name="Profile"
                component={Profile}
                options={{
                  drawerIcon: ({ focused, color, size }) => (
                    <Icon type="FontAwesome" name="briefcase" style={{ fontSize: size, color: '#fff' }} />
                  ),
                }}
              />
              <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                  drawerIcon: ({ focused, color, size }) => (
                    <Icon name="home" style={{ fontSize: size, color: '#fff' }} />
                  ),
                }}
              />

              <Drawer.Screen
                name="Recruiter"
                component={Recruiter}
                options={{
                  drawerIcon: ({ focused, color, size }) => (
                    <Icon name="people" style={{ fontSize: size, color: '#fff' }} />
                  ),
                }}
              />

              <Drawer.Screen
                name="_____________________________"
                component={Root2}
                options={{
                  headerStyle: { color: '#fff' },
                }}
              />
            </Drawer.Navigator>
            :
            loginAs.registerAs == 'admin' ?
              <Drawer.Navigator
                drawerContent={(props) => (<SideBar {...props} />)
                }
                drawerContentOptions={{
                  style: { backgroundColor: '#3597cc' }
                }}
                initialRouteName="Splash"

              >
                <Drawer.Screen
                  name="Profile"
                  component={Profile}
                  options={{
                    drawerIcon: ({ focused, color, size }) => (
                      <Icon type="FontAwesome" name="briefcase" style={{ fontSize: size, color: '#fff' }} />
                    ),
                  }}
                />
                <Drawer.Screen
                  name="Home"
                  component={Home}
                  options={{
                    drawerIcon: ({ focused, color, size }) => (
                      <Icon name="home" style={{ fontSize: size, color: '#fff' }} />
                    ),
                  }}
                />

                <Drawer.Screen
                  name="Recruiter"
                  component={Recruiter}
                  options={{
                    drawerIcon: ({ focused, color, size }) => (
                      <Icon name="people" style={{ fontSize: size, color: '#fff' }} />
                    ),
                  }}
                />
                <Drawer.Screen
                  name="Student"
                  component={Student}
                  options={{
                    drawerIcon: ({ focused, color, size }) => (
                      <Icon name="people" style={{ fontSize: size, color: '#fff' }} />
                    ),
                  }}
                />

                <Drawer.Screen
                  name="_____________________________"
                  component={Root2}
                  options={{
                    headerStyle: { color: '#fff' },
                  }}
                />
              </Drawer.Navigator>
              :
              <Drawer.Navigator
                drawerContent={(props) => (<SideBar {...props} />)
                }
                drawerContentOptions={{
                  style: { backgroundColor: '#3597cc' }
                }}
                initialRouteName="Splash"
              >
                {/* <Drawer.Screen
                  name="Profile"
                  component={Profile}
                  options={{
                    drawerIcon: ({ focused, color, size }) => (
                      <Icon type="FontAwesome" name="briefcase" style={{ fontSize: size, color: '#fff' }} />
                    ),
                  }}
                />
                <Drawer.Screen
                  name="Home"
                  component={Home}
                  options={{
                    drawerIcon: ({ focused, color, size }) => (
                      <Icon name="home" style={{ fontSize: size, color: '#fff' }} />
                    ),
                  }}
                /> */}


                <Drawer.Screen
                  name="_____________________________"
                  component={Root2}
                  options={{
                    headerStyle: { color: '#fff' },
                  }}
                />
              </Drawer.Navigator>

      }

    </>
  );
}

const Stack = createStackNavigator();

function Root2() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="OnBoarding" options={{ headerShown: false }} component={OnBoarding} />
      <Stack.Screen name="Splash" options={{ headerShown: false }} component={Splash} />
      <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="Register" options={{ headerShown: false }} component={Register} />
      <Stack.Screen name="AddJob" options={{ headerShown: false }} component={AddJob} />
    </Stack.Navigator>
  );
}
function MyCustomDrawer() {
  return (
    <NavigationContainer>
      <AppDrawer />
    </NavigationContainer>
  );
}

export default MyCustomDrawer;