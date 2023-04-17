import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP } from "../../files/information"
const ip = `http://${IP}`

//add an question  
exports.addAskQuestion = async (title, detail) => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in addAskQuestion is", token)
        axios.post(`${ip}:3000/dashboard`,
            {
                "title": title,
                "detail": detail
            },
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in addAskQuestion ", err); reject(err) })
    })
}

//view all asked questions  
exports.viewAllQuestions = async () => {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in viewAllQuestions is", token)
        axios.get(`${ip}:3000/dashboard`,
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in viewAllQuestions ", err); reject(err) })
    })
}

//view particular asked question instance detail
exports.viewParticularQuestionDetail = async function (id) {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in viewParticularQuestionDetail is", token)
        axios.get(`${ip}:3000/dashboard/${id}`,
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in viewParticularQuestionDetail ", err); reject(err) })
    })
}

//add answer to a particular asked question
exports.addAnswerToQuestion = async function (id, answer) {
    return new Promise(async (resolve, reject) => {
        const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
        console.log("token in addAnswerToQuestion is", token)
        axios.patch(`${ip}:3000/dashboard/${id}`,
            { "answer": answer },
            { headers: { "Authorization": "Bearer " + token } },
        )
            .then((res) => { console.log(res.data); resolve(res.data) })
            .catch((err) => { console.log("error in addAnswerToQuestion ", err); reject(err) })
    })
}