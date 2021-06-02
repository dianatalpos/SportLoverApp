import React from "react";
import { Text } from "react-native";

const initialState = {
    profile: {},
};
export default class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    render() {
        return <Text>Profile</Text>;
    }
}
