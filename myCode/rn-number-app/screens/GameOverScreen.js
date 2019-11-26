import React from 'react';
import {View, Text, StyleSheet, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over</TitleText>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../assets/success.png')}
                    // source={{uri: 'https://www.geeky-gadgets.com/wp-content/uploads/2010/10/Everest-Summit.jpg'}}
                    style={styles.image} 
                    resizeMode="cover"
                    fadeDuration={500}
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={{ textAlign: 'center'}}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess number <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
            </View>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        width: '80%',
        marginBottom: 30
    }
});

export default GameOverScreen;