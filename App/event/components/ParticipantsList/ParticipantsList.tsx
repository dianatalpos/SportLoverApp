import { ScrollView, ScrollViewBase, StyleSheet, Text, View } from "react-native";
import React from "react"
import ParticipantItem from "../ParticipantItem";
import { Colors } from "../../../theme/colors";


const ParticipantsList = (props) => {
    const { participants } = props;

    const items = participants.map((participant) => <ParticipantItem participant={participant}></ParticipantItem>)


    return (
        <View style={styles.content}> 
            <Text style={styles.primaryText}>Participants List</Text>
            <ScrollView  style={styles.scrollView}>{items}</ScrollView>
        </View>
    )

}

const styles= StyleSheet.create({
    content: {
        padding: 12,
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    primaryText: {
        color: Colors.colorTextBlack,
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 8,
    },
    scrollView: {
        height: 90,
        borderRadius: 15,
        borderColor: Colors.colorGrey,
        borderWidth: 1,
        }
})

export default ParticipantsList;