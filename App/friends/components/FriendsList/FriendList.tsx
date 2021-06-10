import { Spinner } from "native-base";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../theme/colors";
import FriendItem from "../FriendItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";



const FriendList = (props) => {

    const { loading, friends } = props


    const renderListItem = (flatListProp) => {
        const { item } = flatListProp;
        return <FriendItem friend={item}/>;
    };

    return <SafeAreaView>
        {
            loading ?
                <Spinner color={Colors.gradientPrimary} />
                : (friends && friends.length !== 0 ? <FlatList
                    data={friends}
                    renderItem={renderListItem}
                    keyExtractor={location => location.id}
                    style={styles.listStyle}
                /> : friends && friends.length === 0 ? (
                    <View style={styles.addContainer}>
                        <MaterialCommunityIcons
                            style={{}}
                            name="magnify-remove-outline"
                            color={Colors.colorTextBlack}
                            size={80}
                        />
                        <Text style={styles.addTextTwo}>
                            You do not have any friends yet.</Text></View>)
                    : null)
        }
    </SafeAreaView>
}


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
});

export default FriendList;