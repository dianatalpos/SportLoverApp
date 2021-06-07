import { Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { AuthService } from "../../../auth";
import { Colors } from "../../../theme/colors";
import { editProfile } from "../../actions";
import { ProfileEditForm } from "../../components";
import { Profile } from "../../types";

const CompleteProfileScreen = ({ navigation, state, editProfile }) => {
    const { profile } = state;


    const [userId, setUserId] = useState(null);
    const [isIdLoaded, setIsIdLoaded] = useState(false);


    useEffect(() => {
        loadId();
    }, []);

    const loadId = async () => {
        const authService = new AuthService();
        authService.getId().then((data) => {
            setUserId(data);
            setIsIdLoaded(true);
        });
    };


    const onEdit = (profile: Profile) => {
        console.log("Edit pressed")
        console.log(profile)

        editProfile(userId, profile);

        console.log("Right after edit")
        navigation.navigate("Main");
    };

    return (

        <SafeAreaView style={{ alignItems: "center", backgroundColor: "#fff" }}>
            {isIdLoaded ? (
            <ProfileEditForm
                onEdit={onEdit}
            ></ProfileEditForm>)
                : <Spinner color={Colors.gradientPrimary} />}
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    state: state.profile,
});

const mapDispatchToProps = {
    editProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(CompleteProfileScreen);
