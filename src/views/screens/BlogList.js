import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Heading } from '../components/Heading';
import { Card, Title, Paragraph } from 'react-native-paper';
import { IP } from '../../files/information';
import axios from 'axios';
import { Linking } from 'react-native';

const BlogList = ({ navigation }) => {
  const [mount, setMount]= useState(0)
  const ip = `http://${IP}:8000`
  const [blogs, setBlogs] = useState([])

  useEffect(()=>{

    if(mount==0){
      axios.get(ip +'/getBlog').
      then((res)=>{
        console.log(res.data.blogs)
        setBlogs(res.data.blogs)
      })
      .catch((err)=>{console.log("error in blogs", err)})
      setMount(1);
    }
  },[mount])


  const renderItem = ({ item }) => (
    
    <TouchableOpacity style={styles.blogItem} onPress={() => navigation.navigate('Blog', { blog: item })} onPress={async()=>{
      url = ('https://www.diabetes.org.uk/').concat(item.blogUrl)
      await Linking.openURL(url)

    }}>
        <Card style={{height: 250, backgroundColor: 'white', marginLeft: 10, marginRight: 10}}>
          <Text style={{height: 100, fontSize: 23, color: 'black', padding: 10}}>{item.title}</Text>
          <View style={{flexDirection: 'row'}}>
            <Card.Content style={{width: '70%'}}>
              <Paragraph>{item.summary}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: item.image }} style={{width: '27%', height:'150%'}} />
          </View>
          
        </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Heading name={'Diabetes Blogs'} />
      {blogs!=null?<FlatList
        data={blogs}
        renderItem={renderItem}
        // keyExtractor={(item) => item.id.toString()}
      />:null}
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

export default BlogList;
