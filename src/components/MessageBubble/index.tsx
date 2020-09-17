import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {hs, vs, ms} from '../../utils/scaling';
import {Colors} from '../../utils/colors';

interface Props {
  name: string;
  timestamp: string;
  message: string;
  img: string;
  isUser: boolean;
}

const ChatBubble: React.FC<Props> = (props) => {
  const getStyleByIsUser: any = () => {
    return props.isUser
      ? {justifyContent: 'flex-end'}
      : {justifyContent: 'flex-start'};
  };
  const getStyleBubbleColor = () => {
    return props.isUser
      ? {backgroundColor: '#DCF4FE'}
      : {backgroundColor: '#F2F6F9'};
  };
  return (
    <View style={[style.container, getStyleByIsUser()]}>
      {props.isUser || (
        <Image
          style={style.img}
          source={{
            uri: props.img,
          }}
        />
      )}
      <View style={[style.contentHolder, getStyleByIsUser()]}>
        <View style={[style.userInfoHolder, getStyleByIsUser()]}>
          {props.isUser || <Text style={style.txtName}>{props.name}, </Text>}
          <Text style={style.txtName}>{props.timestamp}</Text>
        </View>
        <View style={[style.messageHolder, getStyleBubbleColor()]}>
          <Text style={style.txtMessage}>{props.message}</Text>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: hs(5),
  },
  img: {
    height: hs(40),
    width: hs(40),
    borderRadius: hs(20),
  },
  contentHolder: {marginLeft: hs(8)},
  userInfoHolder: {
    flexDirection: 'row',
  },
  messageHolder: {
    maxWidth: hs(240),
    borderRadius: hs(10),
    paddingVertical: vs(5),
    paddingHorizontal: hs(10),
    marginTop: vs(3),
  },
  txtName: {
    fontSize: ms(11),
    color: Colors.subText,
  },
  txtMessage: {
    fontSize: ms(14),
  },
});
export default ChatBubble;
