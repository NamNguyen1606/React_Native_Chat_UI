import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import Route from '../../utils/route';
import {StoreProviderInterface, GlobalContext} from '../../utils/storeProvider';
import MessageApi from '../../api/message.api';
import {vs, hs, ms} from '../../utils/scaling';
import {Icon} from 'react-native-elements';
import UserCard from '../../components/UserCard';
import {ThemeContext} from '../../../App';
import {Color} from '../../utils/theme';
import Store from '../../utils/asyncStore';
import RoomApi from '../../api/roomApi';
import SocketName from '../../utils/socketNamespace';

let userData;

const RoomsScreen = () => {
  let [userAvatar, setUserAvatar] = useState<string>(
    'https://www.vippng.com/png/detail/416-4161690_empty-profile-picture-blank-avatar-image-circle.png',
  );
  const {id, socket} = useContext<StoreProviderInterface>(GlobalContext);
  const [userId, setUserId] = useState<any>();
  const [userActiveList, setUserActiveList] = useState<[]>([]);
  const handleUserId = (value: string) => setUserId(value);

  const navigator = useNavigation();
  const {isDarkMode, setIsDarkMode} = useContext(ThemeContext);
  const {colors} = useTheme();

  //FUNCTION
  const onUserCardPress = async () => {
    socket?.data.emit(SocketName.Join, '160616');
    const res = await RoomApi.getRoom('16', '06', false);
    console.log(res);
    navigator.navigate(Route.ChatScreen);
  };

  // useEffect(() => {
  //   const getUserData = async () => {
  //     userData = await Store.getUserData();
  //     setUserAvatar(userData._avatar);
  //   };
  //   // const res = async () => {
  //   //   const res = await MessageApi.getMessages();
  //   //   setUserActiveList(res);
  //   // };
  //   // res();
  //   getUserData();
  // }, []);

  // useEffect(() => {
  //   socket!.data.on('message', (data: any) => {
  //     console.log(data);
  //     setUserId(data);
  //   });
  // }, [socket]);
  const isActive = true;
  return (
    <View style={{...style.container, backgroundColor: colors.background}}>
      <View
        style={{
          ...style.header,
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        }}>
        <Icon
          name="bell-outline"
          type="material-community"
          size={vs(25)}
          color={colors.text}
          onPress={() => {
            setIsDarkMode(!isDarkMode);
          }}
        />
        <View style={style.avatarContainer}>
          <Image
            style={style.img}
            source={{
              uri: userAvatar,
            }}
          />
          <View
            style={[
              style.activePoint,
              isActive
                ? {backgroundColor: '#4ADC61'}
                : {backgroundColor: '#D0D0D0'},
            ]}
          />
        </View>
        <View style={style.headerIconGroup}>
          <Icon
            name="account-plus-outline"
            type="material-community"
            size={vs(25)}
            color={colors.text}
          />
          <Icon
            name="magnify"
            type="material-community"
            style={{marginLeft: hs(10)}}
            size={vs(25)}
            color={colors.text}
          />
        </View>
      </View>
      <View style={style.middle}>
        <UserCard
          name="Arden Dan"
          lastMsg="Hi, bro"
          lastTimeActive="1h ago"
          isOnline={true}
          img="https://i.pinimg.com/originals/31/a0/d5/31a0d596f1e215b5825333f419645dcb.jpg"
          onPress={onUserCardPress}
        />
        <UserCard
          name="Dianna Smiley"
          lastMsg="Hey! What's up"
          lastTimeActive="3m ago"
          isOnline={false}
          img="https://i.pinimg.com/736x/4d/8e/cc/4d8ecc6967b4a3d475be5c4d881c4d9c.jpg"
          onPress={() => navigator.navigate(Route.ChatScreen)}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: vs(70),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hs(10),
    borderBottomWidth: 1,
  },
  headerIconGroup: {
    flexDirection: 'row',
  },
  middle: {
    flex: 1,
  },
  txtTitle: {
    fontSize: ms(30),
    color: 'white',
    fontWeight: 'bold',
  },
  avatarContainer: {
    width: hs(42),
    height: hs(42),
    left: hs(20),
  },
  activePoint: {
    top: ms(32),
    left: ms(28),
    height: vs(13),
    width: vs(13),
    borderRadius: vs(10),
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 1,
  },
  img: {
    flex: 1,
    borderRadius: vs(25),
  },
});

export default RoomsScreen;
