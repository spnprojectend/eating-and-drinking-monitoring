import {
  signInWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  getAuth,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export const signIn = async (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const createNewUser = async (user, name) => {
  await setDoc(doc(db, "users", user.uid), {
    name,
    id: user.uid,
    email: user.email,
    schedules: null,
    exams: null,
  });
  return true;
};

export const fetchUser = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return data;
  } else {
    console.log("No such document!");
    return {};
  }
};
export const updateUser = async (info) => {
  console.log(info);
  const { uid, name, age, weight, height, gender } = info;
  const userRef = doc(db, "users", uid);
  return await updateDoc(userRef, {
    name,
    age,
    weight,
    height,
    gender,
  });
};
export const reauthenticate = (currentPassword) => {
  const auth = getAuth();
  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    currentPassword
  );
  return reauthenticateWithCredential(auth.currentUser, credential);
};

export const saveUserNotification = async (medication) => {
  const user = getAuth().currentUser;
  const userRef = doc(db, "users", user.uid, "medications", medication.token);

  await setDoc(userRef, medication);
};
export const deleteUserNotification = async (token) => {
  const user = getAuth().currentUser;
  const userRef = doc(db, "users", user.uid, "medications", token);

  await deleteDoc(userRef);
};

export const saveUserNotes = async (notes) => {
  const user = getAuth().currentUser;
  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, {
    notes,
  });
};
export const getUserNotes = async () => {
  const user = getAuth().currentUser;
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    const { notes } = docSnap.data();
    return notes || [];
  }
  return [];
};

export const saveFoods = async (foods) => {
  console.log(foods);
  const user = getAuth().currentUser;
  const userRef = doc(
    db,
    "users",
    user.uid,
    "foods",
    generateIdFromDate(new Date())
  );

  try {
    const docSnapshot = await getDoc(userRef);
    const foodList = docSnapshot.exists() ? docSnapshot.data().foods : [];

    // Add the new foods to the existing food list
    const updatedFoodList = [...foodList, foods];

    // Update the Firestore document with the updated food list
    await setDoc(userRef, { foods: updatedFoodList });

    console.log("Foods saved successfully!");
  } catch (error) {
    console.error("Error saving foods: ", error);
  }
};

export const deleteFoods = async (foodID) => {
  const user = getAuth().currentUser;
  const userRef = doc(
    db,
    "users",
    user.uid,
    "foods",
    generateIdFromDate(new Date())
  );

  try {
    const docSnapshot = await getDoc(userRef);

    if (docSnapshot.exists()) {
      const foodList = docSnapshot.data().foods || [];

      // Find the index of the food to delete based on its ID
      const index = foodList.findIndex((food) => food.id === foodID);
      console.log(foodList);
      console.log(foodID);
      if (index !== -1) {
        // Remove the food from the food list using the splice method
        foodList.splice(index, 1);

        // Update the Firestore document with the updated food list
        await setDoc(userRef, { foods: foodList });

        console.log("Food deleted successfully!");
      } else {
        console.log("Food not found in the list!");
      }
    } else {
      console.log("No document found for the user and date!");
    }
  } catch (error) {
    console.error("Error deleting food: ", error);
  }
};

export function generateIdFromDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const id = `${year}${month.toString().padStart(2, "0")}${day
    .toString()
    .padStart(2, "0")}`;

  return id;
}
