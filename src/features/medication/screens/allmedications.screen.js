import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useContext, useState } from "react";
import { FadeInView } from "../../../components/animations/fade.animation";
import styled from "styled-components/native";
import { MedicationComponent } from "../components/medication.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { MedicationContext } from "../../../services/medication/medication.context";

export const AllMedications = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
const AllMedicationScreen = ({ navigation }) => {
  const { medications } = useContext(MedicationContext);
  return (
    <>
      <AllMedications
        data={medications}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SingleMedication", {
                  medication: item,
                })
              }
              style={{
                width: "50%",
              }}
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <MedicationComponent medication={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default AllMedicationScreen;
