import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {hs, ms, vs} from '../../utils/scaling';

interface Props {
  img: string;
  name: string;
  lastMsg: string;
  lastTimeActive: string;
  isOnline: boolean;
  onPress?: () => void;
}

const UserCard: React.FC<Props> = (props) => {
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
        <View style={style.contentHolder}>
          <View style={style.messageHolder}>
            <Text style={style.txtUsername}>{props.name}</Text>
            <Text style={style.txtMessage}>{props.lastMsg}</Text>
          </View>
          <View style={style.lastTimeActive}>
            <Text style={style.txtLastTimeActive}>{props.lastTimeActive}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    height: vs(80),
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  avatarContainer: {
    width: hs(75),
    height: hs(75),
    backgroundColor: 'white',
  },
  img: {
    flex: 1,
    margin: vs(8),
    borderRadius: vs(40),
  },
  activePoint: {
    top: vs(58),
    left: hs(52),
    height: vs(14),
    width: vs(14),
    backgroundColor: '#04B31A',
    borderRadius: vs(10),
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 1,
  },
  contentHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#C7C7C7',
  },
  messageHolder: {
    height: '100%',
    width: hs(230),
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingLeft: hs(8),
  },
  lastTimeActive: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  txtUsername: {
    fontSize: ms(18),
    marginBottom: vs(5),
  },
  txtMessage: {
    fontSize: ms(14),
  },
  txtLastTimeActive: {
    marginTop: vs(18),
    fontSize: ms(12),
    color: '#848484',
    alignItems: 'flex-end',
  },
});

export default UserCard;
