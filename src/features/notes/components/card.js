import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { SIZES, FONTS, COLORS, SHADOW } from "./constants";
import { Checkbox } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";

const styles = StyleSheet.create({
  view: {
    ...SHADOW,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.borderRadius,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    marginBottom: 15,
  },

  checkbox: {
    marginRight: 15,
  },
});

export default function Card(props) {
  return (
    <Pressable
      style={styles.view}
      onLongPress={() => props.deleteItem(props.index)}
    >
      <Checkbox
        style={styles.checkbox}
        status={props.data.isSelected ? "checked" : "unchecked"}
        onPress={(value) =>
          props.setIsSelected(props.index, !props.data.isSelected)
        }
      />
      <Text
        variant="label"
        style={{
          textDecorationLine: props.data.isSelected ? "line-through" : "none",
        }}
      >
        {props.data.text}
      </Text>
    </Pressable>
  );
}
