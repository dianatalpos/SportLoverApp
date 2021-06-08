import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { AuthService } from "../../../auth";
import * as Yup from "yup";
import { AddLocationForm } from "../../components";
import { Location } from "../../types";
import { addLocation } from "../../actions"
import { connect } from "react-redux";


const AddLocationScreen = (props) => {

    const { navigation, addLocation } = props

    const [userId, setUserId] = useState(null);
    const [isIdLoaded, setIsIdLoaded] = useState(false);

    useEffect(() => {
        loadId();
    }, []);

    const loadId = async () => {
        const authService = new AuthService();
        authService.getId().then((data) => {
            setUserId(data)
            setIsIdLoaded(true);
        });
    };

    const onAdd = (location: Location) => {
        console.log("Pressed Add")
        addLocation(userId, location);

        navigation.navigate("Location")
        console.log("after navigate")
    }


    return <SafeAreaView style={{ alignItems: "center", backgroundColor: "#fff" }}>
        <AddLocationForm
            location={null}
            onAdd={onAdd}
        ></AddLocationForm>
    </SafeAreaView>

}

const mapDispatchToProps = {
    addLocation
};
export default connect(null, mapDispatchToProps)(AddLocationScreen);
