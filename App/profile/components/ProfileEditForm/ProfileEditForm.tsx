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

const ProfileEditForm = ({ profile, onEdit }) => {

  // const [file, setFile] = useState({
  //   filePath: {
  //     data: null,
  //     uri: null,
  //   },
  //   fileData: null,
  //   fileUri: null,
  // });

  const [galleryPermission, setGalleryPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [imagePath, setImagePath] = useState('');

  const [birthDay, setBirthDay] = useState(
    profile ? (profile.birthday ? new Date(profile?.birthday) : new Date()) : new Date()
  );


  useEffect(() => {
    permissionFunction().then();
  }, []);


  const permissionFunction = async () => {
    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();

    setGalleryPermission(imagePermission.status === 'granted');

    if (imagePermission.status !== 'granted') {
      Toast.show({ type: 'error', text1: 'Permission for media access needed.' });
    }
  };

  const schema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name required!")
      .label("First Name"),
    lastName: Yup.string()
      .required("Last Name is required!")
      .label("Last Name"),
    image: Yup.string().label("Image"),
    activities: Yup.array().label("Activities"),
  });
  const noImg =
    "https://img.wattpad.com/2eb226316e86e00511a618c2d4f352029fc20219/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f347a65566a557654543535434c673d3d2d3633342e313538306364613237313331623130653933393935343130373335332e6a7067?s=fit&w=720&h=720";

  const onAvatar = async () => {
    // launchImageLibrary(null, (response: any) => {
    //   console.log(response, "IMAGE RESPONSE");
    //   if (response.uri) {
    //     setFile({ ...file, fileUri: response.uri });
    //   }
    // });
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      base64: true
    }) as ImagePicker.ImagePickerResult;
    if (!result.cancelled) {
      setImageUri(result.uri);

      console.log(profile)
      const profileService = new ProfileService();

      // const response = await profileService.uploadImage(profile.id, result.uri)
      //       .then((response) => response)
      //       .catch((error) =>{ 
      //         console.log(error)
      //       });
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
    const profile = new Profile();
    profile.firstName = values.firstName;
    profile.lastName = values.lastName;
    profile.birthday = moment(birthDay).format("YYYY-MM-DD");
    profile.shortDescription = values.shortDescription;
    profile.image = imagePath;
    profile.activities = values.activities;
    onEdit(profile);
  };

  const imgUri = imageUri || (profile ? profile.image : null);

  return (
    <SafeAreaView style={styles.view}>
      <TouchableOpacity onPress={onAvatar}>
        <Image source={{ uri: imgUri }} style={styles.avatar}></Image>
      </TouchableOpacity>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    margin: 30,
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
