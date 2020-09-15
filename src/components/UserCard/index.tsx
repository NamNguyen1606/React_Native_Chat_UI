import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {hs, ms, vs} from '../../utils/scaling';

interface Props {
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
              uri:
                'https://i.pinimg.com/originals/31/a0/d5/31a0d596f1e215b5825333f419645dcb.jpg',
            }}
          />
          <View style={style.activePoint} />
        </View>
        <View style={style.messageHolder}>
          <Text style={style.txtUsername}>Dianna Smiley</Text>
          <Text style={style.txtMessage}>Hey! What's up</Text>
        </View>
        <View style={style.lastTimeActive}>
          <Text style={style.txtLastTimeActive}>3m ago</Text>
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
    width: hs(80),
    height: '100%',
    backgroundColor: 'white',
  },
  img: {
    flex: 1,
    margin: vs(8),
    borderRadius: vs(40),
  },
  activePoint: {
    top: vs(55),
    left: hs(55),
    height: vs(15),
    width: vs(15),
    backgroundColor: '#04B31A',
    borderRadius: vs(10),
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 1,
  },
  messageHolder: {
    height: '100%',
    width: hs(210),
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
    fontWeight: 'bold',
    marginBottom: vs(5),
  },
  txtMessage: {
    fontSize: ms(14),
  },
  txtLastTimeActive: {
    marginTop: vs(18),
    fontSize: ms(14),
  },
});

export default UserCard;
