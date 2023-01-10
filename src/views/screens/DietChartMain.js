import React from 'react';
import colors from "../../files/Colors";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Image,
  View,
  Touchable,
  Modal,
  TouchableOpacity,
} from 'react-native';

import PageHeading from "../components/PageHeading"


export default DietChartMain = function ({navigation}) {
  const BreakfastOpen = () => {
    navigation.navigate('Breakfast');
  };
  const lunchOpen = () => {
    navigation.navigate('Lunch');
  };
  const snacksOpen = () => {
    navigation.navigate('Snacks');
  };
  const dinnerOpen = () => {
    navigation.navigate('Dinner');
  };
  return (
    <SafeAreaView style={styles.safeAreaCont}>
      <Image style={styles.headImage} resizeMode={"contain"} source={require('../../../assets/head3.jpg')}/>
      <Text style={styles.heading}>Diet Chart</Text>
      <View style={styles.dietInfo}>
        <Text style={styles.caloriesNumber}>560</Text>
        <Text style={styles.calories}>calories consumed</Text>

        <View style={styles.mainSmal}>
          <View style={styles.smallCon}>
            <Text style={styles.caloriesInfo}>40g</Text>
            <Text style={styles.smallConTag}>Protein</Text>
          </View>
          <View style={styles.smallCon}>
            <Text style={styles.caloriesInfo}>17g</Text>
            <Text style={styles.smallConTag}>Fats</Text>
          </View>
          <View style={styles.smallCon}>
            <Text style={styles.caloriesInfo}>18g</Text>
            <Text style={styles.smallConTag}>Carbs</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.mealCategory}>
          <View style={styles.rowMealCategory}>
            {/* BREAKFASR BUTTON */}
            <TouchableOpacity style={styles.foodButton} onPress={BreakfastOpen}>
              <Image
                style={{
                  height: 100,
                  width: 130,
                  justifyContent: 'center',
                  marginTop: 19,
                  marginLeft: 15,
                }}
                resizeMode="contain"
                source={require('../../../assets/Images/breakfast.jpg')}
              />
              <Text style={styles.Foodtext}>breakfast</Text>
            </TouchableOpacity>
            {/* LUNCH BUTTON */}
            <TouchableOpacity style={styles.foodButton} onPress={lunchOpen}>
              <Image
                style={{
                  height: 90,
                  width: 120,
                  justifyContent: 'center',
                  marginTop: 19,
                  marginLeft: 15,
                  marginBottom: 10,
                }}
                resizeMode="contain"
                source={require('../../../assets/Images/luchF.jpg.png')}
              />
              <Text style={styles.Foodtext}>Lunch</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowMealCategory}>
            {/* SNACKS BUTTON */}
            <TouchableOpacity style={styles.foodButton} onPress={snacksOpen}>
              <Image
                style={{
                  height: 100,
                  width: 130,
                  justifyContent: 'center',
                  marginTop: 19,
                  marginLeft: 15,
                }}
                resizeMode="contain"
                source={require('../../../assets/Images/snacks.jpg')}
              />
              <Text style={styles.Foodtext}>Snacks</Text>
            </TouchableOpacity>
            {/* DINNER BUTTON */}
            <TouchableOpacity style={styles.foodButton} onPress={dinnerOpen}>
              <Image
                style={{
                  height: 100,
                  width: 130,
                  justifyContent: 'center',
                  marginTop: 19,
                  marginLeft: 15,
                }}
                resizeMode="contain"
                source={require('../../../assets/Images/dinner.jpg.png')}
              />
              <Text style={styles.Foodtext}>Dinner</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeAreaCont: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  dietInfo: {
    borderWidth:1,
    flex: 0.5,
    backgroundColor: 'white',
    height: 80,
    borderRadius: 25,
    // paddingTop: 20,
    margin: 10,
    width: 370,
  },
  caloriesNumber: {
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
  calories: {
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
  },
  smallCon: {
    backgroundColor: 'white',
    height: 70,
    flex: 0.5,
    marginLeft: 10,
    borderRadius: 20,
    paddingTop: 5,
  },
  mainSmal: {
    flexDirection: 'row',
    marginTop: 15,
    height: 80,
    height: 120,
    paddingTop: 5,
  },
  smallConTag: {
    color: 'black',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
  },
  caloriesInfo: {
    marginTop: 20,
    color: 'black',
    textAlign: 'center',
    fontSize: 24,
  },
  mealCategory: {
    flex: 1,
    flexDirection: 'column',
  },
  rowMealCategory: {
    flex: 1,
    flexDirection: 'row',
  },
  foodButton: {
    backgroundColor: 'white',
    width: 170,
    height: 170,
    margin: 8,
    borderRadius: 25,
    padding: 5,
    borderWidth:1
  },
  Foodtext: {
    fontSize: 20,
    textAlign: 'center',
  },
  headImage:{
    width:"90%",
    height: 120,
    alignSelf:"center",
    marginTop: 10
  },
  heading:{
    fontSize: 30,
        fontStyle: "italic",
        textAlign: "center",
        fontWeight: "bold",
        color: 'black',
        margin: 15
  }
});
