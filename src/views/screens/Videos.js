import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Heading } from '../components/Heading';
import { Card, Title, Paragraph } from 'react-native-paper';
import { IP } from '../../files/information';
import axios from 'axios';
import VidPlayer from '../components/VidPlayer';
import Loader from '../components/loader'



const Videos = ({ navigation }) => {
  const [mount, setMount]= useState(0)
  const ip = `http://${IP}:8000`
  const [videos, setVideos] = useState([])
  const [loader, setLoader] = useState(true)

  useEffect(()=>{
    if(mount==0){
      axios.get(ip +'/getVideos').
      then((res)=>{
        console.log(res.data.ids)
        setVideos(res.data.ids)
        setLoader(false)
      })
      .catch((err)=>{console.log("error in blogs", err)})
      setMount(1);
    }
  },[mount])


  const renderItem = ({ item }) => (
    <>
        <VidPlayer vidId={item}/>
    </>
   
  );

  return (
    <View style={styles.container}>
        <Heading name={'Diabetes Videos'} />
      <Loader visible={loader}></Loader>

      {videos!=null?
      <>
        <FlatList
          data={videos}
          renderItem={renderItem}
        />
      </>
      :null}
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
