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