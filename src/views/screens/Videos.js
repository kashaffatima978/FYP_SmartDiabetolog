import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Heading } from '../components/Heading';
import { Card, Title, Paragraph } from 'react-native-paper';
import { IP } from '../../files/information';
import axios from 'axios';
import VidPlayer from '../components/VidPlayer';
import Loader from '../components/loader';
import NoInternet from '../components/NoInternet'


const Videos = ({ navigation }) => {
  const [mount, setMount]= useState(0)
  const ip = `http://${IP}:8000`
  const [videos, setVideos] = useState([])
  const [empty, setEmpty] = useState(false)
  const [loader, setLoader] = useState(true)

  useEffect(()=>{
    if(mount==0){
      axios.get(ip +'/getVideos').
      then((res)=>{
        if((res.data.ids).length==0){
          console.log('yes')
          setEmpty(true)
          setLoader(false)
        }else{
          setEmpty(false)
          setVideos(res.data.ids)
          setLoader(false)
        }
        console.log(res.data.ids)
        
      })
      .catch((err)=>{console.log("error in videos", err)})
      setMount(1);
    }
  },[mount])


  const renderItem = ({ item }) => (
    <View style={{backgroundColor: 'white', padding: 10, margin: 10, borderRadius: 5}}>
        <VidPlayer vidId={item}/>
    </View>
   
  );

  return (
    <View style={styles.container}>
        <Heading name={'Diabetes Videos'} />
      <Loader visible={loader}></Loader>

      {empty==true?
      <>
        <NoInternet/>
      </>:
      <>
        <FlatList
          data={videos}
          renderItem={renderItem}
        />
      </>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lavender'
  },
  blogItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#acc',
    paddingVertical: 10,
    marginBottom: 10
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
});

export default Videos;
