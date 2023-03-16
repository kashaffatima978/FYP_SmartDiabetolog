//actionType
const Authentication = "Authenticate"
const Light = "LIGHT"
const Dark = "DARK"
const Neck="NECK"
const Back="BACK"
const Arms="ARMS"
const Shoulders="SHOULDERS"
const Waist="WAIST"
const Legs="LEGS"
const Chest="CHEST"
const Cardio="CARDIO"
const ExerciseToday="EXERCISETODAY"
const ExerciseRecord="RECORD"


//action
//when to perform something it return an action type
export const setAuthentication = () => {
    return (
        { type: Authentication }
    )
}

export const setLightMode = () => {
    return (
        { type: Light }
    )
}
export const setDarkMode = () => {
    return (
        { type: Dark }
    )
}
export const setNeck = () => {
    return (
        { type: Neck }
    )
}
export const setBack = () => {
    return (
        { type: Back }
    )
}
export const setArms = () => {
    return (
        { type: Arms }
    )
}
export const setShoulders = () => {
    return (
        { type: Shoulders }
    )
}
export const setWaist = () => {
    return (
        { type: Waist }
    )
}
export const setLegs = () => {
    return (
        { type: Legs }
    )
}
export const setChest = () => {
    return (
        { type: Chest }
    )
}
export const setCardio = () => {
    return (
        { type: Cardio }
    )
}

export const setExerciseToday = () => {
    return (
        { type: ExerciseToday }
    )
}

export const setExerciseRecord = () => {
    return (
        { type: ExerciseRecord }
    )
}


//back,arms,shoulders,waist,legs,chest,cardio

//reducer function which tells what happened and what to do now
//[true,false,true,true,true,false,true,true,true,false,true,true,true,true]
export const initialstate = {record:[],authenticated: false, mode: "Light", neck:false ,back:false,arms:false,shoulders:false,waist:false,legs:false,chest:false,cardio:false,todayExerciseDone:false }
const reducerFunction = (state = initialstate, action) => {
    if (action.type === "Authenticate")
        return ({ ...state, authenticated: !state.authenticated });
    else if (action.type === "LIGHT") {
        return ({ ...state, mode: "Light" });
    }
    else if (action.type === "DARK") {
        return ({ ...state, mode: "Dark" });
    }
    else if (action.type === "NECK") {
        return ({  ...state, neck: !state.neck});
    }
    else if (action.type === "BACK") {
        return ({  ...state, back: !state.back});
    }
    else if (action.type === "ARMS") {
        return ({  ...state, arms: !state.arms});
    }
    else if (action.type === "SHOULDERS") {
        return ({  ...state, shoulders: !state.shoulders});
    }
    else if (action.type === "WAIST") {
        return ({  ...state, waist: !state.waist});
    }
    else if (action.type === "LEGS") {
        return ({  ...state, legs: !state.legs});
    }
    else if (action.type === "CHEST") {
        return ({  ...state, chest: !state.chest});
    }
    else if (action.type === "CARDIO") {
        return ({  ...state, cardio: !state.cardio});
    }
    else if (action.type === "EXERCISETODAY") {
        return ({  ...state, todayExerciseDone: !state.todayExerciseDone});
    }
    else if (action.type === "RECORD") {
        return ({  ...state, record: [...state.record,state.todayExerciseDone]});
    }
}

//store
//redux store to hold the state of our app
//use api {subscribe,dispatch,getState}
import { createStore, applyMiddleware, combineReducers } from "redux"
//import { reducerFunctionTheme } from "./theme"
// let reducers=combineReducers({
//     reducerFunctionAuth,
//     reducerFunctionTheme
//   });



export const store = createStore(reducerFunction)
