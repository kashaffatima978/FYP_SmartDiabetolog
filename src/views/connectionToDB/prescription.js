import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { response } from "express";
import { IP } from "../../files/information"
const ip = `http://${IP}`

//method to add prescription instance
exports.addPrescription = async (title) => {
    return new Promise(async (resolve, reject) => {
        console.log(title)
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in addPrescription is", token)
        axios.post(`${ip}:3000/prescription`,
            {
                "title": title
            },
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in addPrescription ", err); reject(err) })
    })
}

//get a particular prescription instances
exports.viewParticularPrescriptionOralMedicines = (id) => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        const res = await axios.get(`${ip}:3000/prescription/${id}`,
            {
                headers: { "Authorization": "Bearer " + token },
            })
            .then(res => {
                console.log("in viewParticularPrescriptionOralMedicines ", id); console.log(res.data)
                console.log(res.data.oral_medication)
                // now get the ral medication details from the ids
                oralMedication = res.data.oral_medication
                oralMedicationDetails = []
                oralMedication.forEach((value, index, array) => {
                    axios.get(`${ip}:3000/oralmedication/${value.o_id}`,
                        { headers: { "Authorization": "Bearer " + token } },
                    )
                        .then((res) => {
                            console.log(res.data);
                            oralMedicationDetails.push(res.data);
                            console.log("array with oral medication details is ", oralMedicationDetails)
                            if (index + 1 === array.length) {
                                console.log("################################## in if")
                                console.log("array with oral medication details is ", oralMedicationDetails)
                                resolve(oralMedicationDetails)
                            }
                        })
                        .catch((err) => { console.log("error in viewParticularPrescriptionOralMedicines catch1 ", err); reject(err) })

                })

            })
            .catch((err) => { console.log("Error in viewParticularPrescriptionOralMedicines catch2 ", err); reject(err) })

    })
}

//get all to added prescription instances
exports.viewPrescriptions = () => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        const res = await axios.get(`${ip}:3000/prescription`,
            {
                headers: { "Authorization": "Bearer " + token },
            })
            .then(res => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("Error in viewPrescriptions ", err); reject(err) })
    })
}

//update a specific prescription instance title
exports.updatePrescriptionTitle = async (id, title) => {
    return new Promise(async (resolve, reject) => {
        console.log(id, title)
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in updatePrescriptionTitle is", token)
        axios.patch(`${ip}:3000/prescription/${id}`,
            {
                "title": title
            },
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in updatePrescriptionTitle ", err); reject(err) })
    })
}

//add oral medication in a specific prescription instance
exports.addOralMedicationToPrescription = async (id, name, dosage, unit, type, time) => {
    return new Promise(async (resolve, reject) => {
        console.log(id)
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in addOralMedicationToPrescription is", token)
        console.log("aaa")

        //first add oral medication
        axios.post(`${ip}:3000/oralmedication`,
            {
                "name": name,
                "dosage": dosage,
                "unit": unit,
                "type": type,
                "time": time
            },
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => {
                console.log("here")
                console.log(res.data);
                oral_id = res.data.medicine._id
                //now we have added the oral medication
                //we will add it _id to prescription oral medications
                axios.patch(`${ip}:3000/prescription/addoral/${id}`,
                    {
                        "o_id": oral_id
                    },
                    { headers: { "Authorization": "Bearer " + token } },
                )
                    .then((res) => { console.log(res.data); resolve(res.data) })
                    .catch((err) => { console.log("error in addOralMedication catch1 ", err); reject(err) })


            })
            .catch((err) => { console.log("error in addOralMedication catch 2 ", err); reject(err) })


    })
}

//delete a specific prescription instance
exports.deletePartiularPrescription = async (id) => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in updatePrescriptionTitle is", token)
        axios.delete(`${ip}:3000/prescription/${id}`,
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in deletePrescription ", err); reject(err) })
    })
}

//get particular oral medication details
exports.getOralMedicationDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in getOralMedicationDetails is", token)
        axios.get(`${ip}:3000/oralmedication/${id}`,
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => {
                console.log(`oral medication details for id ${id} are ${res.data}`)
                resolve(res.data)
            })
            .catch((err) => { console.log("error in getOralMedicationDetails", err); reject(err) })
    })
}

