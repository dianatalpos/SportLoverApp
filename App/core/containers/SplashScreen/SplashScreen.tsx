import React, { useEffect } from "react";
import {
    ImageBackground,
    StyleSheet,
    View,
} from "react-native";
import bkgImage from "../../../assets/images/sport_lover_image.png";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../../theme/colors";
import { StorageKeys } from "../../types";
import { StorageService } from "../../services";

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setTimeout(() => {
                const storage = new StorageService();
                const token = storage.getItem(StorageKeys.TOKEN);

                if (token) {
                    navigation.navigate("Profile");
                } else {
                    navigation.navigate("Login");
                }
            }, 2000);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <LinearGradient
            colors={[Colors.gradientPrimary, Colors.gradientSecondary]}
        >
            <View style={styles.view}>
                <ImageBackground
                    source={bkgImage}
                    style={styles.bkgImage}
                ></ImageBackground>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    bkgImage: {
        width: 400,
        height: 250,
    },
    view: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default SplashScreen;
