
import React, { useState } from 'react';
import Joi  from "react-native-joi";

// import all the components we are going to use
import {
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';
import {
    Dropdown
} from 'react-native-material-dropdown-v2';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
} from 'react-native-popup-dialog';
import { Colors } from '../../../theme/colors';
import { Field } from '../../types';

const FieldDialog = (props) => {

    const { sports, show, onAdd, onDismiss } = props

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [sport, setSport] = useState('');
    const [sportError, setSportError] = useState('');


    const generalValidation = (input, schema) => {
        const results = schema.validate(input);
        let error = null;
        if (results.error) {
            error = results.error.details[0].message;
        }

        return error;
    }

    const onSelect = (value) => {
        setSport(value);
    }

    const schema = Joi.object({
        name: Joi.string()
            .min(1)
            .label("Name"),
        sport: Joi.string()
            .min(1)
            .label("Sport"),
    });

    const onAddPressed = () => {

        const nameError = generalValidation({ name }, schema);
        setNameError(nameError);

        const sportError = generalValidation({ sport }, schema);
        setSportError(sportError);

        const isValid = !nameError && !sportError
        if(!isValid)
            return;
        
        const field = new Field();
        field.name = name;
        field.sport = sport;

        onAdd(field);
    }

    return (
    <Dialog
        onDismiss={onDismiss}
        width={0.9}
        visible={show}
        rounded
        actionsBordered
        dialogTitle={
            <DialogTitle
                title="Add a new Field"
                style={{
                    backgroundColor: '#F7F7F8',
                }}
                hasTitleBar={false}
                align="left"
            />
        }
        footer={
            <DialogFooter>
                <DialogButton
                    text="Cancel"
                    bordered
                    onPress={onDismiss}
                    key="button-1"
                />
                <DialogButton
                    text="Add"
                    bordered
                    onPress={onAddPressed}
                    key="button-2"
                />
            </DialogFooter>
        }>
        <DialogContent
            style={{
                backgroundColor: '#F7F7F8',
            }}>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                {nameError ? (
                    <Text style={styles.error}>
                        {nameError}
                    </Text>
                ) : null}
            </View>
            <View>
                <Dropdown
                    label="Sport"
                    data={sports}
                    onChangeText={onSelect}
                ></Dropdown>
                    {sportError ? (
                        <Text style={styles.error}>
                            {sportError}
                        </Text>
                    ) : null}
            </View>
        </DialogContent>
    </Dialog>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#307ecc',
        padding: 16,
    },
    buttonStyle: {
        minWidth: '100%',
        padding: 10,
        backgroundColor: Colors.colorGrey,
        margin: 15,
    },
    buttonTextStyle: {
        color: Colors.colorWhite,
        textAlign: 'center',
    },
    titleStyle: {
        color: Colors.colorWhite,
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
    },
    input: {
        width: 300,
        height: 40,
        marginVertical: 15,
        padding: 5,
        textAlign: "center",
        borderColor: Colors.gradientPrimary,
        borderWidth: 1,
        borderRadius: 50,
    },
    error: {
        color: Colors.error,
        marginLeft: 20,
    },
});

export default FieldDialog;