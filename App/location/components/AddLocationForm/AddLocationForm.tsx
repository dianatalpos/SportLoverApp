import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Yup from "yup";
import { Colors } from "../../../theme/colors";
import { Location } from "../../types";
import Joi from 'react-native-joi';
import { ScrollView } from "react-native-gesture-handler";
import { ActivityType, activityIcons, activityTypes, ActivityItem } from "../../../event";



const modes = {
    ADD: 'add',
    EDIT: 'edit',
};

const INITIAL_LAT = 46.770439;
const INITIAL_LNG = 23.591423;

const AddLocationForm = ({ location, onAdd }) => {

    const [types, setTypes] = useState([]);
    const [typesError, setTypesError] = useState('');

    const getIconByType = (type: ActivityType): string => {
        return activityIcons[type];
    };

    const onTypeSelect = (type: ActivityType): void => {
        const isInList = types.includes(type)
        if(isInList){
            const list = types.filter(sport => sport != type)
            setTypes(list)
        }else{
            const list = [
                ...types,
                type
            ]
            setTypes(list)
        }
        console.log(types)
    };

    const activities = activityTypes.map((activity) => (
        <ActivityItem
            key={activity}
            activity={activity}
            isSelected={types.includes(activity)}
            onSelect={onTypeSelect}
            icon={getIconByType(activity)}
            isSmallIcons={true}
        />
    ));

    const navigation = useNavigation();


    const [markerCoordinates, setMarkerCoordinates] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [markerCoordinatesError, setMarkerCoordinatesError] = useState('');
    const [latitudeDelta, setLatitudeDelta] = useState(0.0922);
    const [longitudeDelta, setLongitudeDelta] = useState(0.045);

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [startTime, setStartTime] = useState('');
    const [startTimeError, setStartTimeError] = useState('');

    const [endTime, setEndTime] = useState('');
    const [endTimeError, setEndTimeError] = useState('');

    const [mode, setMode] = useState(modes.ADD);
    const [initialized, setInitialized] = useState(false);

    const [validationError, setValidationError] = useState('');


    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        let title = 'Add Location';
        if (location) {
            setLocationValues();
            setMode(modes.EDIT);
            title = 'Edit Location';
        }

        navigation.setOptions({ title });
        setInitialized(true);
    };

    const setLocationValues = () => {
        setName(location.name);
        setStartTime(location.startTime);
        setEndTime(location.endTime);
        setMarkerCoordinates({
            latitude: location.latitude,
            longitude: location.longitude,
        });
    }

    const schema = Joi.object({
        name: Joi.string()
            .min(1)
            .label("Name"),
        startTime: Joi.string()
            .min(1)
            .regex(/^([0-9]{2})\:([0-9]{2})$/)
            .label("Start Time"),
        endTime: Joi.string()
            .min(1)
            .regex(/^([0-9]{2})\:([0-9]{2})$/)
            .label("End Time"),
    });

    const generalValidation = (input, schema) => {
        const results = schema.validate(input);
        let error = null;
        if (results.error) {
            error = results.error.details[0].message;
        }

        return error;
    }

    const submit = () => {
        console.log("submit")

        const nameError = generalValidation({ name }, schema);
        setNameError(nameError);

        const startTimeError = generalValidation({ startTime }, schema);
        setStartTimeError(startTimeError);

        const endTimeError = generalValidation({ endTime }, schema);
        setEndTimeError(endTimeError);

        const markerError = (!markerCoordinates.latitude && !markerCoordinates.longitude) ? 'Please select location' : '';
        setMarkerCoordinatesError(markerError);

        const typesError = types.length == 0 ? "Please select at least one sport!" : ''; 
        setTypesError(typesError);
    

        const latitude = markerCoordinates.latitude;
        const longitude = markerCoordinates.longitude;

        const isValid = !nameError && !startTimeError && !endTimeError && !markerError;
        if (!isValid) {
            return;
        }
        setValidationError('');


        const location = new Location();
        location.name = name;
        location.startTime = startTime;
        location.endTime = endTime;
        location.sports = types;
        location.latitude = markerCoordinates.latitude;
        location.longitude = markerCoordinates.longitude;

        onAdd(location);
    };

    const onMapPress = (event) => {
        setMarkerCoordinates(event.nativeEvent.coordinate);
        const window = Dimensions.get('window');
        const { width, height } = window
        setLongitudeDelta(latitudeDelta + (width / height));
    };


    if (!initialized) {
        return <ActivityIndicator />;
    }

    return (
        <SafeAreaView style={styles.view}>

            <MapView
                initialRegion={{
                    latitude: mode === modes.ADD ? INITIAL_LAT : markerCoordinates.latitude,
                    longitude: mode === modes.ADD ? INITIAL_LNG : markerCoordinates.longitude,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta,
                }}
                onPress={onMapPress}
                style={styles.mapview}
            >
                {!!markerCoordinates.latitude && !!markerCoordinates.longitude && (
                    <Marker
                        coordinate={markerCoordinates}
                        title={name || 'New location'}
                    />
                )}

            </MapView>
            <Text style={styles.error}>
                {markerCoordinatesError}
            </Text>

            <ScrollView style={styles.form}>

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                    {nameError ? (
                        <Text style={styles.error}>
                            {nameError}
                        </Text>
                    ) : null}
                </View>

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Start Time"
                        value={startTime}
                        onChangeText={setStartTime}
                    />
                    {startTimeError ? (
                        <Text style={styles.error}>
                            {startTimeError}
                        </Text>
                    ) : null}
                </View>

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="End Time"
                        value={endTime}
                        onChangeText={setEndTime}
                    />
                    {endTimeError ? (
                        <Text style={styles.error}>
                            {endTimeError}
                        </Text>
                    ) : null}
                </View>

                <View style={styles.grid}>{activities}
                    {typesError ? (
                        <Text style={styles.error}>
                            {typesError}
                        </Text>
                    ) : null}
                </View>


                <TouchableHighlight
                    style={styles.button}
                    onPress={submit}
                >
                    <Text style={styles.buttonLabel}>{`${mode === modes.ADD ? 'Add' : 'Edit'} Location`}</Text>
                </TouchableHighlight>
            </ScrollView>
        </SafeAreaView>
    );

}


const styles = StyleSheet.create({

    view: {
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '100%',
    },
    mapview: {
        width: "100%",
        height: 150,
        borderColor: Colors.colorLightGrey,
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    form: {
        margin: 30
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    error: {
        color: Colors.error,
        marginLeft: 20,
    },
    input: {
        width: 250,
        height: 40,
        marginVertical: 15,
        padding: 5,
        textAlign: "center",
        borderColor: Colors.gradientPrimary,
        borderWidth: 1,
        borderRadius: 50,
    },
    description: {
        width: 250,
        margin: 5,
        padding: 10,
        borderColor: Colors.gradientPrimary,
        borderWidth: 1,
        borderRadius: 20,
    },
    button: {
        fontWeight: "bold",
        backgroundColor: Colors.colorTextBlack,
        color: "#fff",
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 30,
        justifyContent: "center",
        marginVertical: 30,
        marginHorizontal: 50,
        marginBottom:100,
    },
    buttonLabel: {
        color: "#fff",
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        width: '100%',
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: 20,
    },
});


export default AddLocationForm;