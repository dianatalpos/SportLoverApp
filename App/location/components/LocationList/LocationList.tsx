import { ActivityIndicator, Button, FlatList, FlatListProps, ImageBackground, ListRenderItem, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react';
import { Colors } from "../../../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Spinner } from "native-base";
import LocationItem from "../LocationItem";


const LocationList = (props) => {
    const { loading, locations, onAdd, onItemPressed } = props

    const renderListItem = (flatListProp) => {
        const { item } = flatListProp;
        return <LocationItem location={item} onPress={() => onItemPressed(item)} />;
    };

    return (
        <SafeAreaView style={{ backgroundColor: Colors.colorWhite }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-evenly' }}>
                    <Text style={styles.text}>My Locations</Text>

                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={onAdd}
                    >
                        <MaterialCommunityIcons name="plus" color={Colors.colorGrey} size={26} />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: Colors.colorGrey, letterSpacing: 3, fontWeight: 'bold', marginBottom: 20, marginTop: 10 }}>An alternative to promote your location!</Text>

                {loading ?
                    <Spinner color={Colors.gradientPrimary} />
                    : (locations && locations.length !== 0 ? <FlatList
                        data={locations}
                        renderItem={renderListItem}
                        keyExtractor={location => location.id}
                        style={styles.listStyle}
                    /> : locations && locations.length === 0 ? (
                        <View style={styles.addContainer}>
                            <MaterialCommunityIcons
                                style={{}}
                                name="magnify-remove-outline"
                                color={Colors.colorTextBlack}
                                size={80}
                            />
                            <Text style={styles.addTextTwo}>
                                You do not have any location yet. You can add one now!</Text></View>)
                        : null)}

            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    bkgImage: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    actionBtn: {
        width: 50,
        height: 50,
        backgroundColor: Colors.gradientPrimary,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        alignItems: 'center',
        height: '100%',
        width: '100%',
        paddingTop: 10,
    },
    text: {
        color: Colors.colorTextBlack,
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 18
    },
    addContainer: {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
    },
    addText: {
        color: Colors.colorText,
        fontSize: 24,
        marginVertical: 24,
        textAlign: 'center',
    },
    addTextTwo: {
        color: Colors.colorText,
        fontSize: 18,
        textAlign: 'center',
    },
    listStyle: {
        width: '90%',
        padding: 12,
    },
    emptyListIcon: {

    }
});

LocationList.defaultProps = {
    loading: false,
    locations: [],
    onAdd: () => { },
    onItemPressed: () => { }
}

export default LocationList;