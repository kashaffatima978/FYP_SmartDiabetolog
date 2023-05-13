import React, {useRef, useState} from 'react';
import YoutubePlayer, {YoutubeIframeRef} from "react-native-youtube-iframe";
import { View, Text, Button } from 'react-native';
import {getYoutubeMeta} from 'react-native-youtube-iframe';


export default function VidPlayer(props){

  const playerRef = useRef();
  const [title, setTitle] = useState('');

  getYoutubeMeta(props.vidId)
  .then(meta => {
    setTitle(meta.title)
    
  })
  .catch((err)=>{console.log('Error in vidPlayer : ',err)})

  return (
    <View style={{borderRadius: 1}}>
        <View style={styles.cardThumbnailContainer}>
            <YoutubePlayer
            videoId={props.vidId}
            ref={playerRef}
            height={230}
            width={400}
            />
        </View>
        <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>{title}</Text>
        </View>
   </View>
  );
};

const styles = {
    cardContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
      flexDirection: 'row',
      overflow: 'hidden',
      marginBottom: 10,
    },
    cardTextContainer: {
      flex: 1,
      padding: 10,
      marginBottom: 40,
    },
    cardTitle: {
      fontSize: 18,
    //   marginBottom: 5,
      color: 'black',
    },
    cardSubtitle: {
        color: '#999999',
        fontSize: 14,
      },
  };
