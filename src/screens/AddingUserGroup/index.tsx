import {useTheme, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet, Animated} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ContactApi from '../../api/contactApi';
import {UserCircleAvatar, UserInfoCard} from '../../components';
import Store from '../../utils/asyncStore';
import {hs, vs} from '../../utils/scaling';
import UserApi from '../../api/user.api';
import RoomApi from '../../api/roomApi';
import Route from '../../utils/route';

let search = UserApi.createSearchRequest();

interface Props {}

const AddingUserGroupScreen = ({route}: any) => {
  const [userId, setUserId] = useState<string>('');
  const {colors} = useTheme();
  const navigator = useNavigation();
  const {groupName} = route.params;
  const [token, setToken] = useState<any>('');
  const [users, setUsers] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchKey, setSearchKey] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [addingUserHeight] = useState(new Animated.Value(0));

  //FUNCTION
  const onBack = () => {
    navigator.goBack();
  };

  const onSearch = useCallback(
    async (value: string) => {
      setSearchKey(value);
      if (token) {
        const res = await search(searchKey, token);
        setSearchResults(res.data);
      }
    },
    [searchKey, token],
  );

  const onCreateGroup = async () => {
    let userIdList = [];
    for (const obj of users) {
      userIdList.push(obj.id);
    }

    const res = await RoomApi.createRoom(userId, userIdList, groupName);
    console.log(userId);
    console.log(res);
    navigator.navigate(Route.HomeScreen);
  };

  const onAddUserToGroup = (userInfo: any) => {
    toggleCheckBox(true, userInfo.email);
    const index = users.findIndex((user) => user.id === userInfo.id);
    if (index === -1) {
      setUsers([...users, userInfo]);
    }
  };

  const onDeleteUser = (userEmail: string) => {
    const result = users.filter((user) => user.email !== userEmail);
    toggleCheckBox(false, userEmail);
    setUsers(result);
  };

  const getListFriends = async (token: string) => {
    const res = await ContactApi.getFriends(token);
    return res.data;
  };

  const onStartTouch = () => {
    setIsVisible(false);
    Animated.spring(addingUserHeight, {
      toValue: hs(0),
      useNativeDriver: false,
      bounciness: 0,
    }).start();
  };

  const onEndTouch = () => {
    Animated.spring(addingUserHeight, {
      toValue: users.length === 0 ? hs(20) : hs(130),
      useNativeDriver: false,
      bounciness: 0,
    }).start();
    setIsVisible(true);
  };

  const toggleCheckBox = (checked: boolean, userEmail: string) => {
    let index = friends.findIndex((obj) => obj.email === userEmail);
    if (index === -1) {
      return;
    }
    let temp = friends;
    temp[index].isCheck = checked;
    setFriends(temp);
  };

  // SIDE EFFECT
  // Animated
  useEffect(() => {
    Animated.spring(addingUserHeight, {
      toValue: users.length === 0 ? hs(20) : hs(130),
      useNativeDriver: false,
      bounciness: 0,
    }).start();
  }, [addingUserHeight, users.length]);

  //Api
  useEffect(() => {
    const getUserInfo = async () => {
      const info = await Store.getUserData();
      const res = await getListFriends(info._token);
      for (let obj of res) {
        obj.isCheck = false;
      }
      setUserId(info._id);
      setToken(info._token);
      setFriends(res);
    };
    getUserInfo();
  }, []);

  // FLAT LIST
  const renderCircleInfoItem = ({item}: any) => (
    <UserCircleAvatar
      key={item.id}
      name={item.name}
      img={item.img}
      onDelete={() => {
        onDeleteUser(item.email);
      }}
    />
  );
  const renderUserItem = ({item}: any) => (
    <UserInfoCard
      id={item._id}
      img={item.avatar}
      email={item.email}
      isOnline={item.isActive}
      name={item.fullName}
      checked={item.isCheck}
      onChecked={onAddUserToGroup}
      onUnChecked={() => {
        onDeleteUser(item.email);
      }}
    />
  );
  const renderUserKey = (item: any) => item._id;
  const renderUserAvatarKey = (item: any) => item.id;

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Icon
          name="keyboard-backspace"
          type="material-community"
          size={vs(25)}
          color={colors.text}
          onPress={onBack}
        />
        <Text style={{color: colors.text}}> Create new group</Text>
        <TouchableOpacity onPress={onCreateGroup}>
          <View style={style.btnDone}>
            <Text style={{color: colors.text}}> Done</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* Adding User */}
      <View style={style.AddingUserContainer}>
        <Input
          placeholder="INPUT WITH CUSTOM ICON"
          leftIcon={
            <Icon
              name="magnify"
              type="material-community"
              size={vs(25)}
              color={colors.text}
            />
          }
          onChangeText={onSearch}
          onTouchStart={onStartTouch}
          onEndEditing={onEndTouch}
          // onSubmitEditing={onEndTouch}
        />
        <Animated.View
          style={{...style.circleUserHolder, height: addingUserHeight}}>
          {!isVisible || (
            <Text style={style.txtAddingUserTittle}>
              {users.length === 0 ? 'EMPTY' : `${users.length} users`}
            </Text>
          )}
          <FlatList
            horizontal={true}
            data={users}
            renderItem={renderCircleInfoItem}
            keyExtractor={renderUserAvatarKey}
            showsHorizontalScrollIndicator={false}
          />
        </Animated.View>
        <View>
          <Text>Contact</Text>
          {/* {searchKey ? (
            <FlatList
              data={searchResults}
              renderItem={renderUserItem}
              keyExtractor={renderUserKey}
            />
          ) : (
            <FlatList
              data={friends}
              renderItem={renderUserItem}
              keyExtractor={renderUserKey}
            />
          )} */}
          <FlatList
            data={searchKey ? searchResults : friends}
            renderItem={renderUserItem}
            keyExtractor={renderUserKey}
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: hs(10),
    paddingVertical: hs(15),
  },
  header: {
    // height: hs(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  AddingUserContainer: {
    flex: 1,
    paddingTop: hs(10),
  },
  btnDone: {
    backgroundColor: '#2DCFEF',
    borderRadius: hs(10),
    padding: hs(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleUserHolder: {
    backgroundColor: '#EDEDED',
    borderRadius: hs(10),
  },
  txtAddingUserTittle: {alignSelf: 'center'},
});
export default AddingUserGroupScreen;
