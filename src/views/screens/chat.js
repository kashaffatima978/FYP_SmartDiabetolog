// import React, { useState, useEffect, useCallback, useNavigation } from 'react';
// import { GiftedChat } from 'react-native-gifted-chat';
// import { io } from 'socket.io-client';
// import { ObjectId } from 'bson';
// import axios from 'axios';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { IP } from '../../files/information';
// import { getProfileInformation } from "../connectionToDB/profile"

// const Chat = () => {

//     const [messages, setMessages] = useState([]);
//     const [socket, setSocket] = useState(null);
//     const [tok, setTok] = useState("")
//     const[id,setId]=useState("")
//     const[name,setName]=useState("")
//     const ip = `http://${IP}`

//     useEffect(() => {

//         //getting profile info
//         getProfileInformation()
//             .then((res) => {
//                 console.log("profle Info===", res)
//                 setName(res.userDetails.name)
//                 setId(res.userDetails._id)
//                 if (res.userDetails.weight == undefined || res.userDetails.age == undefined || res.userDetails.heightFeet == undefined) {
//                     Alert.alert("Set Your Profile", "Thank you!")
//                 }
//             })
//             .catch(err => { console.log("Error in Home screen", err) })

//         //chat work

//         const newSocket = io(`${ip}:3000`)//"mongodb+srv://fatimaShahzad:Patanahi@cluster0.oyepgzu.mongodb.net/?retryWrites=true&w=majority");
//         newSocket.emit("hey","fati")

//         const fetchData = async () => {
//             setSocket(newSocket)
//             const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
//             setTok(token)

//             try {
//                 const response = await axios.get(`${ip}:3000/messages`,
//                     { headers: { "Authorization": "Bearer " + token } }
//                 );
//                 const messages = response.data.map(message => ({
//                     _id:message._id,
//                     text: message.text,
//                     createdAt: new Date(message.createdAt),
//                     user:{"_id":message.user._id,"name":message.user.name}
//                 }));
//                 setMessages(messages);

//                 newSocket.on('message', message => {
//                     alert("mess")
//                     setMessages(previousMessages => GiftedChat.append(previousMessages, [{
//                         _id:message._id,
//                         text: message.text,
//                         createdAt: new Date(message.createdAt),
//                         user:{"_id":message.user._id,"name":message.user.name}
//                     }]));
//                 });
//             } catch (error) {
//                 console.log('Error fetching messages: ', error);
//             }
//         };
//         fetchData();

//         return () => {
//             if (socket) {
//                 socket.off('message');
//                 socket.disconnect();
//             }
//         }
//     }, []);


//     const onSend = useCallback(async(messages = []) => {
//         const newSocket = io(`${ip}:3000`)//"mongodb+srv://fatimaShahzad:Patanahi@cluster0.oyepgzu.mongodb.net/?retryWrites=true&w=majority");
//         setSocket(newSocket)
//         const token=JSON.parse(await AsyncStorage.getItem("@token")).token
//         axios.post(`${ip}:3000/messages`,
//             {
//                 text: messages[0].text,
//                 createdAt: new Date().toISOString(),
//             },

//             { headers: { "Authorization": "Bearer " + token } }
//         ).then(res => { console.log(res) }).catch(err => { console.log("in catch 1111111111111",err) });
//         const message = {
//             _id:messages[0]._id,
//             text: messages[0].text,
//             createdAt: new Date().toISOString(),
//             user:{"_id":messages[0].user._id,"name":messages[0].user.name}
//         };
//         if (socket) {
//             alert("emir for message")
//             socket.emit('messages', message);
//         }
//         setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
//     }, []);

//     return (
//         <GiftedChat
//             messages={messages}
//             onSend={messages => onSend(messages)}
//             user={{"_id":id,"name":name}}
//             textProps={{ style: { color: 'black',backgroundolor:"grey" } }}
//         >

//         </GiftedChat>
//     );
// };

// export default Chat;


import React, { useState, useEffect, useCallback, useNavigation } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { io } from 'socket.io-client';
import { ObjectId } from 'bson';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP } from '../../files/information';
import { getProfileInformation } from "../connectionToDB/profile"

const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [tok, setTok] = useState("")
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const ip = `http://${IP}`

    useEffect(() => {

        //getting profile info
        getProfileInformation()
            .then((res) => {
                console.log("profle Info===", res)
                setName(res.userDetails.name)
                setId(res.userDetails._id)
                if (res.userDetails.weight == undefined || res.userDetails.age == undefined || res.userDetails.heightFeet == undefined) {
                    Alert.alert("Set Your Profile", "Thank you!")
                }
            })
            .catch(err => { console.log("Error in Home screen", err) })

        //chat work

        const fetchData = async () => {
            const token = (JSON.parse(await AsyncStorage.getItem("@token")).token)
            setTok(token)

            try {
                const response = await axios.get(`${ip}:3000/messages`,
                    { headers: { "Authorization": "Bearer " + token } }
                );
                const messages = response.data.map(message => ({
                    _id: message._id,
                    text: message.text,
                    createdAt: new Date(message.createdAt),
                    user: { "_id": message.user.user_id, "name": message.user.name }
                }));
                setMessages(messages);


            } catch (error) {
                console.log('Error fetching messages: ', error);
            }
        };
        fetchData();
    }, []);


    const onSend = useCallback(async (messages = []) => {
        const token = JSON.parse(await AsyncStorage.getItem("@token")).token
        axios.post(`${ip}:3000/messages`,
            {
                text: messages[0].text,
                createdAt: new Date().toISOString(),
            },

            { headers: { "Authorization": "Bearer " + token } }
        )
        .then(res => { 
            console.log(res.data) 
            const message = {
                _id: res.data._id,
                text: res.data.text,
                createdAt: res.data.createdAt,
                user: { "_id": res.data.user.user_id, "name":res.data.user.name }
            };
            setMessages(previousMessages => GiftedChat.append(previousMessages, message));
        })
        .catch(err => { console.log("in catch 1111111111111", err) });
        // const message = {
        //     _id: messages[0]._id,
        //     text: messages[0].text,
        //     createdAt: new Date().toISOString(),
        //     user: { "_id": messages[0].user._id, "name": messages[0].user.name }
        // };
        // setMessages(previousMessages => GiftedChat.append(previousMessages, message));
    }, []);

  
    const renderBubble = (props) => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#6A6DB0', // Change the background color for outgoing messages
              },
              left: {
                backgroundColor: 'lightgrey', // Change the background color for incoming messages
              },
            }}
            textStyle={{
              right: {
                color: '#FFFFFF', // Change the text color for outgoing messages
              },
              left: {
                color: 'black', // Change the text color for incoming messages
              },
            }}
          />
        );
      };
    return (
        <GiftedChat 
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{ "_id": id, "name": name }}
            textProps={{ style: { color: 'black' } }}
            renderBubble={renderBubble}
        >

        </GiftedChat>
    );
};

export default Chat;
