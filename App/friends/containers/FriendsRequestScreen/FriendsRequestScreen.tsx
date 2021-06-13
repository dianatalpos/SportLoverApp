import { Spinner } from "native-base";
import React, { useEffect, useState } from "react"
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { connect } from "react-redux";
import { AuthService } from "../../../auth";
import { Colors } from "../../../theme/colors";
import { getFriendsRequests, acceptFriendRequest, declineFriendRequest } from "../../actions"
import { FriendList } from "../../components"
import { Friend } from "../../types";


const FriendsRequestScreen = (props) => {

    const { navigation, state, getFriendsRequests, acceptFriendRequest, declineFriendRequest } = props;
    const { friendsRequests, requestsAreFetching } = state

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
            getFriendsRequests(data);
        });
    };

    navigation.addListener('focus', () => {
        loadId();
    });


    const onAccept = (friend: Friend) =>{
        acceptFriendRequest(userId, friend);
    }

    const onDecline = (friend: Friend) => {
        declineFriendRequest(userId, friend);
    }

    const isLoading = !isIdLoaded || requestsAreFetching;

    return (
        <View style={{ backgroundColor: "#fff", height: "100%" }}>
            <SafeAreaView style={{ alignItems: "center" }}>
                {requestsAreFetching ? <Spinner color={Colors.gradientPrimary} /> : <FriendList
                    loading={requestsAreFetching}
                    friends={friendsRequests}
                    shouldDisplayButton={true}
                    onAccept={onAccept}
                    onDecline={onDecline}
                ></FriendList>}
            </SafeAreaView>
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
        right: 15,
    },
})


const mapStateToProps = (state) => ({
    state: state.friends,
});

const mapDispatchToProps = {
    getFriendsRequests,
    acceptFriendRequest,
    declineFriendRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsRequestScreen);