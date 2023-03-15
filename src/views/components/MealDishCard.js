
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="heart" />
const RightContent = props => <Avatar.Icon {...props} icon="view" />

const MealCard = props => {
  return (
    <Card style={{height: 330, width: '90%', alignSelf: 'center', margin:5 }}>
      <Card.Cover source={{ uri: props.image }} resizeMode={'contain'}  style={{width: '100%', height: 150, borderRadius:0}}/>
      <Card.Content>
        <Title>{props.title}</Title>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
          <Text style={styles.smallText}>Calories: {props.calories} kcl</Text>
          <Text style={styles.smallText}>Carbs: {props.carbs} g</Text>
          <Text style={styles.smallText}>Sugar: {props.sugar} g</Text>
          
        </View>
      </Card.Content>
        <Card.Title left={LeftContent} right={()=>{
          return(
            <View>
              <Text style={[styles.smallText,{marginRight: 15}]}>Cooking Time: {parseInt(props.time)} min</Text>
            </View>
          )
        }} />
  </Card>
  );
};

const styles = StyleSheet.create({
  smallText:{
    fontSize: 15,
    backgroundColor: '#e9ecef',
    padding: 5,
    borderRadius: 5

  }

});

export default MealCard;
