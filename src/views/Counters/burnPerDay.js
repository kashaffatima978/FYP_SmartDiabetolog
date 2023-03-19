import getCalories from "./PerDay";

// Basal Metabolic Rate (BMR)
// Physical Activity Level (PAL)
// estimated daily energy expenditure (EDEE)
// Thermic Effect of Food (TEF)

export function getBurnCalories(gender, weight, heightFeet, heightInches,age , acitivitLevel){
    height = heightFeet+'.'+heightInches;
    height = parseInt(height)
    BMR=0
    if(gender == 'Male'){
        BMR = 88.4 + (13.4 * weight) + (4.8 * height) - (5.68 * age)
    }
    else{
        BMR = 447.6 + (9.25 * weight) + (3.10 * height) - (4.92 * age)
    }
    totalCalories = getCalories(weight, false, gender, heightFeet, heightInches,age, acitivitLevel);
    TEF =  totalCalories * 0.1
    PAL =0
    switch(activityLevel){
        case "Very Light":
            PAL = 1.2;
            break;
        case "Light":
            PAL = 1.375;
            break;
        case "Moderate":
            PAL = 1.55;
            break;
        case "Heavy":
            PAL = 1.725;
            break;
        case "Very Heavy":
            PAL =  1.9;
            break;
    }

    EDEE = BMR * PAL + TEF;
    console.log('this is the no of calories to burn ', EDEE)
    return EDEE

}