import React, { useContext } from "react";

import { Text } from "../../../components/typography/text.component";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../infrastructure/theme/colors";
import { HealthCard, Info, Section, SectionEnd } from "./medication.styles";
import { Chip } from "react-native-paper";
import dayjs from "dayjs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NotificationContext } from "../../../services/notifications/notification.context";
import { SvgXml } from "react-native-svg";
import tablets from "../../../../assets/img/tablets";

const DeleteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 9;
`;

export const MyMedicationComponent = ({ medication }) => {
  const { name, time, token, day } = medication;
  const { cancelNotification } = useContext(NotificationContext);
  return (
    <HealthCard elevation={2}>
      <DeleteButton
        onPress={() => {
          cancelNotification(token);
        }}
      >
        <MaterialCommunityIcons name="delete" size={20} color={"#E84545"} />
      </DeleteButton>

      <Info>
        <Text variant="title">{name}</Text>
        <Section
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View>
            <SvgXml
              key={`star-`}
              xml={tablets}
              width={70}
              height={70}
              style={{
                alignSelf: "center",
              }}
            ></SvgXml>
          </View>
          <SectionEnd>
            <Chip
              style={{
                backgroundColor: colors.brand.dark,
                marginLeft: 10,
              }}
              textStyle={{
                color: "#fff",
                fontSize: 12,
                fontWeight: "bold",
                letterSpacing: 1,
                textAlign: "center",
              }}
            >
              Every {day} {dayjs(time.toDate()).format("hh:mm A")}
            </Chip>
          </SectionEnd>
        </Section>
      </Info>
    </HealthCard>
  );
};
