import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { response } from "express";

//method to add cholesterol instance
exports.addCholesterolRecord = async (hdl, ldl, triglycerides, description) => {
    return new Promise(async (resolve, reject) => {
        console.log(hdl, ldl, triglycerides, description)
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in addCholesterol is", token)
        axios.post("http://10.0.2.2:3000/cholesterol",
            {
                "hdl": hdl,
                "ldl": ldl,
                "triglycerides": triglycerides,
                "description": description
            },
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in addCholesterolRecord ", err); reject(err) })
    })
}




//get all to added cholesterol instances
exports.viewCholesterolRecord = () => {
    //get the running year
    let year=(new Date()).getFullYear()
    console.log("year is ", year)
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        const res = await axios.get(`http://10.0.2.2:3000/cholesterol/${year}-01-01/${year}-12-31`,
            {
                headers: { "Authorization": "Bearer " + token },
            })
            .then(res => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("Error in viewCholesterolRecord ", err); reject(err) })
    })
}

//get a specific cholesterol instance
exports.viewCholesterolInstance = async (id) => {
    return new Promise(async (resolve, reject) => {
        console.log(id)
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        const res = await axios.get(`http://10.0.2.2:3000/cholesterol/instance/${id}`,
            {
                headers: { "Authorization": "Bearer " + token },
            }
        )
            .then((res) => { console.log(res.data); resolve(res.data) })

            .catch((err) => { console.log("Error in viewCholesterolInstance ", err); reject(err) })
    })
}

//update a specific cholesterol instance
exports.updateCholesterolRecord = async (id,hdl, ldl, triglycerides, description) => {
    return new Promise(async (resolve, reject) => {
        console.log(id,hdl, ldl, triglycerides, description)
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in updatecholesterol is", token)
        axios.patch(`http://10.0.2.2:3000/cholesterol/instance/${id}`,
            {
                "hdl": hdl,
                "ldl": ldl,
                "triglycerides": triglycerides,
                "description": description
            },
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in updateCholesterolrRecord ", err); reject(err) })
    })
}

//delete a specific cholesterol instance
exports.deleteCholesterolInstance = async (id) => {
    return new Promise(async (resolve, reject) => {
        console.log(id)
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        const res = await axios.delete(`http://10.0.2.2:3000/cholesterol/instance/${id}`,
            {
                headers: { "Authorization": "Bearer " + token },
            }
        )
            .then((res) => { console.log(res.data); resolve(res.data) })

            .catch((err) => { console.log("Error in deleteCholesterolInstance ", err); reject(err) })
    })
}