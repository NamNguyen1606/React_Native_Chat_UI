import React, {useContext} from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {GlobalContext, StoreProviderInterface} from '../../utils/storeProvider';
import {hs, vs, ms} from '../../utils/scaling';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import {Colors} from '../../utils/colors';
import ChatBubble from '../../components/MessageBubble/index';
import {style} from './style';
interface Props {}

const ChatRoomScreen = () => {
  const {socket} = useContext<StoreProviderInterface>(GlobalContext);
  const navigator = useNavigation();
  const isActive = true;

  // FUNCTION
  const [message, setMessage] = useState<string>('');

  const handleMessage = (value: string) => setMessage(value);

  const getIconContainer = () => {
    if (message) {
      return (
        <View style={style.circle}>
          <Icon
            style={style.sentIcon}
            name="send-outline"
            type="material-community"
            size={vs(18)}
            color={'#CBEAF3'}
          />
        </View>
      );
    } else {
      return (
        <>
          <Icon
            style={style.iconFace}
            name="microphone-outline"
            type="material-community"
            size={vs(23)}
            color={'#2F2F2F'}
          />
          <Icon
            style={style.iconFace}
            name="camera-outline"
            type="material-community"
            size={vs(23)}
            color={'#2F2F2F'}
          />
        </>
      );
    }
  };

  const onBack = () => navigator.goBack();
  return (
    <View style={style.container}>
      {/* HEADER */}
      <View style={style.header}>
        <Icon
          name="keyboard-backspace"
          type="material-community"
          size={vs(25)}
          color={'#2F2F2F'}
          onPress={onBack}
        />
        <View style={style.subHeader}>
          <View style={style.headerInfoHolder}>
            <Text style={style.txtReceiverName}>Nam Nguyen</Text>
            <View style={style.statusInfoHolder}>
              <View
                style={[
                  style.activePoint,
                  isActive
                    ? {backgroundColor: '#4ADC61'}
                    : {backgroundColor: '#D0D0D0'},
                ]}
              />
              <Text style={style.txtLastTimeActive}>Last seen 56m ago</Text>
            </View>
          </View>
          <View style={style.headerIconHolder}>
            <Icon
              name="phone-outline"
              type="material-community"
              size={vs(23)}
              color={'#2F2F2F'}
            />
            <Icon
              name="dots-vertical"
              type="material-community"
              size={vs(25)}
              color={'#2F2F2F'}
            />
          </View>
        </View>
      </View>
      {/* MIDDLE */}
      <ScrollView style={style.middle}>
        <ChatBubble
          name="Nam Nguyen"
          isUser={true}
          timestamp="10:20 AM"
          message="Hey Bro"
          img="https://i.pinimg.com/736x/4d/8e/cc/4d8ecc6967b4a3d475be5c4d881c4d9c.jpg"
        />
        <ChatBubble
          name="Nam Nguyen"
          isUser={false}
          timestamp="10:20 AM"
          message="Okay so this might be the most requested blog I am ever writing. So here it is! First thing's first this might get a little long but trust me it's so adventurous you'll have a lot of fun! Not wasting a lot of time let's get into it."
          img="https://i.pinimg.com/736x/4d/8e/cc/4d8ecc6967b4a3d475be5c4d881c4d9c.jpg"
        />

        <ChatBubble
          name="Nam Nguyen"
          isUser={true}
          timestamp="10:20 AM"
          message={`The selection process consists of three rounds basically.
          1) A robust written application. It is a big application which has a lot of questions the gist of which is it asks you what all types of technologies you know (android dev, ML, web dev etc), an example of your work and what all interests you?
    
          2) Behavioral interview. Once your application is accepted the next step is to schedule a behavioral interview. The interview will be 10-15 mins long. You have nothing to prepare for this interview it's just a normal chit-chat about the projects, things you've worked on, what interests you etc.`}
          img="https://i.pinimg.com/736x/4d/8e/cc/4d8ecc6967b4a3d475be5c4d881c4d9c.jpg"
        />
        <View style={style.whiteSpace} />
      </ScrollView>
      {/* BOTTOM */}
      <View style={style.bottom}>
        <View style={style.circle}>
          <Icon
            name="plus"
            type="material-community"
            size={vs(23)}
            color={'#CBEAF3'}
          />
        </View>
        <View style={style.inputHolder}>
          <TextInput
            style={style.inputMessage}
            multiline={true}
            placeholder="Type a message"
            onChangeText={handleMessage}
          />
          <Icon
            style={style.iconFace}
            name="emoticon-happy-outline"
            type="material-community"
            size={vs(23)}
            color={'#2F2F2F'}
          />
        </View>
        <View style={style.bottomIconFunctionHolder}>{getIconContainer()}</View>
      </View>
    </View>
  );
};
export default ChatRoomScreen;
