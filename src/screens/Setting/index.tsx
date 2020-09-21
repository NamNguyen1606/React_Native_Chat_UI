import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface Props {}

const SettingScreen = () => {
  return (
    <View style={style.container}>
      <Text>SETTING</Text>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default SettingScreen;
