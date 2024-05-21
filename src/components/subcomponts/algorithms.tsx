import moment from "moment"
import { FoodEntryItem, FoodEntryMeal } from "./interfaces"
function GetCalorieInfo () {
  
}


function GetNutritionInfo(entries) {
  let Tcalories : number = 0
  let Tfat : number = 0
  let Tcarbs : number = 0
  let Tprotine : number = 0   

  function countNutritionInfo(meal){
    let mealCalories : number = 0
    let mealFat : number = 0
    let mealCarbs : number = 0
    let mealProtine : number = 0
    //if i want to track more things for each meal add them here

    meal.map((entry : FoodEntryItem | FoodEntryMeal)=>{
      if (entry.type == "meal") {
        countNutritionInfo(entry.ingredients)
      }
        mealCalories += entry.calories;
        mealFat += entry.fat;
        mealCarbs += entry.carbs;
        mealProtine += entry.protine;
    })

    Tcalories += mealCalories;
    Tfat += mealFat;
    Tcarbs += mealCarbs;
    Tprotine += mealProtine

    return {
      calories: mealCalories,
      fat: mealFat,
      carbs: mealCarbs,
      protine: mealProtine
    }

  }

  const breakfastObj = countNutritionInfo(entries.breakfast)
  const LunchObj = countNutritionInfo(entries.lunch)
  const DinnerObj = countNutritionInfo(entries.dinner)
  const SnacksObj = countNutritionInfo(entries.snacks)



return {
  total:{
    calories: Tcalories,
    fat: Tfat,
    carbs: Tcarbs,
    protine: Tprotine
  },
  breakfast: breakfastObj,
  lunch: LunchObj,
  dinner: DinnerObj,
  snacks: SnacksObj
}
}

function GetPersentage(divisor :number, dividend :number){
  const persentage = `${(divisor/dividend)*100}%`
  return persentage
} 



function TimeStamp () {
  return {
    day: moment().format('dddd'),
    full: moment().format('L'),
  }
}


export {GetCalorieInfo, GetNutritionInfo, TimeStamp}