import React from "react";
import { View } from "react-native";
import { Text } from "../../../components/typography/text.component";

import {
  TherapyCard,
  TherapyCardCover,
  Info,
  Section,
  SectionEnd,
  Address,
} from "./workout.styles";
import { Chip } from "react-native-paper";
import { Image } from "react-native";

export const WorkoutCard = ({ item = {} }) => {
  const { equipment, gifUrl, name, target } = item;

  return (
    <TherapyCard elevation={2}>
      <View>
        <Text
          variant="title"
          style={{
            textTransform: "uppercase",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          {name}
        </Text>
        <Image
          style={{
            width: "100%",
            height: 200,
            borderRadius: 7,
            objectFit: "contain",
          }}
          source={{ uri: gifUrl }}
        />
      </View>
      <Info>
        <Section>
          <SectionEnd>
            <Text variant="label">Target: {target}</Text>

            <Chip
              style={{
                backgroundColor: "#1B262C",
              }}
              textStyle={{ color: "#fff", fontWeight: "bold" }}
            >
              {equipment}
            </Chip>
          </SectionEnd>
        </Section>
      </Info>
    </TherapyCard>
  );
};
