/**
 * LifeRealFitness Health Calculation Engine
 * Based on Mifflin-St Jeor Equation
 */

export type Gender = 'male' | 'female' | 'other';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type GoalType = 'weight_loss' | 'muscle_gain' | 'maintenance';

export const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

/**
 * Calculates Body Mass Index (BMI/IMC)
 */
export function calculateBMI(weight: number, heightCm: number): number {
  if (!weight || !heightCm) return 0;
  const heightM = heightCm / 100;
  return parseFloat((weight / (heightM * heightM)).toFixed(1));
}

/**
 * Calculates Basal Metabolic Rate (BMR/TMB)
 */
export function calculateBMR(weight: number, heightCm: number, age: number, gender: Gender): number {
  if (!weight || !heightCm || !age) return 0;
  
  // Mifflin-St Jeor
  let bmr = (10 * weight) + (6.25 * heightCm) - (5 * age);
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161; // 'female' or 'other' (defaulting to female for safety in calorie calculation)
  }
  
  return Math.round(bmr);
}

/**
 * Calculates Total Daily Energy Expenditure (TDEE/GET)
 */
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  return Math.round(bmr * ACTIVITY_FACTORS[activityLevel]);
}

/**
 * Calculates Macronutrient Distribution based on Goal
 */
export function calculateMacros(tdee: number, goal: GoalType) {
  let proteinPct, carbPct, fatPct;

  switch (goal) {
    case 'weight_loss':
      proteinPct = 0.40;
      carbPct = 0.40;
      fatPct = 0.20;
      break;
    case 'muscle_gain':
      proteinPct = 0.30;
      carbPct = 0.50;
      fatPct = 0.20;
      break;
    case 'maintenance':
    default:
      proteinPct = 0.30;
      carbPct = 0.45;
      fatPct = 0.25;
      break;
  }

  return {
    protein: Math.round((tdee * proteinPct) / 4), // 4 kcal/g
    carbs: Math.round((tdee * carbPct) / 4),   // 4 kcal/g
    fat: Math.round((tdee * fatPct) / 9),      // 9 kcal/g
    calories: tdee
  };
}
