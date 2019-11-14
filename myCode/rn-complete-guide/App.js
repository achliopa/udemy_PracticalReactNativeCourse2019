import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';


export default function App() {

  const [courseGoals, setCourseGoals] = useState([]);
  
  const onGoalHandler = (goalTitle) => {
    setCourseGoals(currentGoals => [
      ...currentGoals,
      {
        id: Math.random().toString(),
        value: goalTitle
      }
    ]);
  }
  
  const removeGoalhandler = goalId => {
    setCourseGoals(currentGoals => {
        return currentGoals.filter((goal) => goal.id !== goalId);
    });
  }

  return (
    <View style={styles.screen}>
      <GoalInput onAddGoal={onGoalHandler} />
      <FlatList
        keyExtractor={(item, index) => item.id} 
        data={courseGoals} 
        renderItem={itemData => 
          <GoalItem
            id={itemData.item.id}
            onDelete={removeGoalhandler} 
            title={itemData.item.value} 
          />
        } 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});