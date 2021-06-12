import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { AuthService } from "../../../auth";
import { getProfile, editProfile } from "../../actions";
import { ProfileEditForm } from "../../components";
import { Profile } from "../../types";

const EditProfileScreen = ({ navigation, state, getProfile, editProfile }) => {
  const { profile } = state;

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    loadId();
  }, []);

  const loadId = async () => {
    const authService = new AuthService();
    authService.getId().then((data) => setUserId(data));
  };

  useEffect(() => {
    if (userId) {
      getProfile(userId);
    }
  }, [userId]);

  const onEdit = (profile: Profile) => {
    editProfile(userId, profile);
    navigation.navigate("Profile");
  };

  return (
    <SafeAreaView style={{ alignItems: "center", backgroundColor: "#fff" }}>
      <ProfileEditForm profile={profile} onEdit={onEdit}></ProfileEditForm>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state.profile,
});

const mapDispatchToProps = {
  getProfile,
  editProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
