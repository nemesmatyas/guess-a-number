import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The game is over!</Text>
            <Image source={require('../assets/success.png')} style={styles.image} resizeMode="cover" />
            <Text>Number of rounds: {props.numOfRounds}</Text>
            <Text>Number was: {props.userNum}</Text>
            <Button title="NEW GAME" onPress={props.onRestart} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '80%',
        height: 300,
        marginVertical: 20
    }
});

export default GameOverScreen;
