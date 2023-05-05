import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import Dialog from "react-native-dialog";
import { Picker } from "@react-native-picker/picker";
import { IconButton, Colors } from "react-native-paper";
import { getUserID } from "./Login";

const url = "https://dass-team-26-backend.onrender.com";

const Edit = ({ route, navigation }) => {
  const id = route.params.id;
  const user = getUserID();

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [addednode, setaddednode] = useState("");
  const [visible1, setVisible1] = useState(false);
  const [addednode1, setaddednode1] = useState("");
  const [addednode2, setaddednode2] = useState("");
  const [addedpath1, setaddedPath1] = useState([]);
  const [addedpath2, setaddedPath2] = useState([]);
  const [addeddis, setaddedDis] = useState(0);
  const [visible2, setVisible2] = useState(false);

  const showDialog1 = () => {
    setVisible1(true);
  };

  const handleCancel1 = () => {
    setVisible1(false);
  };

  const showDialog2 = () => {
    setVisible2(true);
  };

  const handleCancel2 = () => {
    setVisible2(false);
  };

  var node = [];

  function save() {
    console.log("save was pressed");
    console.log(user);
    fetch(url + "/edit-map", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        user_id: String(user),
        map_id: String(id),
      },
      body: JSON.stringify({
        edges,
        nodes,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log(res);
        navigation.navigate("Allmaps");
      }
    });
  }

  function handledeletenode(node) {
    let newEdges = [...edges];
    while (true) {
      let change = false;
      for (let i = 0; i < newEdges.length; i++) {
        if (newEdges[i]["node1"] === node || newEdges[i]["node2"] === node) {
          newEdges.splice(i, 1);
          change = true;
          break;
        }
      }
      if (!change) {
        setEdges(newEdges);
        break;
      }
    }

    let newNodes = [...nodes];
    for (let i = 0; i < nodes.length; i++) {
      if (newNodes[i] === node) {
        newNodes.splice(i, 1);
        break;
      }
    }

    setNodes(newNodes);
  }

  // function handleaddnodes() {
  //   let newNodes = [...nodes];
  //   newNodes.push(addednode);
  //   setNodes(newNodes);
  //   setVisible1(false);
  // }

  function handleaddnodes() {
    nodes.push(addednode);
    if (nodes.length === 1) {
      setaddednode1(nodes[0]);
      setaddednode2(nodes[0]);
    }

    setVisible1(false);
  }

  function handleaddpath() {
    var is_added = false;
    for (let index = 0; index < edges.length; index++) {
      if (
        edges[index].node1 === addednode1 &&
        edges[index].node2 === addednode2
      ) {
        is_added = true;
        break;
      }
      if (
        edges[index].node1 === addednode2 &&
        edges[index].node2 === addednode1
      ) {
        is_added = true;
        break;
      }
    }
    console.log(addednode1);
    if (is_added) {
      Alert.alert("Already added");
      setVisible1(false);
    } else {
      let newEdges = [...edges];
      newEdges.push({
        desc12: addedpath1,
        desc21: addedpath2,
        node1: addednode1,
        node2: addednode2,
        "travel-time": addeddis,
      });
      setEdges(newEdges);
      console.log(edges);
      setVisible2(false);
    }
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
          console.log(body.map);
          setNodes(body.map.nodes);
          setEdges(body.map.edges);
          if (body.map.nodes.length) {
            setaddednode1(body.map.nodes[0]);
            setaddednode2(body.map.nodes[0]);
          }
        });
      } else {
        console.log(res);
      }
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1 }}>NODES</Text>

            <IconButton
              iconColor="blue"
              icon="plus-circle"
              size={25}
              onPress={() => {
                showDialog1();
              }}
            />
          </View>
          <Dialog.Container visible={visible1}>
            <Dialog.Title>ADD NODE</Dialog.Title>
            <Dialog.Input
              placeholder="Name"
              onChangeText={(text) => setaddednode(text)}
            />
            <Dialog.Button label="Cancel" onPress={handleCancel1} />
            <Dialog.Button label="ADD" onPress={handleaddnodes} />
          </Dialog.Container>
          <Text></Text>
          {nodes.map((n, i) => (
            <>
              {console.log(node)}
              <View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputStyle}
                    // defaultValue={n}
                    value={nodes[i]}
                    onChangeText={(text) => {
                      let oldVal = nodes[i];
                      console.log(text);
                      let newNodes = [...nodes];
                      newNodes[i] = text;
                      setNodes(newNodes);

                      let newEdges = [...edges];
                      for (let i = 0; i < edges.length; i++) {
                        if (newEdges[i]["node1"] === oldVal) {
                          newEdges[i]["node1"] = text;
                        }
                        if (newEdges[i]["node2"] === oldVal) {
                          newEdges[i]["node2"] = text;
                        }
                        // nodes[i] = text;
                        setEdges(newEdges);
                      }
                    }}
                  />
                  <IconButton
                    iconColor="red"
                    icon="delete"
                    size={20}
                    onPress={() => {
                      handledeletenode(nodes[i]);
                    }}
                  />
                </View>
                <Text></Text>
              </View>
            </>
          ))}
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1 }}>PATHS</Text>

            <IconButton
              iconColor="blue"
              icon="plus-circle"
              size={25}
              onPress={() => {
                showDialog2();
              }}
            />
          </View>
          <Dialog.Container visible={visible2}>
            <Dialog.Title>ADD PATH</Dialog.Title>
            <Text>Node 1</Text>
            <Picker
              mode="dropdown"
              selectedValue={addednode1}
              onValueChange={(itemValue, itemIndex) => {
                setaddednode1(itemValue);
              }}
            >
              {nodes.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
            <Text>Node 2</Text>
            <Picker
              mode="dropdown"
              selectedValue={addednode2}
              onValueChange={(itemValue, itemIndex) => {
                setaddednode2(itemValue);
              }}
            >
              {nodes.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
            <Dialog.Input
              placeholder="Distance"
              onChangeText={(text) => setaddedDis(text)}
            />
            <Dialog.Input
              placeholder="Path from node1 to node 2"
              onChangeText={(text) => setaddedPath1(text.split(","))}
            />
            <Dialog.Input
              placeholder="Path from node2 to node 1"
              onChangeText={(text) => setaddedPath2(text.split(","))}
            />
            <Dialog.Button label="Cancel" onPress={handleCancel2} />
            <Dialog.Button label="ADD" onPress={handleaddpath} />
          </Dialog.Container>
          <Text></Text>
          {edges.map((e, i) => (
            <>
              <View>
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Node 1"
                    style={styles.inputStyle}
                    value={e["node1"]}
                    editable={false}
                  />
                  <TextInput
                    style={styles.inputStyle}
                    value={e["node2"]}
                    editable={false}
                  />
                  <IconButton
                    iconColor="red"
                    icon="delete"
                    size={20}
                    onPress={() => {
                      let newEdges = [...edges];
                      newEdges.splice(i, 1);
                      setEdges(newEdges);
                    }}
                  />
                </View>
                <Text></Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputStyle}
                    // defaultValue={e["travel-time"]}
                    value={e["travel-time"]}
                    onChangeText={(text) => {
                      if (parseInt(text) != Number(text)) {
                        return;
                      }
                      let newEdges = [...edges];
                      newEdges[i]["travel-time"] = text;
                      // console.log(edges);
                      setEdges(newEdges);
                    }}
                  />
                </View>
                <Text></Text>
                <Text>Path from node 1 to node 2</Text>
                <Text></Text>
                <View style={styles.inputContainer}>
                  {e.desc12.map((d, j) => (
                    <TextInput
                      style={styles.inputStyle}
                      // defaultValue={d}
                      value={d}
                      onChangeText={(text) => {
                        let newEdges = [...edges];
                        newEdges[i].desc12[j] = text;
                        // console.tEdgeslog(edges);
                        setEdges(newEdges);
                      }}
                    />
                  ))}
                </View>
                <Text></Text>

                <Text>Path from node 2 to node 1</Text>
                <Text></Text>
                <View style={styles.inputContainer}>
                  {e.desc21.map((d, j) => (
                    <TextInput
                      style={styles.inputStyle}
                      value={d}
                      onChangeText={(text) => {
                        let newEdges = [...edges];
                        newEdges[i].desc21[j] = text;
                        setEdges(newEdges);
                        console.log(edges);
                      }}
                    />
                  ))}
                </View>
                <Text></Text>

                <View
                  style={{
                    borderBottomColor: "grey",
                    borderBottomWidth: 2,
                  }}
                />
                <Text></Text>
              </View>
            </>
          ))}
        </View>
        <Button
          title="SAVE"
          onPress={() => {
            save();
          }}
        />
        <Text></Text>
      </View>
    </ScrollView>
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
  inputStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 1,
    marginRight: 10,
    //
    fontSize: 18,
  },
  inputContainer: {
    // marginTop: 20,
    // marginRight: 60,
    flexDirection: "row",
  },
  container: {
    alignContent: "center",
    margin: 37,
  },
});

export default Edit;
