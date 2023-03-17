import {  store } from "../redux/reduxActions";
import { useDispatch } from "react-redux/es/exports";
import { setNeck,setArms,setLegs,setWaist,setCardio,setChest,setBack,setShoulders } from "../redux/reduxActions";


export default function setInitialStatesAfterRegisteration(){
    const dispatch = useDispatch();

    //set neck exercise to ON initially
    dispatch(setNeck())
    dispatch(setArms())
    dispatch(setLegs())
    dispatch(setShoulders())
    dispatch(setChest())
    dispatch(setCardio())
    dispatch(setBack())
    dispatch(setWaist())

    //todayExerciseDone is initially false already
    //now set record
    alert((new Date()).getDate())

    //print the state now after registeration
    console.log("state after the registeration is ",store.getState())
}