import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {hs, ms} from '../../utils/scaling';
import {useTheme} from '@react-navigation/native';

interface Props {
  img: string;
  name: string;
  onDelete?: () => void;
}

const UserCircleAvatar: React.FC<Props> = (props) => {
  const {colors} = useTheme();
  return (
    <View style={style.container}>
      <View style={style.imageHolder}>
        <Image
          style={style.image}
          source={{
            uri: props.img,
          }}
        />
        <TouchableOpacity
          style={style.closeCircle}
          activeOpacity={0.6}
          onPress={props.onDelete}>
          <View>
            <Icon
              name="close"
              type="material-community"
              size={hs(10)}
              color={'white'}
            />
          </View>
        </TouchableOpacity>
        <Text style={{...style.txtName, color: colors.text}} numberOfLines={2}>
          {props.name}
        </Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    height: hs(80),
    width: hs(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHolder: {
    height: hs(60),
    width: hs(60),
    borderRadius: hs(30),
  },
  image: {
    height: hs(60),
    width: hs(60),
    borderRadius: hs(30),
    borderColor: 'grey',
    borderWidth: 0.4,
  },
  closeCircle: {
    left: hs(45),
    top: hs(0),
    height: hs(18),
    width: hs(18),
    borderRadius: hs(9),
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: '#2DCFEF',
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtName: {fontSize: ms(12), textAlign: 'center'},
});
export default UserCircleAvatar;
