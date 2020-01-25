import * as FileSystem from 'expo-file-system';

import { insertPlace } from '../helpers/db';


export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title,image) => {
    return async dispatch => {
        const filename = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + filename;
        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(title, newPath, 'Dummy address',15.6,12.3);
            console.log(dbResult);
        } catch(err) {
            console.log(err);
            throw err;
        }
        
        dispatch ({
            type: ADD_PLACE,
            placeData: {
                id: dbResult.insertId,
                title,
                image: newPath
            }
        });
    }
};