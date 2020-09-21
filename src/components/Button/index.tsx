import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {ms, vs} from '../../utils/scaling';

interface Props {
  tittle: string;
  isLoading: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[style.btn, props.style]}>
        {props.isLoading ? (
          <ActivityIndicator color="white" size={ms(30)} />
        ) : (
          <Text style={style.txtBtnTittle}>{props.tittle}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtBtnTittle: {
    color: 'white',
    fontSize: ms(16),
    fontWeight: '700',
  },
  btn: {
    backgroundColor: 'black',
    height: vs(50),
    width: ms(300),
    borderRadius: ms(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Button;
