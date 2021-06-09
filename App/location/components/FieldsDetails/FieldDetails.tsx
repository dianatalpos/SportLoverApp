import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {  Field } from "../../types";
import { Colors } from "../../../theme/colors";


const FieldDetails = (props) => {
    const { field } = props;

    return (
        <View style={styles.view}>

            <View style={styles.content}>
                <View style={styles.leftContent}>
                    <Text style={styles.primaryText}>{`Field: ${field.name}`}</Text>
                </View>

                <View style={styles.rightContent}>
                    <Text style={styles.primaryText}>{`Sport: ${field.sport}`}</Text>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 10,
        backgroundColor: Colors.colorWhite
    },
    container: {
        width: '100%',
        marginBottom: 25,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.23,
        shadowRadius: 7,
        backgroundColor: Colors.colorCard,
    },
    content: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 15,
    },
    leftContent: {
        maxWidth: '80%',
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    primaryText: {
        color: Colors.colorTextBlack,
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 8,
    },
    titleText: {
        color: Colors.colorTextBlack,
        fontWeight: '700',
        fontSize: 20,
        marginBottom: 8,
    },
    secondaryText: {
        color: Colors.colorText,
        marginBottom: 4,
    },
    avatar: { width: 150, height: 150, borderRadius: 100 },
    peopleNumber: {
        color: Colors.colorGrey,
        fontSize: 25,
        fontWeight: '700',
    }
});

FieldDetails.defaultProps = {
    location: {
        name: "N/A",
        sport: "N/A",
    } as Field,
    onPress: () => { }
};

export default FieldDetails;