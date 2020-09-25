import React, {useCallback, useContext} from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {GlobalContext, StoreProviderInterface} from '../../utils/storeProvider';
import {vs, hs} from '../../utils/scaling';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import ChatBubble from '../../components/MessageBubble/index';
import {style} from './style';
import MessageApi from '../../api/message.api';
import {FlatList} from 'react-native-gesture-handler';
import SocketName from '../../utils/socketNamespace';
import {usePaginatedQuery} from 'react-query';
interface Props {
  route: any;
}
const ChatRoomScreen: React.FC<Props> = ({route}) => {
  const {socket} = useContext<StoreProviderInterface>(GlobalContext);
  const [messages, setMessages] = useState<any>([]);
  const navigator = useNavigation();
  const isActive = true;
  const {colors} = useTheme();
  const {roomId} = route.params;
  const {userId} = route.params;
  const [page, setPage] = useState<number>(1);

  // FUNCTION
  const dataFormat = (date: string) => {
    let result = new Date(date);
    return result.getHours() + ':' + result.getMinutes();
  };

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

  const getMessageData = (key: any, pageIndex: any) =>
    MessageApi.getMessagesById(roomId, pageIndex);

  const {isLoading, resolvedData} = usePaginatedQuery(
    ['message', page],
    getMessageData,
  );

  const onSentMessage = async () => {
    Keyboard.dismiss();
    setMessage('');
    await MessageApi.sendMessage(roomId, userId, message, false);
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
      name={item.fullName}
      isUser={userId.toString() === item.message.senderId}
      timestamp={dataFormat(item.message.createdAt)}
      message={`${item.message.message}`}
      img={item.avatar}
    />
  );

  const loadMore = () => {
    console.log(resolvedData);
    !resolvedData || setPage(page + 1);
  };

  const renderHeader = () => <View style={style.headerWhiteSpace} />;
  const renderFooter = () => <View style={style.footerWhiteSpace} />;
  const updateMessage = useCallback(
    (msg: any) => {
      setMessages([msg, ...messages]);
    },
    [messages],
  );
  //LIFE-CYCLE
  useEffect(() => {
    isLoading || setMessages([...messages, ...resolvedData?.data]);
  }, [isLoading, resolvedData]);

  useEffect(() => {
    console.log('EMIT');
    socket!.data.on(SocketName.Messages, (data: any) => updateMessage(data));
  }, [socket, updateMessage]);

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
        {isLoading || (
          <FlatList
            inverted={true}
            style={style.flatList}
            data={messages}
            renderItem={renderMsg}
            keyExtractor={(item: any) => item.message._id}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.1}
            onEndReached={loadMore}
          />
        )}
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
