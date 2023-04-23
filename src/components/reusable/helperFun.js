import { Text } from "../typography/text.component";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function calculateIdealWeight(age, gender, height) {
  const heightMeters = height / 100;

  // Calculate ideal weight based on gender and height using popular formulas
  let idealWeight;
  if (gender === "male") {
    idealWeight = 50 + 0.91 * (heightMeters - 152.4) + ((age - 30) / 10) * 0.5;
  } else {
    idealWeight =
      45.5 + 0.91 * (heightMeters - 152.4) + ((age - 30) / 10) * 0.5;
  }

  // Round the result to two decimal places
  return Math.round(idealWeight * 100) / 100;
}

export function calculateBMI(height, weight) {
  // Convert height to meters
  let heightMeters = height / 100;

  // Calculate BMI
  let bmi = weight / heightMeters ** 2;

  // Return BMI rounded to 2 decimal places
  return parseFloat(bmi.toFixed(2));
}

export function getWeightStatus(bmi) {
  if (bmi < 18.5) {
    return (
      <Text style={{ color: "#ea002f" }} variant="title">
        Under Weight
      </Text>
    );
  } else if (bmi >= 18.5 && bmi < 25) {
    return (
      <Text style={{ color: "#319a1a" }} variant="title">
        Normal Weight
      </Text>
    );
  } else if (bmi >= 25 && bmi < 30) {
    return (
      <Text style={{ color: "#ff0" }} variant="title">
        Over Weight
      </Text>
    );
  } else if (bmi >= 30 && bmi < 35) {
    return (
      <Text style={{ color: "#f38622" }} variant="title">
        Obese Class I
      </Text>
    );
  } else if (bmi >= 35 && bmi < 40) {
    return (
      <Text style={{ color: "#ea002f" }} variant="title">
        Obese Class II
      </Text>
    );
  } else {
    return (
      <Text style={{ color: "#ea002f" }} variant="title">
        Obese Class III
      </Text>
    );
  }
}

export function calculateBodyFatPercentage(params) {
  const age = parseInt(params.age);
  const gender = params.gender.toLowerCase();
  const weight = parseFloat(params.weight);
  const height = parseFloat(params.height);
  const neck = parseFloat(params.neck);
  const waist = parseFloat(params.waist);
  const hip = parseFloat(params.hip);

  let bodyFatPercentage = 0;

  if (gender === "male") {
    bodyFatPercentage =
      495 /
        (1.0324 -
          0.19077 * Math.log10(waist - neck) +
          0.15456 * Math.log10(height)) -
      450;
  } else if (gender === "female") {
    bodyFatPercentage =
      495 /
        (1.29579 -
          0.35004 * Math.log10(waist + hip - neck) +
          0.221 * Math.log10(height)) -
      450;
  } else {
    throw new Error("Invalid gender provided");
  }

  return bodyFatPercentage.toFixed(2);
}

export function calculateDailyCalories(
  age,
  gender,
  weight,
  height,
  activityLevel
) {
  let bmr; // Basal metabolic rate
  let calories; // Daily calorie intake

  // Determine the basal metabolic rate based on gender
  if (gender === "male") {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }

  // Apply activity level to the basal metabolic rate
  switch (activityLevel) {
    case "sedentary":
      calories = bmr * 1.2;
      break;
    case "lightlyActive":
      calories = bmr * 1.375;
      break;
    case "moderatelyActive":
      calories = bmr * 1.55;
      break;
    case "veryActive":
      calories = bmr * 1.725;
      break;
    case "extraActive":
      calories = bmr * 1.9;
      break;
    default:
      throw new Error("Invalid activity level provided");
  }

  return calories.toFixed(2);
}
export function calculateWaterRequirement(weightInKg) {
  const waterRequirementInLiters = weightInKg * 0.033;
  return waterRequirementInLiters.toFixed(2);
}
//METs x 3.5 x (your body weight in kilograms) / 200

export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error("Failed to save data to AsyncStorage:", e);
  }
};

// Retrieve data from AsyncStorage
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error("Failed to retrieve data from AsyncStorage:", e);
  }
};
