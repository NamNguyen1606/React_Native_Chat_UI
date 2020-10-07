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
import MessageApi from '../../api/message.api';
import {vs, hs, ms} from '../../utils/scaling';
import {Icon, Overlay} from 'react-native-elements';
import RoomCard from '../../components/RoomCard';
import {ThemeContext} from '../../../App';
import {Color} from '../../utils/theme';
import Store from '../../utils/asyncStore';
import RoomApi from '../../api/roomApi';
import SocketName from '../../utils/socketNamespace';
import {Dimensions} from 'react-native';
import ContactApi from '../../api/contactApi';
import {FlatList} from 'react-native-gesture-handler';
import User from '../../models/user.model';
import {CreatingGroupScreen} from '..';
import SOCKET from '../../utils/socket';

const RoomsScreen = () => {
  let [userAvatar, setUserAvatar] = useState<string>(
    'https://www.vippng.com/png/detail/416-4161690_empty-profile-picture-blank-avatar-image-circle.png',
  );
  const [searchKey, setSearchKey] = useState<String>('');
  const [rooms, setRooms] = useState<any[]>([]);
  const [socketData, setSocketData] = useState<any>();
  const [socketNewRoom, setSocketNewRoom] = useState<any>();
  const [userInfo, setUserInfo] = useState<any>();
  const [userActiveList, setUserActiveList] = useState<[]>([]);

  const navigator = useNavigation();
  const {isDarkMode, setIsDarkMode} = useContext(ThemeContext);
  const {colors} = useTheme();

  //FUNCTION
  const onUserCardPress = async (roomId: string, roomName: string) => {
    navigator.navigate(Route.ChatScreen, {
      roomId: roomId,
      userId: userInfo._id,
      roomName: roomName,
    });
  };

  const onSearching = () =>
    navigator.navigate(Route.SearchingScreen, {
      token: userInfo._token,
      userId: userInfo._id,
    });

  const onCreateGroup = () => navigator.navigate(Route.CreatingGroup);

  const updateList = (roomId: string, message: string) => {
    const index = rooms.findIndex((obj) => obj.roomData.roomId === roomId);
    if (index !== -1) {
      const room = rooms[index];
      room.message.newMessage = message;
      const newRooms = rooms;
      newRooms.splice(index, 1);
      setRooms([room, ...newRooms]);
    }
  };

  const getRooms = async (token: string) => {
    try {
      const res = await ContactApi.getRooms(token);
      setRooms(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // SIDE EFFECT
  useEffect(() => {
    const getUserInfo = async () => {
      const user = await Store.getUserData();
      setUserInfo(user);
      setUserAvatar(user._avatar);
      getRooms(user._token);
      SOCKET.emit(SocketName.Join, user._id);
    };

    getUserInfo();
  }, []);

  //Socket

  useEffect(() => {
    SOCKET.on(SocketName.NewRoom, (data: any) => {
      console.log(data);
      setSocketData(data);
    });
  }, []);

  useEffect(() => {
    if (socketData) {
      setRooms([socketData, ...rooms]);
    }
  }, [socketData]);

  // NEW MESSAGE IN EXIST ROOM
  useEffect(() => {
    SOCKET.on(SocketName.RoomHaveNewMessage, (data: any) => {
      setSocketNewRoom(data);
    });
  }, []);

  useEffect(() => {
    if (socketNewRoom) {
      updateList(socketNewRoom.roomId, socketNewRoom.message);
    }
  }, [socketNewRoom]);

  // FLATLIST
  const renderRooms = ({item}: any) => (
    <RoomCard
      name={item.roomInfo.fullName}
      lastMsg={item.message.newMessage}
      lastTimeActive="1h ago"
      isOnline={true}
      img={item.roomInfo.avatar}
      onPress={() =>
        onUserCardPress(item.roomData.roomId, item.roomInfo.fullName)
      }
    />
  );
  const isActive = true;
  return (
    <View style={{...style.container, backgroundColor: colors.background}}>
      {/* HEADER */}
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
          <View style={{width: hs(10)}} />
          <Icon
            name="magnify"
            type="material-community"
            // style={{marginLeft: hs(30)}}
            size={vs(25)}
            color={colors.text}
            onPress={onSearching}
          />
        </View>
      </View>
      {/* MIDDLE */}
      <View style={style.middle}>
        <TouchableOpacity
          style={style.groupBtn}
          activeOpacity={0.5}
          onPress={onCreateGroup}>
          <Icon
            name="account-multiple-plus-outline"
            type="material-community"
            size={hs(25)}
            color={'white'}
          />
        </TouchableOpacity>
        <FlatList
          data={rooms}
          renderItem={renderRooms}
          keyExtractor={(item: any, index) => item.roomData._id}
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
  groupBtn: {
    height: hs(50),
    width: hs(50),
    backgroundColor: '#049FE3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hs(25),
    position: 'absolute',
    zIndex: 1,
    left: hs(295),
    top: Dimensions.get('window').height - ms(210),
  },
});

export default RoomsScreen;
