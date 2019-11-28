import React, { useState,  useRef, useEffect } from 'react';
import {View,Text,StyleSheet,Alert, FlatList, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const generateRandomBetween = (min,max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    
    if (rndNum === exclude) {
        return generateRandomBetween(min,max,exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText style={{color: Colors.accent}}>{itemData.item}</BodyText>
        </View>
    );  
};

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1,100,props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses,setPastGuesses] = useState([initialGuess.toString()]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
    
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    
    const { userChoice, onGameOver } = props;
    
    useEffect(()=>{
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }

    });

    useEffect(()=>{
        if(currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    },[currentGuess, userChoice, onGameOver]);
    
    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < userChoice) || 
            (direction === 'greater' && currentGuess > userChoice)) {
            Alert.alert("Don't lie", 'You know that this is wrong...', [
                {text: 'Sorry!', style: 'cancel'}
            ]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        }
        if (direction === 'greater') {
            currentLow.current = currentGuess+1;            
        }
        const nextNumber = generateRandomBetween(currentLow.current,currentHigh.current,currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [nextNumber.toString(),...curPastGuesses]);
    };
    
    if (Dimensions.get('window').height < 500) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Opponents Guess</Text>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButton>
                </View>
                <View style={styles.listContainer}>
                    {/*<ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess,index) => renderListItem(guess,pastGuesses.length - index))}
                </ScrollView>*/}
                    <FlatList
                        keyExtractor={(item) => item}
                        data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)}
                        contentContainerStyle={styles.list}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponents Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this,'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this,'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/*<ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess,index) => renderListItem(guess,pastGuesses.length - index))}
                </ScrollView>*/}
                <FlatList 
                    keyExtractor={(item) => item} 
                    data={pastGuesses} 
                    renderItem={renderListItem.bind(this, pastGuesses.length )}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 300,
        maxWidth: '95%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    listItem: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%'
    },
    listContainer: {
        marginVertical: 10,
        flex: 1,
        width: Dimensions.get('window').width > 500 ? '60%' : '80%'
    },
    list: {
        // alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1
    }
    
});

export default GameScreen; 