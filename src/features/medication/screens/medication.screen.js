import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useContext } from "react";
import styled from "styled-components/native";
import { FadeInView } from "../../../components/animations/fade.animation";
import { FAB } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { Spacer } from "../../../components/spacer/spacer.component";
import { MedicationContext } from "../../../services/medication/medication.context";
import { MyMedicationComponent } from "../components/myMedication.component";
export const AllMedications = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
const MyMedicationScreen = ({ navigation }) => {
  const { myMedications } = useContext(MedicationContext);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <AllMedications
        data={myMedications}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <MyMedicationComponent medication={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.token}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          navigation.navigate("AddRemainder");
        }}
        color={"#fff"}
      />
    </View>
  );
};

export default MyMedicationScreen;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 5,
    bottom: 5,
    backgroundColor: colors.brand.primary,
  },
});
