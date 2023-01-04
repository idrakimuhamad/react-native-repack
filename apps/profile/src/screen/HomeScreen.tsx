import {View, Text, ScrollView, Pressable} from 'react-native';
import React from 'react';

export default function HomeScreen({navigation}) {
  return (
    <View
      style={{
        paddingHorizontal: 24,
      }}>
      <ScrollView>
        <View
          style={{
            paddingVertical: 24,
          }}>
          <Text>Screen from profile micro app</Text>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 24,
            }}>
            <Pressable onPress={() => navigation.navigate('Host')}>
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor: '#3b82f6',
                  borderRadius: 4,
                }}>
                <Text style={{color: 'white'}}>Go to host screen</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
