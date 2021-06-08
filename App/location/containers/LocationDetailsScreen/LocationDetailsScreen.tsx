import { Spinner } from "native-base";
import React from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { Colors } from "../../../theme/colors";
import { getFields } from "../../actions"
import LocationDetails from "../../components/LocationDetails/LocationDetails";



const LocationDetailsScreen = (props) => {
    const { state,  getFields } = props;

    const {location, isFetching, isFetched} = state;

    useEffect(() => {
        if (isFetched) {
            console.log("In use effect to set participants")
            console.log(location);
            getFields(location.id);
        }
    }, [isFetched])


    const onEditLocation = () => {
        console.log("Edit Location pressed")
        // navigation.navigate("EditLocation");
    }

    const onDeleteLocation = () => {
        console.log("Delete Location")
        // A new action 
    }

    const onClickFields = () => {
        console.log()
        getFields(location.id);
    }

    return isFetching ? <Spinner color={Colors.gradientPrimary} /> :
     (<LocationDetails
        location={location}
        onClickFields={onClickFields}
        onDeleteLocation={onDeleteLocation}
        onEditLocation={onEditLocation}
    />)
}


const styles = StyleSheet.create({

})   

const mapStateToProps = (state) => ({
    state: state.locations
});

export default connect(mapStateToProps, { getFields })(LocationDetailsScreen);