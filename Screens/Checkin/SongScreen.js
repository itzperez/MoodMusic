import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';


export default function SongScreen({route}) {
    console.log('route ->', route.params);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Song screen!</Text>
      <Text>Emotion: {route.params.feeling}</Text>
    </View>
  );
}
