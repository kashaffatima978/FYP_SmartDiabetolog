import AsyncStorage from "@react-native-async-storage/async-storage";

//storing allergic reactions in Async
//also works 
exports.storeAllergiesInAsync = (type, data) => {
    
  return new Promise((resolve,reject)=>{  //type is either food or medication
    dataGot=undefined
    if (data===null){
        dataGot=[]
    }
    else{
        dataGot=data
    }
    AsyncStorage.setItem(`@${type}`, JSON.stringify(dataGot))
        .then(async () => {
            const allergies = await AsyncStorage.getItem(`@${type}`)
            const parsed = JSON.parse(allergies)
            console.log(`In Asyncstorage stored ${type} are = ${parsed} ${typeof parsed}`)
            resolve(parsed)
        }).catch((err) => {
            console.log("storeAllergiesInAsync error ", err)
            reject(err)
        })})
}

//getting  allergies from async
exports.getAllergiesFromAsync = (type) => {
  return new Promise((resolve,reject)=>{  //type is either food or medication
    AsyncStorage.getItem(`@${type}`)
        .then((allergies) => {
            const parsed = JSON.parse(allergies)
            console.log(`data got for ${type} from Async are = ${parsed}`)
            resolve(parsed)
        }).catch((err) => {
            console.log("getAllergiesFromAsync error ", err)
            reject(err)
        })})
}


  
