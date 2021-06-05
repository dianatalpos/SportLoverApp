import { Text, View } from "react-native";
import React from "react"
import ParticipantItem from "../ParticipantItem";


const ParticipantsList = (props) => {
    const { participants } = props;

    const items = participants.map((participant) => <ParticipantItem participant={participant}></ParticipantItem>)


    return (
        <View>
            <Text>Participants List</Text>
            <View>{items}</View>
        </View>
    )

}

export default ParticipantsList;