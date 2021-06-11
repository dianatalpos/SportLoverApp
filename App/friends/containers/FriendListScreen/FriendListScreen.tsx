import { Spinner } from "native-base";
import React, { useEffect, useState } from "react"
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { connect } from "react-redux";
import { AuthService } from "../../../auth";
import { Colors } from "../../../theme/colors";
import {getFriends} from "../../actions"
import { FriendList } from "../../components"
import { MaterialCommunityIcons } from "@expo/vector-icons";


const FriendListScreen = (props) => {

    const {navigation, state, getFriends} = props;
    const {friends, areFetching} = state

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
            getFriends(userId);
        }
    }, [userId, isIdLoaded]);

    const onAdd = () =>{
        navigation.navigate("AddFriend")
    }

    const isLoading = !isIdLoaded || areFetching;

    return (
        <View style={{ backgroundColor: "#fff", height: "100%" }}>
            <SafeAreaView style={{ alignItems: "center" }}>
                {isLoading ? <Spinner color={Colors.gradientPrimary} /> : <FriendList
                    loading={areFetching}
                    friends={friends}
                    shouldDisplayButton={false}
                ></FriendList>}
            </SafeAreaView>

            <TouchableOpacity
                style={styles.actionBtn}
                onPress={onAdd}
            >
                <MaterialCommunityIcons name="plus" color={Colors.colorGrey} size={26} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    actionBtn: {
        width: 50,
        height: 50,
        backgroundColor: Colors.gradientPrimary,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        bottom: 15,
        right:15,
    },
})


const mapStateToProps = (state) => ({
    state: state.friends,
});

const mapDispatchToProps = {
    getFriends
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendListScreen);