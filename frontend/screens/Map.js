import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import Dialog from "react-native-dialog";
import { Picker } from "@react-native-picker/picker";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

 
const firebaseConfig = {
  apiKey: "AIzaSyAu-ab9eSAKhuoTn1IPmZxczFJwPCkUfVg",
  authDomain: "custom-maps-e7b33.firebaseapp.com",
  projectId: "custom-maps-e7b33",
  storageBucket: "custom-maps-e7b33.appspot.com",
  messagingSenderId: "397095233160",
  appId: "1:397095233160:web:8ecce30c2c9949a858e13d",
  measurementId: "G-WETL2T9Y4E",
};

const app = initializeApp(firebaseConfig);
 

const url = "https://dass-team-26-backend.onrender.com";

const Map = ({ route }) => {
  const { id } = route.params;
  // console.log(id);
  const [src, setSrc] = useState("");
  const [dest, setDest] = useState("");
  const [visible, setVisible] = useState(false);
  const [path, setPath] = useState([{}]);
  const [dist, setDist] = useState(0);
  const [m, setm] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [url1, setUrl1] = useState();
  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  async function navigate() {
    fetch(url + "/navigate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        source: String(src),
        dest: String(dest),
        map_id: String(id),
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((body) => {
          console.log(body);
          console.log(body.path);
          setPath(body.path);
          setDist(body.dist);
          // showDialog;
          setVisible(true);
          setm(true);
        });
      } else {
        console.log(res);
      }
    });
  }

  useEffect(() => {
    fetch(url + "/fetch-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        map_id: String(id),
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((body) => {
          console.log(body.map.nodes);
          setNodes(body.map.nodes);
        });
      } else {
        console.log(res);
      }
    });

    const func = async () => {
      const storage = getStorage();
      const reference = ref(storage, "/" + id + ".jpg");
      await getDownloadURL(reference).then((x) => {
        setUrl1(x);
        console.log(x);
      });
    };
    func();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{ width: "100%", height: "60%", margin: 0 }}
          source={{ uri: url1 }}
        />
      </View>
      <ScrollView>
        <Text>Where are you</Text>
        <Picker
          mode="dropdown"
          selectedValue={src}
          onValueChange={(itemValue, itemIndex) => {
            setSrc(itemValue);
          }}
        >
          {nodes.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
        <Text></Text>
        <Text>Destination</Text>
        <Picker
          mode="dropdown"
          selectedValue={dest}
          onValueChange={(itemValue, itemIndex) => {
            setDest(itemValue);
          }}
        >
          {nodes.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
        <Text></Text>
        <Button
          title="Navigate"
          onPress={() => {
            navigate();
          }}
        />
        <Dialog.Container visible={visible}>
          <Dialog.Title>PATH</Dialog.Title>
          <Text style={{ fontWeight: "bold" }}>DISTANCE : {dist} units</Text>
          <Text></Text>
          {visible &&
            path.map((p) => (
              <View>
                <Text style={{ fontWeight: "bold" }}>
                  {p.head[0] + " to " + p.head[1] + ":"}
                </Text>
                <Text>
                  {p.directions.map((p1) => (
                    <Text>{p1 + "\n"}</Text>
                  ))}
                </Text>

                <View
                  style={{
                    borderBottomColor: "grey",
                    borderBottomWidth: 2,
                  }}
                />
                <Text></Text>
              </View>
            ))}
          <Dialog.Button label="Close" onPress={handleCancel} />
        </Dialog.Container>
        <Text></Text>
        <Text></Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  inputStyle: {
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 1,
    fontSize: 18,
  },
  inputContainer: {
    marginTop: 0,
  },
  container: {
    alignContent: "center",
    margin: 37,
  },
});

export default Map;
