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
const url = "https://dass-team-26-backend.onrender.com";

let userID = "";

function getUserID() {
  return userID;
}

const Login = ({ navigation }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    console.log("request has been sent!");
    fetch(url + "/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        username: String(username),
        password: String(password),
      },
    }).then((res) => {
      if (res.ok) {
        console.log("response ok");
        res.json().then((body) => {
          userID = body.user.id;
          console.log("converting to json successful!");
          navigation.navigate("Navbar", {
            user: body.user.id,
            is_admin: body.user.is_admin,
          });
        });
      } else {
        alert("Incorrect Credentials");
        console.log("response not ok!");
      }
    });
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainHeader}>Login to CUSTOM-MAPS</Text>
      <View style={styles.inputContainer}>
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
          title="Login"
          onPress={() => {
            login();
          }}
        />
        <Text></Text>
        <Button
          title="Don't have an account?  register"
          onPress={() => navigation.navigate("Register")}
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
    //
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
    //
    fontSize: 18,
  },
});

export { getUserID, Login };
