import React from "react";
import { View, Text, StyleSheet, useWindowDimensions, ActivityIndicator } from "react-native";
import colors from "../../files/Colors";

const Alarm = ({ visible, name,time,dosage }) => {
    const { height, width } = useWindowDimensions()
    return (visible &&
        <View style={[styles.container, { height, width }]}>
            {
                <View style={styles.loader} >



                  

                        <Text style={styles.title}>Reminder</Text>
                        <Text style={styles.time}>{time}</Text>
                        <Text style={styles.message}>Take the medication</Text>
                        <Text style={styles.dismiss}>{name}</Text>
                        <Text style={styles.dismiss}>{dosage}</Text>

                   


                </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center"
    },
    loader: {
        height: "60%",
        backgroundColor: colors.white,
        marginHorizontal: "20%",
        borderRadius: 5,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: "10%"
    },
    text: {
        marginLeft: "10%",
        fontSize: 14,
        color: colors.greyBlue,
        fontWeight: "bold"
    },

    container2: {
        zIndex: 11,
        width: "100%"

    },
    title: {
        fontSize: 25,
        zIndex: 11,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    time: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
    },
    message: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginBottom: 10,
    },
    dismiss: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        marginBottom: 10,
    }
})
export default Alarm;
