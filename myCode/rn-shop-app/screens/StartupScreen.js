import React, { useEffect } from 'react';
import { 
    View,
    ActivityIndicator,
    StyleSheet,
    AsyncStorage 
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import Colors from '../constants/Colors';

const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const trylogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if(!userData) {
                props.navigation.navigate('Auth');
                return;
            }
            const { token, userId, expiryDate } = JSON.parse(userData);
            const expirationDate = new Date(expiryDate);
            if(expirationDate <= new Date() || (!token) || (!userId)) {
                props.navigation.navigate('Auth');
                return;
            }
            
            const expirationTime = expirationDate.getTime() - new Date().getTime();
            props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(userId,token,expirationTime));

        } 
        trylogin();
    },[dispatch]);

    return (
        <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;