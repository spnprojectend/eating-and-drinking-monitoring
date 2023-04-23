import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthenticationContext } from "../authentication/authentication.context";
export const MedicationContext = createContext();

export const MedicationContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [myMedications, setMyMedications] = useState([]);
  const [allFoods, setAllFoods] = useState([]);

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error("Failed to save data to AsyncStorage:", e);
    }
  };
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (e) {
      console.error("Failed to retrieve data from AsyncStorage:", e);
    }
  };

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "users", user.id, "medications")),
        (snapshot) => {
          if (snapshot.empty) {
            console.log("No Medication");
            setMyMedications([]);
            return;
          } else {
            const myMedics = [];
            snapshot.forEach((doc) => {
              myMedics.push(doc.data());
            });
            console.log(myMedics);
            setMyMedications(myMedics);
          }
        }
      ),
    []
  );
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "users", user.id, "foods")),
        (snapshot) => {
          if (snapshot.empty) {
            console.log("No Foods");
            setAllFoods([]);
            return;
          } else {
            const myMedics = [];
            snapshot.forEach((doc) => {
              myMedics.push(doc.data());
            });
            setAllFoods(myMedics);
          }
        }
      ),
    []
  );

  return (
    <MedicationContext.Provider
      value={{
        myMedications,
        allFoods,
        saveData,
        getData,
      }}
    >
      {children}
    </MedicationContext.Provider>
  );
};
