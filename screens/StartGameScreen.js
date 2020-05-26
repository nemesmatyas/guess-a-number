import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputStr => {
        // Validate input before setting the state (filter out everything that is not a number)
        setEnteredValue(inputStr.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue, 10);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 9999) {
            Alert.alert('Invalid number', 'Number has to be between 0 and 9999', [{text: 'Got it', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = <Card style={styles.summaryContainer}>
                            <Text>You selected:</Text>
                            <NumberContainer>{selectedNumber}</NumberContainer>
                            <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)} />
                          </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a new game!</Text>
            <Card style={styles.inputContainer}>
                <Text style={styles.text}>Select a number</Text>
                <Input
                    style={styles.input} 
                    blurOnSubmit autoCapitalize="none" 
                    autoCorrect={false}
                    keyboardType="number-pad"
                    maxLength={4}
                    onChangeText={numberInputHandler} 
                    value={enteredValue}
                    />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}><Button title="Reset" onPress={resetInputHandler} /></View>
                    <View style={styles.button}><Button title="Confirm" onPress={confirmInputHandler} color="#f7278c" /></View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    summaryContainer: {
        marginTop: 30
    },
    text: {
        fontFamily: 'open-sans'
    }
});

export default StartGameScreen;