import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import { getUserID } from "./Login"; 

const Create = ({ route, navigation }) => {
  const user = getUserID();

  return (
    <View style={styles.mainContainer}>
      <Button title="UPLOAD IMAGE OF MAP" onPress={() => navigation.navigate("Upload",{user:user})} />
      <Text></Text>
      <Button title="SKIP" onPress={() => navigation.navigate("MapDef",{user:user})} />
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
});

export default Create;
