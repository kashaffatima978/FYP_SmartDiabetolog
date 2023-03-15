import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ip="http://192.168.1.10"


//get a profile information of the user 
exports.getProfileInformation = async () => {
    return new Promise(async (resolve, reject) => {

        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        const res = await axios.get(`${ip}:3000/profile`,
            {
                headers: { "Authorization": "Bearer " + token },
            }
        )
            .then((res) => { console.log(res.data); resolve(res.data) })

            .catch((err) => { console.log("Error in getProfileInformation ", err); reject(err) })
    })
}


//edit profile information of the user 
exports.editProfileInformation = async (name, email, weight, heightFeet, heightInches, diabetesType) => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        const res = await axios.patch(`${ip}:3000/`,
            {
                "name": name,
                "email": email,
                "weight": weight,
                "heightFeet": heightFeet,
                "heightInches": heightInches,
                "diabetesType": diabetesType
            },
            {
                headers: { "Authorization": "Bearer " + token },
            }
        )
            .then((res) => { console.log(res.data); resolve(res.data) })

            .catch((err) => { console.log("Error in editProfileInformation ", err); reject(err) })
    })
}

//delete  user acount
exports.deleteAccount = async () => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        const res = await axios.delete(`${ip}:3000/`,
            {
                headers: { "Authorization": "Bearer " + token },
            }
        )
            .then((res) => { console.log(res.data); resolve(res.data) })

            .catch((err) => { console.log("Error in deleteAccount ", err); reject(err) })
    })
}