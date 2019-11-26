import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/colors';

const NumberContainer = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        // borderColor: Colors.accent,
        padding: 10,
        // borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number: {
        color: Colors.accent,
        fontSize: 22,
        fontFamily: 'open-sans-bold'
    }
});

export default NumberContainer;