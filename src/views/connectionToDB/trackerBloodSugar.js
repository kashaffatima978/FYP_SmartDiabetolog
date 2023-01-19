import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { response } from "express";

//method to add blood sugar instance
exports.addBloodSugarRecord = async (concentration, unit, description, event, creationDate, creationTime) => {
    return new Promise(async (resolve, reject) => {
        console.log(concentration, unit, description, event, creationDate, creationTime)
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in addbloddSugar is", token)
        axios.post("http://10.0.2.2:3000/bloodsugar",
            {
                "concentration": concentration,
                "unit": unit,
                "description": description,
                "event": event,
                "creationDate": creationDate,
                "creationTime": creationTime
            },
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in addBloodSugarRecord ", err); reject(err) })
    })
}




//get all to added blood sugar instances of a day
exports.viewBloodSugarRecord = () => {
    //get todsys, week start and weed end dates
    let date = `${(new Date()).getDate()}-${(new Date()).getMonth() + 1}-${(new Date()).getFullYear()}`;
    console.log("today date is ", date)
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        const res = await axios.get(`http://10.0.2.2:3000/bloodsugar/${date}`,
            {
                headers: { "Authorization": "Bearer " + token },
            })
            .then(res => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("Error in viewBloodPressureRecord ", err); reject(err) })
    })
}

//get a specific blood sugar instance
exports.viewBloodSugarInstance = async (id) => {
    return new Promise(async (resolve, reject) => {
        console.log(id)

        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        const res = await axios.get(`http://10.0.2.2:3000/bloodsugar/instance/${id}`,
            {
                headers: { "Authorization": "Bearer " + token },
            }
        )
            .then((res) => { console.log(res.data); resolve(res.data) })

            .catch((err) => { console.log("Error in viewBloodSugarInstance ", err); reject(err) })
    })
}

//update a specific blood sugar instance
exports.updateBloodSugarRecord = async (id,concentration, unit, description, event, creationDate, creationTime) => {
    return new Promise(async (resolve, reject) => {
        console.log(id,concentration, unit, description, event, creationDate, creationTime)
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in updatebloddSugar is", token)
        axios.patch(`http://10.0.2.2:3000/bloodsugar/instance/${id}`,
            {
                "concentration": concentration,
                "unit": unit,
                "description": description,
                "event": event,
                "creationDate": creationDate,
                "creationTime": creationTime
            },
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in updateBloodSugarRecord ", err); reject(err) })
    })
}

//get a specific blood sugar instance
exports.deleteBloodSugarInstance = async (id) => {
    return new Promise(async (resolve, reject) => {
        console.log(id)
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        const res = await axios.delete(`http://10.0.2.2:3000/bloodsugar/instance/${id}`,
            {
                headers: { "Authorization": "Bearer " + token },
            }
        )
            .then((res) => { console.log(res.data); resolve(res.data) })

            .catch((err) => { console.log("Error in deleteBloodSugarInstance ", err); reject(err) })
    })
}