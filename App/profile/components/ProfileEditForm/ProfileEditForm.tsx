import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { Colors } from "../../../theme/colors";
import { Datepicker } from "../../../shared";
import { Profile } from "../../types";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants"
import { launchImageLibrary, MediaType } from "react-native-image-picker";
import Toast from 'react-native-toast-message';
import { ProfileService } from "../../services";
import * as firebase from "firebase";
import { activityIcons, ActivityItem, ActivityType, activityTypes } from "../../../event";

const ProfileEditForm = ({ profile, onEdit }) => {

  const [types, setTypes] = useState([]);
  const [typesError, setTypesError] = useState('');

  const getIconByType = (type: ActivityType): string => {
    return activityIcons[type];
  };

  const onTypeSelect = (type: ActivityType): void => {
    const isInList = types.includes(type)
    if (isInList) {
      const list = types.filter(sport => sport != type)
      setTypes(list)
    } else {
      const list = [
        ...types,
        type
      ]
      setTypes(list)
    }
  };

  const activities = activityTypes.map((activity) => (
    <ActivityItem
      key={activity}
      activity={activity}
      isSelected={types.includes(activity)}
      onSelect={onTypeSelect}
      icon={getIconByType(activity)}
      isSmallIcons={true}
    />
  ));

  const [galleryPermission, setGalleryPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [imagePath, setImagePath] = useState((profile ? profile.image : null));

  const [birthDay, setBirthDay] = useState(
    profile ? (profile.birthday ? new Date(profile?.birthday) : new Date()) : new Date()
  );


  const schema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name required!")
      .label("First Name"),
    lastName: Yup.string()
      .required("Last Name is required!")
      .label("Last Name"),
    image: Yup.string().label("Image"),
  });
  const noImg =
    "https://img.wattpad.com/2eb226316e86e00511a618c2d4f352029fc20219/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f347a65566a557654543535434c673d3d2d3633342e313538306364613237313331623130653933393935343130373335332e6a7067?s=fit&w=720&h=720";

  const onAvatar = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      base64: true
    }) as ImagePicker.ImagePickerResult;
    if (!result.cancelled) {
      setImageUri(result.uri);

      console.log(profile)
      const profileService = new ProfileService();
      const response = await uploadImage(result.uri)
        .then((response) => {

          console.log("Download URL", response)
          setImagePath(response);
          return response;
        })
        .catch((error) => {
          Alert.alert("Upload image failed")
          console.log(error)
          return null;
        })
    };
  }

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const imageFileName = "profileImage" + new Date().valueOf();
    var ref = firebase.default.storage().ref().child(imageFileName)

    await ref.put(blob)
    return ref.getDownloadURL();
  }

  const handleSubmit = (values) => {
    const typesError = types.length == 0 ? "Please select at least one sport!" : '';
    setTypesError(typesError);
    const isValid = !typesError;

    if (!isValid) {
      return;
    }

    const profile = new Profile();
    profile.firstName = values.firstName;
    profile.lastName = values.lastName;
    profile.birthday = moment(birthDay).format("YYYY-MM-DD");
    profile.shortDescription = values.shortDescription;
    profile.image = imagePath;
    profile.activities = types;
    onEdit(profile);
  };

  const imgUri = imageUri || (profile ? profile.image : null);

  return (
    <SafeAreaView style={styles.view} >
      <ScrollView contentContainerStyle={styles.view} >
        <TouchableOpacity onPress={onAvatar}>
          <Image source={{ uri: imgUri }} style={styles.avatar}></Image>
        </TouchableOpacity>
        <View style={styles.grid}>{activities}
          {typesError ? (
            <Text style={styles.error}>
              {typesError}
            </Text>
          ) : null}
        </View>
        <Formik
          initialValues={{
            firstName: profile?.firstName || "",
            lastName: profile?.lastName || "",
            activities: profile?.activities || [],
            image: profile?.image || noImg,
            shortDescription: profile?.shortDescription || "",
          }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={schema}
        >
          {({ handleChange, handleSubmit, values, touched, errors }) => (
            <ScrollView style={styles.form}>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                />
                {errors.firstName && touched.firstName ? (
                  <Text style={styles.error}>{errors.firstName}</Text>
                ) : null}
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  value={values.lastName}
                  onChangeText={handleChange("lastName")}
                />
                {errors.lastName && touched.lastName ? (
                  <Text style={styles.error}>{errors.lastName}</Text>
                ) : null}
              </View>

              <View>
                <TextInput
                  style={styles.description}
                  multiline={true}
                  numberOfLines={5}
                  placeholder="Description"
                  value={values.shortDescription}
                  onChangeText={handleChange("shortDescription")}
                />
                {errors.shortDescription && touched.shortDescription ? (
                  <Text style={styles.error}>{errors.shortDescription}</Text>
                ) : null}
              </View>

              <View>
                <Datepicker
                  value={birthDay}
                  onChange={setBirthDay}
                  placeholder={"Select birth day"}
                />
              </View>

              <TouchableHighlight style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonLabel}>Update</Text>
              </TouchableHighlight>
            </ScrollView>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 30,
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    margin: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  error: {
    color: Colors.error,
    marginLeft: 20,
  },
  input: {
    width: 250,
    height: 40,
    marginVertical: 15,
    padding: 5,
    textAlign: "center",
    borderColor: Colors.gradientPrimary,
    borderWidth: 1,
    borderRadius: 50,
  },
  description: {
    width: 250,
    margin: 5,
    padding: 10,
    borderColor: Colors.gradientPrimary,
    borderWidth: 1,
    borderRadius: 20,
  },
  button: {
    fontWeight: "bold",
    backgroundColor: Colors.colorTextBlack,
    color: "#fff",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 30,
    justifyContent: "center",
    marginVertical: 30,
    marginHorizontal: 50,
  },
  buttonLabel: {
    color: "#fff",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#000",
  },
});

ProfileEditForm.defaultProps = {
  profile: null,
  onEdit: () => { },
};
export default ProfileEditForm;