//update particular oral medication details
exports.updateOralMedicationDetails = (id, type, name, unit, dosage, time) => {
    console.log("data got for updating oral medication is ", id, type, name, unit, dosage, time)
    console.log("*******************************************")
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in updateOralMedicationDetails is", token)
        axios.patch(`${ip}:3000/oralmedication/${id}`,
            {
                "type": type,
                "name": name,
                "unit": unit,
                "dosage": dosage,
                "time": time
            },
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => {
                console.log(` updated oral medication details for id ${id} are ${res.data}`)
                resolve(res.data)
            })
            .catch((err) => { console.log("error in updateOralMedicationDetails", err); reject(err) })
    })
}

//delete particular oral medication details
exports.deleteOralMedicationDetails = (id, prescriptionId) => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in deleteOralMedicationDetails is", token)
        axios.delete(`${ip}:3000/oralmedication/${id}`,
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => {
                console.log(`deleting oral medication details for id ${id} and prescription id of ${prescriptionId} are ${res.data}`)
                //now remove the oral medication object from prescription as well
                axios.patch(`${ip}:3000/prescription/removeoral/${prescriptionId}`,
                    {
                        "o_id": id
                    },
                    { headers: { "Authorization": "Bearer " + token } },
                )
                    .then((res) => { console.log(res.data); resolve(res.data) })
                    .catch((err) => { console.log("error in deleteOralMedicationDetails catch1 ", err); reject(err) })


            })
            .catch((err) => { console.log("error in deleteOralMedicationDetails catch2", err); reject(err) })
    })
}

//add a fast insulin 
exports.addFastInsulin = async (name, isf, carbRatio,pres_id) => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in addFastInsulin is", token)
        axios.post(`${ip}:3000/fastinsulin`,
            {
                "name": name,
                "isf": isf,
                "carb_ratio": carbRatio,
                "prescription_id":pres_id
            },
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in addFastInsulin ", err); reject(err) })
    })
}

//update a fast insulin 
exports.updateFastInsulin = async (id,name, isf, carbRatio) => {
    console.log("for updation data send is ",id,name, isf, carbRatio)
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in updateFastInsulin is", token)
        axios.patch(`${ip}:3000/fastinsulin/${id}`,
            {
                "name": name,
                "isf": isf,
                "carb_ratio": carbRatio,
            },
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in updateFastInsulin ", err); reject(err) })
    })
}

//delete a fast insulin 
exports.deleteFastInsulin = async (id) => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in deleteFastInsulin is", token)
        axios.delete(`${ip}:3000/fastinsulin/${id}`,
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in deleteFastInsulin ", err); reject(err) })
    })
}

//view all fast insulin 
exports.viewFastInsulin = async (pres_id) => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in viewFastInsulin is", token)
        axios.get(`${ip}:3000/fastinsulin/${pres_id}`,
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in viewFastInsulin ", err); reject(err) })
    })
}

//add a long insulin 
exports.addLongInsulin = async (name, units, time,pres_id) => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in addLongInsulin is", token)
        axios.post(`${ip}:3000/longinsulin`,
            {
                "name": name,
                "units": units,
                "time": time,
                "prescription_id":pres_id
            },
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in addLongInsulin ", err); reject(err) })
    })
}

//update a long insulin 
exports.updateLongInsulin = async (id,name, units, time) => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in updateLongInsulin is", token)
        axios.patch(`${ip}:3000/longinsulin/${id}`,
            {
                "name": name,
                "units": units,
                "time": time,
            },
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in updateLongInsulin ", err); reject(err) })
    })
}

//delete a long insulin 
exports.deleteLongInsulin = async (id) => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in deleteLongInsulin is", token)
        axios.delete(`${ip}:3000/longinsulin/${id}`,
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in deleteLongInsulin ", err); reject(err) })
    })
}

//view all long insulin 
exports.viewLongInsulin = async (pres_id) => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in viewLongInsulin is", token)
        axios.get(`${ip}:3000/longinsulin/${pres_id}`,
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in viewLongInsulin ", err); reject(err) })
    })
}