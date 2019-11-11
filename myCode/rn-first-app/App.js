import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [outputText, setOutputText] = useState('Hello! I am in HELPE Control Room');
  return (
    <View style={styles.container}>
      <Text>{outputText}</Text>
      <Button title="Click Me" onPress={() => setOutputText('Now I am Home!')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
