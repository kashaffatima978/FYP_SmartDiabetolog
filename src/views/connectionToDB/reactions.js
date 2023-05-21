import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP } from "../../files/information"
const ip = `http://${IP}`

//add an allergic reaction 
exports.addAllergicReaction= async (name, symtoms,type, description,active_agent) => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in addAllergicReaction is", token)
        axios.post(`${ip}:3000/allergicreaction`,
            {
                "name": name,
                "symtoms": symtoms,
                "type": type,
                "description":description,
                "active_agent":active_agent
            },
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in addAllergicReaction ", err); reject(err) })
    })
}

//update a long insulin 
exports.updateAllergicReaction = async (id,name, symtoms,type, description) => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in updateAllergicReaction is", token)
        axios.patch(`${ip}:3000/allergicreaction/${id}`,
            {
                "name": name,
                "symtoms": symtoms,
                "type": type,
                "description":description
            },
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in updateAllergicReaction ", err); reject(err) })
    })
}

//delete a long insulin 
exports.deleteAllergicReaction = async (id) => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in deleteAllergicReaction is", token)
        axios.delete(`${ip}:3000/allergicreaction/${id}`,
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in deleteAllergicReaction ", err); reject(err) })
    })
}

//view particular reaction instance 
exports.viewParticularAllergicReaction = async (id) => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in viewParticularAllergicReaction is", token)
        axios.get(`${ip}:3000/allergicreaction/${id}`,
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in viewParticularAllergicReaction ", err); reject(err) })
    })
}

//view all reactions for a specific type  
exports.viewAllTypeAllergicReaction = async (type) => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in viewAllTypeAllergicReaction is", token)
        axios.get(`${ip}:3000/allergicreaction/type/${type}`,
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in viewAllTypeAllergicReaction ", err); reject(err) })
    })
}