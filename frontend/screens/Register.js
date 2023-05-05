import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import React from "react";
import { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const url = "https://dass-team-26-backend.onrender.com";

const Register = ({ navigation }) => {
  const roles = ["Adminstrator", "User"];
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function register() {
    console.log("sending the request!");
    fetch(url + "/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        firstname,
        lastname,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log("response ok!");
        navigation.navigate("Login");
      } else {
        console.log("response not ok!");
      }
    });
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainHeader}>Register to CUSTOM-MAPS</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Firstname"
          onChangeText={(text) => setFirstName(text)}
        />
        <Text></Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Lastname"
          onChangeText={(text) => setLastName(text)}
        />
        <Text></Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Username"
          onChangeText={(text) => setUserName(text)}
        />
        <Text></Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <Text></Text>
        <Button
          title="Register"
          onPress={() => {
            register();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    height: "100%",
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  description: {
    fontSize: 20,
    color: "#7d7d7d",
    paddingBottom: 20,
    lineHeight: 25,
  },
  mainHeader: {
    textAlign: "center",
    fontSize: 25,
    color: "#344055",
    fontWeight: 500,
  },
  inputContainer: {
    marginTop: 20,
  },
  labels: {
    fontSize: 18,
    color: "#7d7d7d",
    marginTop: 10,
    marginBottom: 5,
    lineHeight: 25,
    //
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 1,
    fontSize: 18,
  },
  dropdown1BtnStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
  },
  dropdown1BtnTxtStyle: { color: "#7d7d7d", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
});

export default Register;
