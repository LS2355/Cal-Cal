fats, carbs, protine are meausred in grams


log data layout is 


year is labled
"2024":{
  <span style="color:green">month</span>
  [ 
    <span style="color:green"> days arr </span>
    [
      <span style="color:green"> day </span>
      {
        "date": the date
        meal of the day :[
          <span style="color:green">each object under this is a food entry item</span>
          { 
            "type": the types will either be item or meal if meal it will have a subcatigory of its own items
            "name": this is the name of the item or meal
            "calories": amount of calories
            "fat": grams of fat
            "carbs": grams of carbs
            "protine": grams of protine
            "serving size": the size of the serving
            "serving type": the type the serving is
            "amount of servings": how many of those servings you had
          },
          <span style="color:green">special event when type is meal</span>
          {
            "type": meal
            "name": meal name
            "Tcalories": total calories of all the items
            "ingredients":[ <span style="color:green">the ingrediants sub array will only be items it is made up of (no meals)</span>
              {},
              {},
              {}
            ]
            "serving size": servings size will usually just be one portion like (one taco, one sandwich, one skillet)
            "amount of servings": "how many of those servings you had"
          }
        ]

      }
    ]
  ]
}


template:
item
{
  "type": "item",
  "name": "",
  "calories": ,
  "fat": ,
  "carbs": ,
  "protine": ,
  "serving size": ,
  "serving type": "",
  "amount of servings": ,
}

{
  "type": "meal",
  "name": "",
  "Tcalories": ,
  "Tfat": ,
  "Tcarbs": ,
  "Tprotine": ,
  "ingredients": [
    {},
    {},
    {},
  ]
  "serving size": ,
  "serving type": "",
  "amount of servings": ,
}