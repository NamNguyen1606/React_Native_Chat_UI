import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {hs} from '../../utils/scaling';
import {useTheme} from '@react-navigation/native';

interface Props {}

const UserCircleAvatar = () => {
  const {colors} = useTheme();
  return (
    <View style={style.container}>
      <Image
        style={style.container}
        source={{
          uri:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSu_CkYd2E5LFALTLFSok-gMV5Tw9hxUQSyxg&usqp=CAU',
        }}
      />
      <View style={style.closeCircle}>
        <Icon
          name="close"
          type="material-community"
          size={hs(10)}
          color={'white'}
        />
      </View>
      <Text style={{...style.txtName, color: colors.text}}>Nam</Text>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    height: hs(60),
    width: hs(60),
    borderRadius: hs(30),
  },
  closeCircle: {
    left: hs(45),
    height: hs(15),
    width: hs(15),
    borderRadius: hs(8),
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: '#2DCFEF',
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtName: {textAlign: 'center'},
});
export default UserCircleAvatar;
