import { Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { AuthService } from "../../../auth";
import { Colors } from "../../../theme/colors";
import { getLocations, setLocation } from "../../actions";
import { LocationList } from "../../components";
import { Location } from "../../types";

const LocationScreen = (props) => {
    const { navigation, state, getLocations, setLocation} = props;
    const { locations, isFetching} = state

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

    useEffect(() => {
        if (isIdLoaded) {
            getLocations(userId);
        }
    }, [userId, isIdLoaded]);


    const onAddLocation = () => {
        navigation.navigate("AddLocation");
    }


    const onItemPressed = (location: Location) => {
        setLocation(location);

        navigation.navigate("LocationDetails");
    }


    const isLoading = !isIdLoaded || isFetching;

    return (
        <View style={{ backgroundColor: "#fff" }}>
            <SafeAreaView style={{ alignItems: "center" }}>
                {isLoading ? <Spinner color={Colors.gradientPrimary} /> : <LocationList
                    loading={isFetching}
                    locations={locations}
                    onAdd={onAddLocation}
                    onItemPressed={onItemPressed}
                ></LocationList>}
            </SafeAreaView>
        </View>
    );
};



const mapStateToProps = (state) => ({
    state: state.locations,
});

const mapDispatchToProps = {
    getLocations,
    setLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen);
