import React from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import { useState, useEffect } from "react";
import { Pedometer } from "expo-sensors";

const StepCounter = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));
    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      return Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);

  return (
    <>
      {isPedometerAvailable && (
        <CircularProgress
          value={currentStepCount + pastStepCount}
          radius={65}
          duration={1000}
          progressValueColor={"#222831"}
          maxValue={9000}
          title={"👟 steps"}
          titleColor={"#222831"}
          titleStyle={{ fontWeight: "bold" }}
        />
      )}
    </>
  );
};

export default StepCounter;
