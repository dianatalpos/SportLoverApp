import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { AuthService } from "../../../auth";
import { AddLocationForm } from "../../components";
import { Location } from "../../types";
import { editLocation } from "../../actions"
import { connect } from "react-redux";


const EditLocationScreen = (props) => {

    const { navigation, state, editLocation } = props
    const { location } = state

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

    const onEdit = (newLocation: Location) => {
        editLocation(location.id, newLocation);

        navigation.navigate("Location")
    }


    return <SafeAreaView style={{ alignItems: "center", backgroundColor: "#fff" }}>
        <AddLocationForm
            location={location}
            onAdd={onEdit}
        ></AddLocationForm>
    </SafeAreaView>

}

const mapStateToProps = (state) => ({
    state: state.locations
});

const mapDispatchToProps = {
    editLocation
};
export default connect(mapStateToProps, mapDispatchToProps)(EditLocationScreen);
