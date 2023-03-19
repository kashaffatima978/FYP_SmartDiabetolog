

export default function getCalories(weight, pounds, gender, heightfeet,heightInch , Age ,acitivitLevel){
    height = heightfeet+'.'+heightInch
    height = parseFloat(height)
    
    console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
    height = parseFloat(height)
    BMI = weight/ (height*0.304);
    leanFactor =0
    if(pounds == true){
        weight = weight/2.2 ;
    }
    
    //Lean factor
    
    if(gender=='Male'){
        calories= weight*1.0;
        bodyFatP = (1.20 * BMI) + (0.23 * Age) - 16.2;
        if(bodyFatP> 10 && bodyFatP<=14){
            leanFactor =1.0;
        }
        else if(bodyFatP<=20){
            leanFactor =0.95;
        }
        else if(bodyFatP<=28){
            leanFactor =0.90;
        }
        else{
            leanFactor =0.85;
        }
    
    }
    else{
        calories= weight*0.9;
        bodyFatP = (1.20 * BMI) + (0.23 * Age) - 5.4;
        if(bodyFatP> 14 && bodyFatP<=18){
            leanFactor =1.0;
        }
        else if(bodyFatP<=28){
            leanFactor =0.95;
        }
        else if(bodyFatP<=38){
            leanFactor =0.90;
        }
        else{
            leanFactor =0.85;
        }
    
    }
    calories *=24
    //activity levels  (veryLight  = 1.3 ) (light = 1.55) (moderate = 1.65) (heavy = 1.80) (very heavy = 2.00)
    switch(acitivitLevel){
        case "Very Light":
            calories *=1.3;
            break;
        case "Light":
            calories *=1.55;
            break;
        case "Moderate":
            calories *=1.65;
            break;
        case "Heavy":
            calories *=1.80;
            break;
        case "Very Heavy":
            calories *=2.00;
            break;
    }
    calories = Math.round(calories)
    console.log("**************************************************************8", calories)
    return calories
    
}