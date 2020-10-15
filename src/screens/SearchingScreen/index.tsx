import {useNavigation} from '@react-navigation/native';
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Icon, Image, Overlay} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {hs, ms} from '../../utils/scaling';
import UserApi from '../../api/user.api';
import ContactApi from '../../api/contactApi';
import {ContactCard} from '../../components';
import Route from '../../utils/route';

interface DialogInfo {
  id?: string;
  name?: string;
  avatar?: string;
  email?: string;
}
const search = UserApi.createSearchRequest();

const getRoomId = (userId: string, friendId: string) => {
  if (userId < friendId) {
    return userId + friendId;
  } else {
    return friendId + userId;
  }
};

const SearchingScreen = ({route}: any) => {
  const input = useRef<any>();
  const [searchKey, setSearchKey] = useState<string>('');
  const [friends, setFriends] = useState<any[]>([]);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [dialogInfo, setDialogInfo] = useState<DialogInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigator = useNavigation();
  const {userId} = route.params;

  // ANIMATED
  // const scrollY = new Animated.Value(0);
  // const diffClampScrollY = Animated.diffClamp(scrollY, 0, 80);
  // const headerTranslateY = diffClampScrollY.interpolate({
  //   inputRange: [0, 80],
  //   outputRange: [80, 0],
  //   extrapolate: 'clamp',
  // });

  //FUNCTION
  const onBack = () => navigator.goBack();

  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
    setIsLoading(false);
  };

  const onContact = async () => {
    setIsLoading(true);
    const friendId = dialogInfo?.id || ' ';
    const res: any = await ContactApi.addFriend(userId, friendId);
    console.log(res);
    navigator.navigate(Route.ChatScreen, {
      roomId: res.data.roomId,
      userId: userId,
      roomName: res.data.fullName,
    });
    toggleDialog();
  };

  const navigateRoom = (
    ownerId: string,
    friendId: string,
    roomName: string,
  ) => {
    const roomId = getRoomId(ownerId, friendId);
    navigator.navigate(Route.ChatScreen, {
      roomId: roomId,
      userId: userId,
      roomName: roomName,
    });
  };

  const getListFriends = async (user_Id: string) => {
    const res = await ContactApi.getFriends(user_Id);
    return res.data;
  };

  const handleSearchKey = (value: string) => {
    setSearchKey(value);
    onSearch();
  };

  const onClearSearchKey = () => {
    input.current.clear();
    setSearchKey('');
  };

  const onSearch = useCallback(async () => {
    const res = await search(searchKey, userId);
    setSearchResult(res.data);
  }, [searchKey]);

  const checkIsFriend = async (
    friendId: string,
    roomName: string,
    avatar: string,
    email: string,
  ) => {
    const res: any = await ContactApi.checkFriendExist(userId, friendId);
    if (res.isExist) {
      navigateRoom(userId, friendId, roomName);
    } else {
      setDialogInfo({
        id: friendId,
        avatar: avatar,
        email: email,
        name: roomName,
      });
      toggleDialog();
    }
  };

  //FLAT LIST

  const renderFriendItem = ({item}: any) => (
    <ContactCard
      id={item._id}
      name={item.fullName}
      email={item.email}
      img={item.avatar}
      isOnline={true}
      isStranger={false}
      onPress={() => navigateRoom(userId, item._id, item.fullName)}
    />
  );

  const renderFriendKey = (item: string, index: number) => index + '';

  const renderSearchResultItem = ({item}: any) => (
    <ContactCard
      id={item._id}
      name={item.fullName}
      email={item.email}
      img={item.avatar}
      isOnline={false}
      isStranger={true}
      onPress={() =>
        checkIsFriend(item._id, item.fullName, item.avatar, item.email)
      }
    />
  );

  const renderSearchResultKey = (item: string, index: number) => index + '';

  const renderBottom = () => <View style={style.whiteSpace}></View>;

  // SIDE EFFECT

  useEffect(() => {
    const getFriendsData = async () => {
      const res = await getListFriends(userId);
      setFriends(res);
    };
    getFriendsData();
  }, []);

  return (
    <View style={style.container}>
      {/* DIALOG */}
      <Overlay isVisible={dialogVisible} onBackdropPress={toggleDialog}>
        <View style={style.dialogContainer}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#66DFFE', '#017AD7']}
            style={style.dialogTop}>
            <View style={style.img}>
              <Image
                style={style.img}
                source={{
                  uri: dialogInfo?.avatar,
                }}
              />
            </View>
            <Text
              style={[
                style.dialogInfoTxt,
                {fontSize: hs(20), fontWeight: 'bold'},
              ]}>
              {dialogInfo?.name}
            </Text>
            <Text style={style.dialogInfoTxt}>{dialogInfo?.email}</Text>
          </LinearGradient>
          <View style={style.dialogBottom}>
            <TouchableOpacity onPress={toggleDialog}>
              <View style={style.btnContainer}>
                <Text style={style.dialogBtnTxt}>CANCEL</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onContact}>
              <View style={style.btnContainer}>
                {isLoading ? (
                  <ActivityIndicator color="black" size="small" />
                ) : (
                  <Text style={style.dialogBtnTxt}>CONTACT</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
      {/* TOP */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#66DFFE', '#017AD7']}
        style={style.header}>
        <Icon
          name="keyboard-backspace"
          type="material-community"
          size={hs(25)}
          color={'white'}
          onPress={onBack}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            ref={input}
            placeholder="Search"
            placeholderTextColor="white"
            style={style.searchingInput}
            onChangeText={handleSearchKey}
          />
          {!searchKey || (
            <View style={style.deleteContainer}>
              <Icon
                name="close"
                type="material-community"
                size={hs(18)}
                color={'white'}
                onPress={onClearSearchKey}
              />
            </View>
          )}
        </View>
      </LinearGradient>
      {/* BOTTOM */}
      {searchKey ? (
        <View style={{flex: 1}}>
          <View style={style.subTitleContainer}>
            <Text style={style.subTxtTitle}>DIRECTORY</Text>
          </View>
          <FlatList
            data={searchResult}
            renderItem={renderSearchResultItem}
            keyExtractor={renderSearchResultKey}
            ListFooterComponent={renderBottom}
          />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={style.subTitleContainer}>
            <Text style={style.subTxtTitle}>FRIENDS</Text>
          </View>
          <FlatList
            data={friends}
            renderItem={renderFriendItem}
            keyExtractor={renderFriendKey}
            ListFooterComponent={renderBottom}
          />
        </View>
      )}
      {/* <View style={style.middle}></View> */}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: ms(120, 0.7),
    backgroundColor: 'blue',
    alignItems: 'flex-start',
    paddingLeft: hs(8),
    paddingTop: hs(20),
  },
  middle: {},
  searchingInput: {
    width: hs(300),
    fontSize: hs(38),
    paddingBottom: hs(10),
    color: 'white',
    opacity: 0.9,
  },
  deleteContainer: {
    height: hs(22),
    width: hs(22),
    borderRadius: hs(15),
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: hs(80),
    width: hs(80),
    margin: hs(8),
    borderRadius: hs(40),
    borderColor: 'grey',
    borderWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    backgroundColor: 'white',
    paddingHorizontal: hs(10),
    paddingVertical: hs(8),
    borderRadius: hs(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogInfoTxt: {color: 'white', fontSize: hs(12)},
  dialogBtnTxt: {color: '#383838', fontSize: hs(15), fontWeight: 'bold'},
  dialogContainer: {
    height: hs(220),
    width: hs(200),
    alignItems: 'center',
    borderRadius: hs(15),
  },
  dialogTop: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hs(10),
    borderBottomLeftRadius: hs(10),
    borderBottomRightRadius: hs(10),
  },
  dialogBottom: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: hs(18),
  },
  subTitleContainer: {
    backgroundColor: '#F2F2F2',
    paddingLeft: hs(12),
    paddingVertical: hs(10),
  },
  subTxtTitle: {
    color: '#919095',
    fontSize: hs(12),
    fontWeight: '700',
  },
  whiteSpace: {
    backgroundColor: 'transparent',
    height: hs(20),
    width: '100%',
  },
});
export default SearchingScreen;
