import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";

import { Banner } from "react-native-paper";
import { Image } from "react-native";

export const AllActivities = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Banner
        visible={true}
        actions={[
          {
            label: "Add Details",
            onPress: () => {
              navigation.navigate("BasicInfo");
            },
          },
        ]}
        icon={({ size }) => (
          <Image
            source={{
              uri: "https://img.icons8.com/clouds/100/null/information.png",
            }}
            style={{
              width: size * 1.2,
              height: size * 1.2,
            }}
          />
        )}
      >
        We will need your basic information to calculate your profile.
      </Banner>
    </View>
  );
};
