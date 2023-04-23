import React from "react";

import { Text } from "../../../components/typography/text.component";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { HealthCard, Info, Address } from "./medication.styles";
import { colors } from "../../../infrastructure/theme/colors";

export const MedicationComponent = ({ medication = {} }) => {
  const {
    name,
    description,

    icon = "pill",
  } = medication;

  return (
    <HealthCard elevation={2}>
      <Info>
        <Text
          variant="label"
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {name}
          <MaterialCommunityIcons
            name={icon}
            color={colors.brand.primary}
            size={16}
          />
        </Text>
        <Address>{description}</Address>
      </Info>
    </HealthCard>
  );
};
