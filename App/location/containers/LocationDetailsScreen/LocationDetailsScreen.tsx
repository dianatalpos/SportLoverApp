import { Spinner } from "native-base";
import React, { useState } from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { Colors } from "../../../theme/colors";
import { getFields, addField } from "../../actions"
import FieldDialog from "../../components/FieldDialog";
import LocationDetails from "../../components/LocationDetails/LocationDetails";
import { Field } from "../../types";



const LocationDetailsScreen = (props) => {
    const { navigation, state, getFields, addField } = props;
    const { locationRed, fieldsRed } = state
    const { location, isFetching, isFetched } = locationRed;
    const { fields, areFetching } = fieldsRed
    const [
        dialogShow, setDialogShow
    ] = useState(false);

    const [sports, setSports] = useState([])
    const isLoading = isFetching && areFetching;

    useEffect(() => {
        if (isFetched) {
            getFields(location.id);
            setSports(location.sports)
        }
    }, [isFetched])

    const sportData = location.sports.map((sport) => { return { value: sport } })
    
    const onEditLocation = () => {
        navigation.navigate("EditLocation");
    }

    const onDeleteLocation = () => {
        console.log("Delete Location")
        // A new action 
    }

    const onAddField = (field: Field) => {
        addField(location.id, field)

        setDialogShow(false)
    }

    const onClickFields = () => {
        setDialogShow(true)
    }

    const onDismiss = () => {
        setDialogShow(false);
    }

    return isLoading ? <Spinner color={Colors.gradientPrimary} /> :
        (<View>
            <LocationDetails
                location={location}
                fields={fields}
                onClickFields={onClickFields}
                onDeleteLocation={onDeleteLocation}
                onEditLocation={onEditLocation}
            />

            <FieldDialog
                sports={sportData}
                onAdd={onAddField}
                show={dialogShow}
                onDismiss={onDismiss}
            > </FieldDialog>
        </View>
        )
}

const mapStateToProps = (state) => ({
    state: {
        locationRed: state.locations,
        fieldsRed: state.fields,
    }
});

export default connect(mapStateToProps, { getFields, addField })(LocationDetailsScreen);