import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/colors';

const Header = props => {
    return (
        <View style={{...styles.headerBase, ...Platform.select({ios: styles.headerIos, android: styles.headerAndroid})}}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerAndroid: {
        backgroundColor: Colors.primary,
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,  
    },
    headerIos: {
        backgroundColor: "white",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    headerTitle: {
        color: Platform.OS === "ios" ? Colors.primary : 'white',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
});

export default Header;