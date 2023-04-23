import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";
import { getData, saveData } from "../../components/reusable/helperFun";

const FitnessContext = createContext();

const FitnessContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [completed, setCompleteds] = useState([]);
  const [workout, setWorkouts] = useState(0);
  const [calories, setCaloriess] = useState(0);
  const [minutes, setMinutess] = useState(0);

  const setCompleted = (data) => {
    setCompleteds(data);
    console.log(data);
    saveData(
      `${user.id}-completeds`,
      data?.filter((item, index) => data.indexOf(item) === index)?.toString()
    );
  };
  const setWorkout = (data) => {
    setWorkouts(data);
    console.log(data);
    saveData(`${user.id}-workouts`, data + "");
  };
  const setCalories = (data) => {
    setCaloriess(data);
    console.log(data);
    saveData(`${user.id}-caloriess`, data + "");
  };
  const setMinutes = (data) => {
    setMinutess(data);
    console.log(data);
    saveData(`${user.id}-minutess`, data + "");
  };

  const retrieveData = async () => {
    const completedData = await getData(`${user.id}-completeds`);
    if (completedData) {
      console.log(completedData);
      setCompleteds(completedData);
    }
    const workoutData = await getData(`${user.id}-workouts`);
    if (workoutData) {
      setWorkouts(parseInt(workoutData));
    }
    const caloriesData = await getData(`${user.id}-caloriess`);
    if (caloriesData) {
      setCaloriess(parseInt(caloriesData));
    }
    const minutesData = await getData(`${user.id}-minutess`);
    if (minutesData) {
      setMinutess(parseInt(minutesData));
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);
  return (
    <FitnessContext.Provider
      value={{
        completed,
        setCompleted,
        workout,
        setWorkout,
        calories,
        setCalories,
        minutes,
        setMinutes,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export { FitnessContext, FitnessContextProvider };
