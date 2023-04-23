import { StyleSheet, VirtualizedList } from "react-native";
import React, { useMemo } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { excersisesDB } from "../components/fitness";
import { WorkoutCard } from "../components/WorkoutCard";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FadeInView } from "../../../components/animations/fade.animation";
import { PureComponent } from "react/cjs/react.production.min";
import { Text } from "../../../components/typography/text.component";
const AllFitnessScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const data = excersisesDB[route.params.title];

  const getItemCount = () => data.length;
  const getItem = (data, index) => data[index];

  const MemoizedFitnessItem = useMemo(() => FitnessItem, []);

  return (
    <>
      <Ionicons
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", top: 10, left: 20, zIndex: 999 }}
        name="arrow-back-outline"
        size={28}
        color="black"
      />
      <Spacer size={"medium"} />
      <Text
        varient="titleLg"
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        {route.params.title}
      </Text>
      <Spacer size={"medium"} />

      <VirtualizedList
        data={data}
        getItemCount={getItemCount}
        getItem={getItem}
        renderItem={({ item }) => <MemoizedFitnessItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default AllFitnessScreen;

class FitnessItem extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <Spacer position="bottom" size="large">
        <WorkoutCard item={item} />
      </Spacer>
    );
  }
}
