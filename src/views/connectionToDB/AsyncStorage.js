import AsyncStorage from "@react-native-async-storage/async-storage";

//storing allergic reactions in Async
//also works 
exports.storeAllergiesInAsync = (type, data) => {

    return new Promise((resolve, reject) => {  //type is either food or medication
        dataGot = undefined
        if (data === null) {
            dataGot = []
        }
        else {
            dataGot = data
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
            })
    })
}

//getting  allergies from async
exports.getAllergiesFromAsync = (type) => {
    return new Promise((resolve, reject) => {  //type is either food or medication
        AsyncStorage.getItem(`@${type}`)
            .then((allergies) => {
                const parsed = JSON.parse(allergies)
                console.log(`data got for ${type} from Async are = ${parsed}`)
                if(parsed==null){
                    resolve([])
                }
                resolve(parsed)
            }).catch((err) => {
                console.log("getAllergiesFromAsync error ", err)
                reject(err)
            })
    })
}


//setting today date in async
exports.storeTodayDateInAsync = () => {
    date = new Date().getDate()
    //alert(date)
    console.log(`Date today @todayDate for saving in Async is ${date}`)
    AsyncStorage.setItem(`@todayDate`, JSON.stringify(date))
        .then(async () => {
            const storedDate = await AsyncStorage.getItem(`@todayDate`)
            const parsed = JSON.parse(storedDate)
            console.log(`In Asyncstorage stored todayDate is = ${parsed}`)

        })
        .catch((err) => {
            console.log("storeTodayDateInAsync error in AsycStorage", err)
        })

}

//setting whole state and  in async
exports.storeStateInAsync = (state) => {
    stateProcessed={}
    if(!state){
        stateProcessed={}
    }
    else{
        stateProcessed=state
    }
    AsyncStorage.setItem(`@state`, JSON.stringify(stateProcessed))
        .then(async () => {
            const storedDate = await AsyncStorage.getItem(`@state`)
            const parsed = JSON.parse(storedDate)
            console.log(`In Asyncstorage stored state is = ${parsed}`)
            await storeRecordStateInAsync(state.record)

        })
        .catch((err) => {
            console.log("storeStateInAsync error in AsycStorage", err)
        })

}

//setting record state in async
storeRecordStateInAsync = (record) => {
    console.log("record got in storeRecordStateInAsync is==== ",record)
    recordProcessed = []
    date = (new Date()).getDate()
    if (record.length < date - 1) {
        for (i = record.length; i < date - 1; i++) {
            record.push(false)
        }
        recordProcessed=record
    }
    else {
        recordProcessed = record
    }
    console.log("record going to be stored in ASYNC is ",recordProcessed)
    AsyncStorage.setItem(`@record`, JSON.stringify(recordProcessed))
        .then(async () => {
            const storedDate = await AsyncStorage.getItem(`@record`)
            const parsed = JSON.parse(storedDate)
            console.log(`In Asyncstorage stored record state is = ${parsed}`)

        })
        .catch((err) => {
            console.log("storeRecordStateInAsync error in AsycStorage", err)
        })

}

//getting record state from async
exports.getRecordStateFromAsync = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(`@record`)
            .then((date) => {
                const parsed = JSON.parse(date)
                //if record state is undefined
                if (!parsed) {
                    recordProcessed = []
                    date = (new Date()).getDate()
                    for (i = 0; i < date - 1; i++) {
                        recordProcessed.push(false)
                    }
                    resolve(recordProcessed)
                }
                else {
                    console.log("record  in AsyncStorage is", parsed)
                    resolve(parsed)
                }
            }).catch((err) => {
                console.log("error in getRecordStateFromAsync in AsycStorage ", err)
                reject(err)
            })
    })
}


//getting state from async
exports.getStateFromAsync = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(`@state`)
            .then((date) => {
                const parsed = JSON.parse(date)
                //if state is undefined
                if (Object.keys(parsed).length === 0 ) {
                    resolve(
                        {
                            "arms": true,
                            "authenticated": false,
                            "back": true, "cardio": true, "chest": true, "legs": true,
                            "mode": "Light",
                            "neck": true,
                            "record": [],
                            "shoulders": true,
                            "todayBreakfastDone": false,
                            "todayDinnerDone": false,
                            "todayExerciseDone": false,
                            "todayLunchDone": false,
                            "todaySnackOneDone": false,
                            "todaySnackTwoDone": false,
                            "waist": true
                        }
                    )
                }
                else {
                    console.log("state in AsyncStorage is", parsed)
                    resolve(parsed)
                }
            }).catch((err) => {
                console.log("error in getStateFromAsync in AsycStorage ", err)
                reject(err)
            })
    })
}


//getting  today date from async
exports.getTodayDateFromAsync = (type) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(`@todayDate`)
            .then((date) => {
                const parsed = JSON.parse(date)
                //console.log(`data got for todayDate from Async is = ${parsed}`)
                if (parsed === "" || !parsed) {
                    resolve(" ")
                }
                else {
                    resolve(parsed)
                }
            }).catch((err) => {
                console.log("error in getTodayDateFromAsync in AsycStorage ", err)
                reject(err)
            })
    })
}



//storing tracker Instance in Async
exports.storeTrackerInstanceInAsync = (type, data) => {

    return new Promise((resolve, reject) => {  
        //type is either bloodsugar, bloodpressure or cholesterol
        AsyncStorage.setItem(`@${type}`, JSON.stringify(data))
            .then(async () => {
                const instance = await AsyncStorage.getItem(`@${type}`)
                const parsed = JSON.parse(instance)
                console.log(`In Asyncstorage stored ${type} are = ${parsed} ${typeof parsed}`)
                resolve(parsed)
            }).catch((err) => {
                console.log("storeTrackerInstanceInAsync error ", err)
                reject(err)
            })
    })
}

//getting tracker Instance in Async
exports.getTrackerInstanceInAsync  = (type) => {
    return new Promise((resolve, reject) => {  
        AsyncStorage.getItem(`@${type}`)
            .then((instance) => {
                const parsed = JSON.parse(instance)
                console.log(`data got for ${type} from Async are = ${parsed}`)
                if(parsed==null){
                    resolve(null)
                }
                resolve(parsed)
            }).catch((err) => {
                console.log("getTrackerInstanceInAsync error ", err)
                reject(err)
            })
    })
}
