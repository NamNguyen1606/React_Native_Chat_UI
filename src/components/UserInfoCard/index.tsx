import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {hs, ms, vs} from '../../utils/scaling';

interface Props {
  img: string;
  name: string;
  email: string;
  isOnline: boolean;
  onPress?: () => void;
}

const UserInfoCard: React.FC<Props> = (props) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={style.container}>
        <View style={style.avatarContainer}>
          <Image
            style={style.img}
            source={{
              uri: props.img,
            }}
          />
          <View
            style={[
              style.activePoint,
              props.isOnline
                ? {backgroundColor: '#4ADC61'}
                : {backgroundColor: '#D0D0D0'},
            ]}
          />
        </View>
        <View style={{...style.contentHolder, borderColor: colors.border}}>
          <View style={style.messageHolder}>
            <Text style={style.txtUsername}>{props.name}</Text>
            <Text style={{...style.txtMessage, color: colors.text}}>
              {props.email}
            </Text>
          </View>
          <View style={style.lastTimeActive}></View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    height: hs(60),
    flexDirection: 'row',
  },
  avatarContainer: {
    width: hs(60),
    height: hs(60),
  },
  img: {
    flex: 1,
    margin: vs(8),
    borderRadius: vs(40),
  },
  activePoint: {
    top: ms(40),
    left: ms(40),
    height: vs(12),
    width: vs(12),
    backgroundColor: '#04B31A',
    borderRadius: vs(10),
    position: 'absolute',
    borderColor: 'white',
    borderWidth: ms(1.2),
  },
  contentHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
  },
  messageHolder: {
    height: '100%',
    width: hs(230),
    justifyContent: 'center',
    paddingLeft: hs(8),
  },
  lastTimeActive: {
    height: '100%',
    width: '100%',
  },
  txtUsername: {
    fontSize: ms(14),
    color: 'blue',
    marginBottom: vs(5),
  },
  txtMessage: {
    fontSize: ms(12),
  },
  txtLastTimeActive: {
    marginTop: vs(18),
    fontSize: ms(12),
    alignItems: 'flex-end',
  },
  btnDone: {
    backgroundColor: '#2DCFEF',
    borderRadius: hs(10),
    padding: hs(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserInfoCard;