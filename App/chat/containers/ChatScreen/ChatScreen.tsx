import { Spinner } from "native-base";
import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from "react-redux";
import { Colors } from "../../../theme/colors";
import * as firebase from "firebase";

const defaultImage = "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpghttps://img.wattpad.com/2eb226316e86e00511a618c2d4f352029fc20219/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f347a65566a557654543535434c673d3d2d3633342e313538306364613237313331623130653933393935343130373335332e6a7067?s=fit&w=720&h=720";

const ChatScreen = (props) => {
    const { state } = props
    const { profileRed, eventsRed } = state
    const { profile, isFetching } = profileRed;
    const { event, areFetching } = eventsRed;
    const [chatRef, setChatRef] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const isLoading = isFetching || areFetching;

    useEffect(() => {
        if (!(isFetching || areFetching)) {
            const u = {
                _id: profile.id,
                name: profile.firstName + " " + profile.lastName,
                avatar: profile.image || defaultImage
            }
            setUser(u);
            const chat = firebase.default.firestore().collection("/events/" + event.id + "/messages")
            setChatRef(chat);
            setLoaded(true)
        }
    }, [isFetching, areFetching]);

    useEffect(() => {
        if (loaded) {
            const unsubscribe = chatRef.onSnapshot(querySnapshot => {
                const messagedFirestore = querySnapshot.docChanges()
                    .filter(({ type }) => type === 'added')
                    .map(({ doc }) => {
                        const message = doc.data();
                        return  {
                            ...message, createdAt: message.createdAt.toDate()
                        }
                    })
                    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                appendMessage(messagedFirestore)
            })
            return () => unsubscribe()
        }
    }, [loaded])

    const appendMessage = useCallback((messages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [messages])

    const handleSend = async (messages) => {
        const writes = messages.map(mess => chatRef.add({...mess}))

        await Promise.all(writes);
    }

    const spinner = <Spinner color={Colors.gradientPrimary} />

    const chat = <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{ ...user }}
        showUserAvatar={true}
    />

    return isLoading ? spinner : chat;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})


const mapStateToProps = (state) => ({
    state: {
        profileRed: state.profile,
        eventsRed: state.events,
    }
});

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
