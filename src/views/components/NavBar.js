import { useState } from 'react';
import { Image, Platform, Text, TouchableWithoutFeedback} from 'react-native';

import { Appbar, Avatar , Modal} from 'react-native-paper';


const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export default NavBar = function (props) {
 
  const [profile, setprofile]= useState(props.profile); 
  return (
    <Appbar.Header style={{height: 80 , backgroundColor:"#6A6DB0" , elevation: 5, paddingRight: 10, width: '100%'}} >
       <Appbar.Content color='white' title={`Hi ${props.name} !`} subtitle={'Good Morning'} />
       {
        profile!=''?
        <Avatar.Image size={50} source={props.profile}/>
        :
        <Avatar.Text backgroundColor='#bdb2ff' size={50} label={props.name[0]} />
       }
        
        
    </Appbar.Header>
  );
};
