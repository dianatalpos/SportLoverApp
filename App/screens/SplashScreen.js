import React, { useEffect } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import bkgImage from '../assets/images/sport_lover_image.png';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from "../theme/colors";

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setTimeout(() => {
                navigation.navigate('Login');
            }, 2000);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <ImageBackground source={bkgImage} style={styles.bkgImage}>
            <View style={styles.view}>
                <LinearGradient colors={['#a7f5a7', '#DDFF7c']} style={styles.gradient}>
                </LinearGradient>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bkgImage: {
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        paddingTop: 250,
    },
    text: {
        color: Colors.colorWhite,
        fontSize: 60,
        fontWeight: '700',
        textAlign: 'center',

    },
    view: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    }
});

export default SplashScreen;