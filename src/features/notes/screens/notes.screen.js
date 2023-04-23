import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  getUserNotes,
  saveUserNotes,
} from "../../../services/authentication/authentication.service";
import Card from "../components/card";
import { COLORS, SIZES, FONTS, SHADOW } from "../components/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding,
  },
  textBoxWrapper: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SIZES.padding,
  },
  textInput: {
    paddingLeft: 15,
    width: "90%",
    marginRight: 15,
  },
  btn: {
    ...SHADOW,
    backgroundColor: "#262626",
    height: 42,
    width: 42,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function Homepage() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const didMountRef = useRef(false);
  useEffect(() => {
    getUserNotes().then((data) => {
      setList(data);
    });
  }, []);

  useEffect(() => {
    if (didMountRef.current) {
      saveUserNotes(list);
    }
    didMountRef.current = true;
  }, [list]);

  function addText(text) {
    if (value !== "") {
      setList((prev) => {
        return [
          ...prev,
          { text: text, isSelected: false }, // Adding a JS Object
        ];
      });
      setValue("");
    } else {
      alert("Please type in something!");
    }
  }

  function setIsSelected(index, value) {
    let data = [];

    // Making a deep copy of the list array
    for (let i = 0; i < list.length; i++) {
      if (index === i) {
        data.push({ ...list[i], isSelected: value }); // Updating the object at position i === index
      } else {
        data.push(list[i]);
      }
    }

    setList(data); // Setting the new state
  }

  function deleteItem(idx) {
    Alert.alert("Delete Note", "Are you sure you want to delete this Note?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          const data = list.filter((item, index) => index !== idx);
          setList(data);
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text
        variant="title"
        style={{
          textAlign: "center",
        }}
      >
        What need to be done.
      </Text>
      <Spacer size="large" />
      <FlatList
        style={{ flex: 1, marginBottom: 60 }}
        data={list}
        renderItem={({ item, index }) => (
          <Card
            data={item}
            index={index}
            setIsSelected={setIsSelected}
            deleteItem={deleteItem}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.textBoxWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="New Task"
          onChangeText={(text) => setValue(text)}
          value={value}
          mode="outlined"
          dense
        />
        <TouchableOpacity style={styles.btn} onPress={() => addText(value)}>
          <Text variant="label">🗒️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
