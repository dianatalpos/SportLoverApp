import bkgImage from '../../assets/images/sport_lover_image.png'
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { Colors } from "../../../theme/colors";
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import Joi from 'react-native-joi';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('n@gmail.com');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('nicoleta');
    const [passwordError, setPasswordError] = useState('');
    const [validationError, setValidationError] = useState('');

    const dispatch = useDispatch();

    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).label('Email'),
        password: Joi.string().min(8).label('Password'),
    });

    const generalValidation = (input, schema) => {
        const results = schema.validate(input);
        let error = null;

        if (results.error) {
            error = results.error.details[0].message;
        }

        return error;
    };

    const onSubmit = async () => {
        // const emailError = generalValidation({ email }, schema);
        // setEmailError(emailError);

        // const passwordError = generalValidation({ password }, schema);
        // setPasswordError(passwordError);

        // const isValid = !emailError && !passwordError

        // if (!isValid) {
        //     return;
        // }
        // setValidationError('');
        // try {
        //     const user = {
        //         email: email,
        //         password: password
        //     };
        //     const loggedInUser = await login(user);
        //     dispatch(loginAction(loggedInUser))
        //     navigation.navigate('Main')
        // } catch (e) {
        //     setValidationError(e);
        // }
    }

    const goToRegisterScreen = () => {
        // navigation.navigate('Register');
    }

    return (
        <ImageBackground source={bkgImage} style={styles.bkgImage}>
            <View style={styles.container}>
                <Text style={styles.text}>Login</Text>
                {/* <Input
                    label={'Email'}
                    placeholder='Email Or Phone'
                    value={email}
                    onChange={setEmail}
                    error={emailError}
                    email
                />
                <Input
                    label={'Password'}
                    placeholder='Password'
                    value={password}
                    onChange={setPassword}
                    error={passwordError}
                    hidePass
                /> */}

                {/* <View>
                    <ErrorText>{validationError}</ErrorText>
                </View> */}

                {/* <PrimaryButton onButtonPress={onSubmit} title='Login' /> */}
                <Text style={styles.toRegister}>
                    Don't have an account? <Text style={styles.button} onPress={goToRegisterScreen}>Sign up</Text>
                </Text>
                {/* <StatusBar style="auto" /> */}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        width: '100%',
        paddingTop: 250
    },
    bkgImage: {
        width: '100%',
        height: '100%',
    },
    text: {
        color: Colors.colorPrimary,
        fontSize: 40,
        fontWeight: '700',
        textAlign: 'center',
        top: -60,
        left: 0,
        bottom: 0,
    },
    input: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
    },
    forgetPassword: {
        color: Colors.colorPrimary,
        textAlign: 'left',
        alignSelf: 'stretch',
        paddingLeft: 45,
        fontFamily: "Georgia",
        marginTop: 10
    },
    background: {
        width: '100%',
        height: '100%',
    },
    toRegister: {
        marginTop: 40,
        color: Colors.colorText,
        fontSize: 17
    },
    button: {
        fontWeight: 'bold'
    }
});

export default Login;