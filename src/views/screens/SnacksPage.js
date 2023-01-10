import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import MealCard from "../components/MealDishCard" ;

export default SnacksPage = function ({navigation}) {
  const addMealOpen = () => {
    navigation.navigate('AddMeal');
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.firstCon}>
        <Image
          style={styles.mainImage}
          resizeMode="contain"
          source={require('../../../assets/Images/snacks.jpg')}
        />
      </View>
      <View style={styles.secondCon}>
        <Text style={styles.mainHeading}>Snacks</Text>

        <View style={styles.mealView}>
          <ScrollView>
            <MealCard
              image={require('../../../assets/Images/recipe.jpg')}
              title={'Spinach, sweet potato and chickpea soup'}
            />
            <MealCard
              image={require('../../../assets/Images/recipe2.jpg')}
              title={'Mackerel rundown'}
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={addMealOpen}>
            <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  firstCon: {
    flex: 0.4,
  },
  mainHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  mainImage: {
    height: 180,
    width: 390,
  },
  secondCon: {
    flex: 1,
  },
  button: {
    width: 370,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#DDBEA9',
    borderRadius: 15,

    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 23,
    color: 'black',
    // fontWeight: 'bold',
  },

  mealView: {
    flex: 1,
    flexDirection: 'column',
  },
  addButton:{
    position:"absolute",  
    bottom:"5%",
    right:"4%",
    borderRadius:100,
    backgroundColor: '#DDBEA9',
    width:"20%",
    height:"10%",
    justifyContent:"center",
    alignItems:"center",
},
addButtonText:{
    fontSize:40,
    // fontWeight:"bold",
    color:"black"
},     
});
