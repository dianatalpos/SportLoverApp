import { ActivityIndicator, Button, FlatList, FlatListProps, ImageBackground, ListRenderItem, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react';
import { Colors } from "../../../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EventItem from "../EventItem"
import { Event } from "../../types";
import { Spinner } from "native-base";



const EventList = (props) => {
    const { loading, events, onAdd, onItemPressed, title, message, shouldShowAddButton} = props

    const renderListItem = (flatListProp) => {
        const { item } = flatListProp;
        return <EventItem event={item} onPress={() => onItemPressed(item)} />;
    };

    return (
        <SafeAreaView style={{ backgroundColor: Colors.colorWhite }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-between' }}>
                    <Text style={styles.text}>{title}</Text>
                    {shouldShowAddButton ? (<TouchableOpacity
                        style={styles.actionBtn}
                        onPress={onAdd}
                    >
                        <MaterialCommunityIcons name="plus" color={Colors.colorGrey} size={26} />
                    </TouchableOpacity>) : null}
                </View>
                <Text style={{ color: Colors.colorGrey, letterSpacing: 3, fontWeight: 'bold', marginBottom: 20, marginTop: 10 }}>{message}</Text>

                {loading ?
                    <Spinner color={Colors.gradientPrimary} /> :
                    (events && events.length !== 0 ? <FlatList
                        data={events}
                        renderItem={renderListItem}
                        keyExtractor={event => event.id}
                        style={styles.listStyle}
                    /> : events && events.length === 0 ? (
                        <View style={styles.addContainer}>
                            <MaterialCommunityIcons
                                style={{}}
                                name="magnify-remove-outline"
                                color={Colors.colorTextBlack}
                                size={80}
                            />
                            <Text style={styles.addTextTwo}>
                                We couldn't find any future events
                    </Text>
                        </View>
                    ) : null)}

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

EventList.defaultProps = {
    loading: false,
    events: [],
    onAdd: () => { },
    onItemPressed: () => { }
}

export default EventList;