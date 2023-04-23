import { View, ScrollView } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { TransitionPresets } from "@react-navigation/stack";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthButton, AuthInput } from "../../account/components/account.styles";
import { TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import dayjs from "dayjs";
import { NotificationContext } from "../../../services/notifications/notification.context";
import { Text } from "../../../components/typography/text.component";
import { SvgXml } from "react-native-svg";
import notification from "../../../../assets/img/notification";

const SingleMedicationScreen = ({ navigation }) => {
  const { scheduleNotifcation } = useContext(NotificationContext);
  const [time, setTime] = useState(null);
  const [showTime, setShowTime] = useState(false);

  const onTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowTime(false);
    setTime(currentDate);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      ...TransitionPresets.ModalSlideFromBottomIOS,
    });
  }, []);
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  const [days, setDays] = useState("");
  const [name, setName] = useState("");

  return (
    <ScrollView style={{ flex: 1 }}>
      <Spacer size="large" />
      <SvgXml
        key={`star-`}
        xml={notification}
        width={200}
        height={200}
        style={{
          alignSelf: "center",
        }}
      ></SvgXml>
      <View style={{ flex: 1, padding: 16 }}>
        <Spacer size="medium">
          <Text
            variant="caption"
            style={{
              textAlign: "center",
            }}
          >
            Schedule Remainders for medication
          </Text>
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Medication Name"
            value={name}
            type="text"
            keyboardType="default"
            onChangeText={(u) => setName(u)}
            style={{
              backgroundColor: "#fff",
            }}
          />
        </Spacer>
        <Spacer size="medium">
          <DropDown
            label={"Day of the week"}
            mode={"outlined"}
            visible={showMultiSelectDropDown}
            showDropDown={() => setShowMultiSelectDropDown(true)}
            onDismiss={() => setShowMultiSelectDropDown(false)}
            value={days}
            setValue={setDays}
            list={daysList}
          />
        </Spacer>
        <Spacer size="medium">
          <AuthInput
            label="Choose Time"
            value={time && dayjs(time).format("hh:mm A")}
            disabled
            mode="outlined"
            left={
              <TextInput.Icon
                icon="calendar"
                onPress={() => {
                  setShowTime(true);
                }}
              />
            }
          />
        </Spacer>
        <Spacer size="large" />
        <AuthButton
          icon="bell"
          mode="contained"
          onPress={async () => {
            const result = await scheduleNotifcation(days, time, name);
            if (result) navigation.navigate("Remainders");
          }}
          disabled={days === "" || !time || !name}
        >
          Schedule Remainder
        </AuthButton>

        {showTime && (
          <DateTimePicker
            testID="timePicker"
            value={new Date()}
            mode="time"
            onChange={onTimeChange}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default SingleMedicationScreen;
const daysList = [
  {
    label: "Sunday",
    value: "Sunday",
  },
  {
    label: "Monday",
    value: "Monday",
  },
  {
    label: "Tuesday",
    value: "Tuesday",
  },
  {
    label: "Wednesday",
    value: "Wednesday",
  },
  {
    label: "Thursday",
    value: "Thursday",
  },
  {
    label: "Friday",
    value: "Friday",
  },
  {
    label: "Saturday",
    value: "Saturday",
  },
];
