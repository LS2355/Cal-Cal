export interface FormDataInterface {
  type: "item";
  name?: string;
  calories: number;
  fat?: number;
  carbs?: number;
  protine?: number;
  serving_size?: number;
  serving_type: string;
  servings: number;
}

export interface FoodEntryItem {
  type: "item" | "meal";
  name?: string;
  calories: number;
  fat?: number;
  carbs?: number;
  protine?: number;
  serving_size?: number;
  serving_type: string;
  servings: number;
}

export interface FoodEntryMeal {
  type: "item" | "meal";
  name?: string;
  Tcalories?: number;
  Tfat?: number;
  Tcarbs?: number;
  Tprotine?: number;
  ingredients: FoodEntryItem[];
  serving_size?: number;
  serving_type: string;
  servings: number;
}

export interface healthInfoINTR {
  weight: number;
  height: {
    ft: number;
    in: number;
  }
  activity_level: string;
  maintenance_calories: number;
}