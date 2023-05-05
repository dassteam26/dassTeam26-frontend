import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Login, getUserID } from './screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './screens/Register';
import { Allmaps, deletedMaps } from './screens/Allmaps';
import Map from './screens/Map';
import MapDef from './screens/MapDef';
import Navbar from './screens/Navbar';
import Upload from './screens/Upload';
import Edit from './screens/Edit';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Navbar" component={Navbar} options={{title: ' '}} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="MapDef" component={MapDef} />
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen name="Edit" component={Edit} options={{title: 'Edit Map'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

