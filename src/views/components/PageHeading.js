import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../../files/Colors';

export default PageHeading = function (props) {
  return (
    <View>
      <View style={styles.headingContainer}>
        <Image
          style={styles.headImage}
          resizeMode="contain"
          source={props.image}
        />
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headingContainer: {
    height: 200,
    width: '100%',

  },
  headingText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
    color: colors.darkGreyBlue,
    paddingVertical: 7,
  },
  headImage: {
    width:"100%",
    alignSelf:"center"
  },
  headingTextContainer: {
    flex:1
  },
  text:{
    // top:-10,
    // backgroundColor: 'blue',
    // fontSize: 40,
    // textAlign: 'center',
    // color: 'black',
    // paddingTop: 20,
    // fontWeight: 'bold'
    fontSize: 30,
        fontStyle: "italic",
        textAlign: "center",
        fontWeight: "bold",
        color: 'black',
        marginBottom: 15
  }
});
