import React, { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    Button, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 3);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false)
    };

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 3)
        }

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change',updateLayout);
        };
    });

    const confirmInputhadler = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber)|| chosenNumber <= 0 || chosenNumber > 99 ) {
            Alert.alert(
                'Invalid number',
                'Number has to be a value between 1 and 99',
                [{text: 'Okay',style: 'destructive', onPress: resetInputHandler}]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if(confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)} >START GAME</MainButton>
            </Card>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}> 
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.screen}>
                        <BodyText style={styles.title}>Start a New Game!</BodyText>
                        <Card style={styles.inputContaner}>
                            <BodyText>Select a number</BodyText>
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType="number-pad"
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{ width: buttonWidth}}>
                                    <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
                                </View>
                                <View style={{width: buttonWidth}}>
                                    <Button title="Confirm" onPress={confirmInputhadler} color={Colors.primary} />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContaner: {
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        alignItems: 'center',
    },
    button: {
        width: Dimensions.get('window').width / 3
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;