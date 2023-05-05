import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Allmaps} from "./Allmaps";
import { StyleSheet, View, Image, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Upload from "./Upload";
import MapDef from "./MapDef";
import Create from "./Create";
import Savedmaps from "./Saved";
import { getUserID } from "./Login";
const Tab = createBottomTabNavigator();

const Navbar = ({route}) => {
  const user = getUserID();
  const is_admin = route.params.is_admin
  // console.log("Navbar   "+route.params)
  // console.log(user)
  return (
    <Tab.Navigator
      initialRouteName="Allmaps"
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName;

          if (route.name === "Allmaps") {
            iconName = "google-maps";
          } else if (route.name === "Savedmaps") {
            iconName = "bookmark";
          }else if (route.name === "Create") {
            iconName = "map-marker-plus";
          }
          return <Icon name={iconName} size={25}/>;
        },
        tabBarActiveBackgroundColor: "#edf8ff",
        tabBarInactiveBackgroundColor: "#edf8ff",
      })}
    >
      <Tab.Screen name="Allmaps" component={Allmaps} options={{title: 'All Maps'}} initialParams = {{user,is_admin}} /> 
      {/* <Tab.Screen name="Upload" component={Upload} /> */}
      {
        is_admin &&
        <Tab.Screen name="Create" component={Create} options={{title: 'Create Map'}} initialParams = {{user}} />
      }
      <Tab.Screen name="Savedmaps" component={Savedmaps} options={{title: 'Saved Maps'}} initialParams = {{user,is_admin}} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "success",
  },
});

export default Navbar;
