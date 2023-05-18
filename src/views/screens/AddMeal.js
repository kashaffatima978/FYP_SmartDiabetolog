import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import PageHeading from '../components/PageHeading';
import { Heading } from '../components/Heading';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import { addOralMedicationToPrescription, getOralMedicationDetails, updateOralMedicationDetails, deleteOralMedicationDetails } from "../connectionToDB/prescription"
import axios from "axios";
import { IP } from "../../files/information"
import SelectDropdown from "react-native-select-dropdown";
import OptionsMenu from "react-native-options-menu";
import { AddMealInAsync } from "../connectionToDB/AsyncStorage"
import { useDispatch } from "react-redux/es/exports";
import { setAuthentication, setBreakfastToday, setLunchToday, setDinnerToday, setSnackOneToday, setSnackTwoToday } from "../../redux/reduxActions";
import { store } from "../../redux/reduxActions";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Loader from "../components/loader";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


export default AddMeal = function ({ navigation }) {
  const [top, setTop] = useState(null)
  const [side, setSide] = useState(null)
  const [foodTime, setFoodTime] = useState('Breakfast')
  const ip = `http://${IP}`
  const [name, setName] = useState()
  const [calories, setCalories] = useState(0)
  const [loader, setLoader] = useState(false)

  const dispatch = useDispatch()
  const myIcon = (<Icon name="ellipsis-h" size={20} color="black" />)

  openLibraryTop = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        console.log(response)
        setTop(response)
      }
    })
  }

  openLibrarySide = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        console.log(response)
        setSide(response)
      }
    })
  }


  const topImage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        const options = {
          quality: 1,
          cameraType: 'back'
        };
        launchCamera(options)
          .then((response) => {

            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              console.log('we got the top food image ');
              setTop(response)
              console.log(top)
            }
          })
          .catch(err => { console.log('image not given', err) });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }
  const onSave = async () => {
    setLoader(true)
    //name,calories,type
    console.log(name)
    //changing the state of food type in redux
    dispatch(setAuthentication())
    switch (foodTime) {
      case "Breakfast": if (!(store.getState().todayBreakfastDone)) { dispatch(setBreakfastToday()) }; break;
      case "Lunch": if (!(store.getState().todayLunchDone)) { dispatch(setLunchToday()) }; break;
      case "Dinner": if (!(store.getState().todayDinnerDone)) { dispatch(setDinnerToday()) }; break;
      case "Snack1": if (!(store.getState().todaySnackOneDone)) { dispatch(setSnackOneToday()) }; break;
      case "Snack2": if (!(store.getState().todaySnackTwoDone)) { dispatch(setSnackTwoToday()) }; break;
    }
    await AddMealInAsync(name, calories, foodTime)
    setLoader(false);
    navigation.navigate("Diet")
  }
  const sideImage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        const options = {
          quality: 1,
          cameraType: 'back'
        };
        launchCamera(options)
          .then((response) => {

            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              console.log('we got the top food image ');
              setSide(response)
            }
          })
          .catch(err => { console.log('image not given', err) });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const predict = () => {
    if (top !== null && side !== null) {
      const formData = new FormData();
      formData.append('top', { uri: top.assets[0].uri, name: top.assets[0].fileName, type: top.assets[0].type });
      formData.append('side', { uri: side.assets[0].uri, side: side.assets[0].fileName, type: side.assets[0].type });
      console.log(formData)

      //axios request towards api
      axios.post(ip + ':8000/getVolume', {
        'top': { uri: top.assets[0].uri, name: top.assets[0].fileName, type: top.assets[0].type },
        'side': { uri: side.assets[0].uri, side: side.assets[0].fileName, type: side.assets[0].type }
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          console.log(response)
        })
        .catch((err) => { console.log('error in sending food image:', err) })

    }
    else {
      alert('Add Both Images')
    }
  }


  const Manual = () => {
    return (
      <>
       <Loader visible={loader}></Loader>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Icon name="utensils" size={25} style={styles.icon} />
          <View style={{ width: "85%" }}>
            <Text style={styles.label}>Dish name:</Text>
            <TextInput style={styles.input} multiline={true} placeholder="Enter dish name" value={name} onChangeText={setName} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Icon name="heartbeat" size={25} style={styles.icon} />
          <View style={{ width: "85%" }}>
            <Text style={styles.label}>Calories:</Text>
            <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter dish calories" value={calories} onChangeText={setCalories} />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginTop: 10 }}>
            <SelectDropdown
              style={styles.dropdown}
              data={['Breakfast', 'Lunch', 'Snack1', 'Snack2', 'Dinner']}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setFoodTime(selectedItem)
              }}

              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;

              }}
              rowTextForSelection={(selectedItem, index) => {
                return selectedItem;
              }}

              buttonStyle={{ color: "red", width: "80%", margin: 6, backgroundColor: '#b8bedd', height: 50, borderRadius: 15, marginRight: '10%' }}

              buttonTextStyle={
                {
                  fontSize: 14,
                  color: 'black',
                  textTransform: "capitalize",
                  fontWeight: "bold"
                }
              }
              defaultButtonText={foodTime}

              dropdownIconPosition="right"
              dropdownStyle={{ backgroundColor: "white" }}
              rowStyle={{ backgroundColor: 'lavender', margin: 4 }}
              rowTextStyle={{ color: "black" }}>
            </SelectDropdown>

          </View>
        </View>

        <TouchableOpacity style={styles.saveButtonContainer}
          onPress={() => onSave()}>
          <Text style={styles.saveButtonText} >Save</Text>
        </TouchableOpacity>
      </>
    )
  }


  const Camera = () => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={styles.text}>Images:</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>


          <View style={[styles.saveButtonContainer, { width: 100, backgroundColor: 'lavender', flexDirection: 'row' }]}>
            <Text style={[styles.saveButtonText, { color: 'black', marginRight: 10, marginBottom: 5 }]}>
              Top
            </Text>

            <OptionsMenu
              customButton={myIcon}
              destructiveIndex={1}
              options={["Camera", "Gallery", "Cancel"]}
              actions={[topImage, openLibraryTop]}
            />

          </View>

          <View style={[styles.saveButtonContainer, { width: 100, backgroundColor: 'lavender', flexDirection: 'row' }]}>
            <Text style={[styles.saveButtonText, { color: 'black', marginRight: 10, marginBottom: 5 }]}>
              Side
            </Text>

            <OptionsMenu
              customButton={myIcon}
              destructiveIndex={1}
              options={["Camera", "Gallery", "Cancel"]}
              actions={[sideImage, openLibrarySide]}
            />

          </View>

        </View>
        <TouchableOpacity style={styles.saveButtonContainer} onPress={predict}>
          <Text style={styles.saveButtonText} >predict</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Heading name="Meal" style={{ marginBottom: 0 }} />
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Manual') {
            iconName = focused
              ? 'clipboard'
              : null;
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          else if (route.name === 'Camera') {
            iconName = focused ? 'camera' : null;
          }
          return <Icon name={iconName} size={20} color={color} />;
        },
        tabBarActiveTintColor: '#6A6DB0',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarHideOnKeyboard: true,

      })}>
        <Tab.Screen name="Manual" component={Manual} />

        <Tab.Screen name="Camera" component={Camera} />

      </Tab.Navigator >
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  scrollViewCon: {
    flex: 1,
    marginTop: 30,
    padding: 5,
    backgroundColor: 'white'
  },
  textView: {
    flex: 0.1,
    backgroundColor: "#FFE8D6",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 25,
    color: "#4A3C31",
    // fontWeight: "bold"
  },
  saveButtonContainer: {
    backgroundColor: "#6A6DB0",
    width: 250,
    height: 50,
    borderRadius: 25,
    marginTop: 40,
    padding: 10,
    alignSelf: "center"
  },
  saveButtonText: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    padding: 5,
  },
  text: {

    fontSize: 14,
    color: 'black',
    textTransform: "capitalize",
    fontWeight: "bold"
  },
  icon: {
    width: "13%",
    height: 50,
    backgroundColor: "#b8bedd",
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 25,
    textAlign: 'center',
    margin: 5,
    verticalAlign: 'middle'
  }
  , input: {
    width: '94%',
    // backgroundColor: '#b8bedd',
    // margin: 10,
    // alignSelf: 'center',
    // borderRadius: 10,
    // padding: 10,

    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    // elevation: 5,
  }
  , saveButtonContainer: {
    backgroundColor: "#6A6DB0",
    width: 250,
    height: 50,
    borderRadius: 25,
    marginTop: 40,
    padding: 10,
    alignSelf: "center"
  },
  saveButtonText: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    paddingLeft: 8,
  },
});
