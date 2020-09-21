import React, {useContext} from 'react';
import {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import {GlobalContext, StoreProviderInterface} from '../../utils/storeProvider';
import {vs, hs} from '../../utils/scaling';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import ChatBubble from '../../components/MessageBubble/index';
import {style} from './style';
import MessageApi from '../../api/message.api';
import {FlatList} from 'react-native-gesture-handler';
import SocketName from '../../utils/socketNamespace';
interface Props {}

const CloneData: [] = [
  {id: 1, message: 'Hello', isUser: true},
  {id: 2, message: 'Hello', isUser: false},
  {id: 3, message: 'Hello', isUser: true},
];

const ChatRoomScreen = () => {
  const {socket} = useContext<StoreProviderInterface>(GlobalContext);
  const [messages, setMessages] = useState<any>(CloneData);
  const navigator = useNavigation();
  const isActive = true;
  const {colors} = useTheme();
  // FUNCTION
  const [message, setMessage] = useState<string>('');

  const handleMessage = (value: string) => setMessage(value);

  const getIconContainer = () => {
    if (message) {
      return (
        <TouchableOpacity onPress={onSentMessage}>
          <View style={style.circle}>
            <Icon
              style={style.sentIcon}
              name="send-outline"
              type="material-community"
              size={vs(18)}
              color={'#CBEAF3'}
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <>
          <Icon
            style={style.iconFace}
            name="microphone-outline"
            type="material-community"
            size={vs(23)}
            color={colors.text}
          />
          <Icon
            style={style.iconFace}
            name="camera-outline"
            type="material-community"
            size={vs(23)}
            color={colors.text}
          />
        </>
      );
    }
  };

  const onBack = () => navigator.goBack();

  const getMessageData = async () => {
    const res = await MessageApi.getMessages();
    return res;
  };

  const onSentMessage = () => {
    socket?.data.emit(SocketName.Send, message);
    setMessage('');
    Keyboard.dismiss();
  };

  const getStatusStateUI = () => {
    return isActive
      ? {backgroundColor: '#4ADC61'}
      : {backgroundColor: '#D0D0D0'};
  };
  // FlatList
  const renderMsg = ({item}: any) => (
    <ChatBubble
      style={{marginVertical: hs(5)}}
      name="Nam Nguyen"
      isUser={item.isUser}
      timestamp="10:20 AM"
      message={`${item.message}`}
      img="https://i.pinimg.com/736x/4d/8e/cc/4d8ecc6967b4a3d475be5c4d881c4d9c.jpg"
    />
  );

  const renderHeader = () => <View style={style.headerWhiteSpace} />;
  const renderFooter = () => <View style={style.footerWhiteSpace} />;

  //LIFE-CYCLE
  // useEffect(() => {
  //   const getMsgData = async () => {
  //     const res = await getMessageData();
  //     console.log(res);
  //     setMessages(res);
  //   };
  //   getMsgData();
  // }, []);

  // useEffect(() => {
  //   socket!.data.on(SocketName.Messages, (data: any) => setMessages(data));
  // }, [socket]);

  return (
    <View style={style.container}>
      {/* HEADER */}
      <View style={{...style.header, borderBottomColor: colors.card}}>
        <Icon
          name="keyboard-backspace"
          type="material-community"
          size={vs(25)}
          color={colors.text}
          onPress={onBack}
        />
        <View style={style.subHeader}>
          <View style={style.headerInfoHolder}>
            <Text style={{...style.txtReceiverName, color: colors.text}}>
              Nam Nguyen
            </Text>
            <View style={style.statusInfoHolder}>
              <View style={[style.activePoint, getStatusStateUI()]} />
              <Text style={{...style.txtLastTimeActive, color: colors.text}}>
                Last seen 56m ago
              </Text>
            </View>
          </View>
          <View style={style.headerIconHolder}>
            <Icon
              name="phone-outline"
              type="material-community"
              size={vs(23)}
              color={colors.text}
            />
            <Icon
              name="dots-vertical"
              type="material-community"
              size={vs(25)}
              color={colors.text}
            />
          </View>
        </View>
      </View>
      {/* MIDDLE */}
      <View style={style.middle}>
        <FlatList
          style={style.flatList}
          data={messages}
          renderItem={renderMsg}
          keyExtractor={(item: any) => item._id}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
        />
      </View>
      {/* BOTTOM */}
      <View style={{...style.bottom, borderTopColor: colors.card}}>
        <View style={style.circle}>
          <Icon
            name="plus"
            type="material-community"
            size={vs(23)}
            color={'#CBEAF3'}
          />
        </View>
        <View style={{...style.inputHolder, backgroundColor: colors.card}}>
          <TextInput
            style={{...style.inputMessage, color: colors.text}}
            placeholderTextColor={colors.text}
            multiline={true}
            placeholder="Type a message"
            onChangeText={handleMessage}
            value={message}
          />
          <Icon
            style={style.iconFace}
            name="emoticon-happy-outline"
            type="material-community"
            size={vs(23)}
            color={colors.text}
          />
        </View>
        <View style={style.bottomIconFunctionHolder}>{getIconContainer()}</View>
      </View>
    </View>
  );
};
export default ChatRoomScreen;
