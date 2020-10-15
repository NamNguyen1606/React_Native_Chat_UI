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
      if (userId) {
        const res = await search(searchKey, userId);
        setSearchResults(res.data);
      }
    },
    [searchKey, userId],
  );

  const onCreateGroup = async () => {
    let userIdList = [];
    for (const obj of users) {
      userIdList.push(obj.id);
    }

    const res = await RoomApi.createRoom(
      userId,
      userIdList,
      ['5f857b238c12c84e3c613ec6'],
      groupName,
      '1998',
      '123',
    );
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

  const getListFriends = async (user_Id: string) => {
    const res = await ContactApi.getFriends(user_Id);
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
      toValue: users.length === 0 ? hs(0) : hs(130),
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
      toValue: users.length === 0 ? hs(0) : hs(130),
      useNativeDriver: false,
      bounciness: 0,
    }).start();
  }, [addingUserHeight, users.length]);

  //Api
  useEffect(() => {
    const getUserInfo = async () => {
      const info = await Store.getUserData();
      const res = await getListFriends(info._id);
      for (let obj of res) {
        obj.isCheck = false;
      }
      setUserId(info._id);
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
            <Text style={{color: 'white'}}> Done</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* Adding User */}
      <View style={style.AddingUserContainer}>
        <Input
          placeholder="SEARCH"
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
              {users.length === 0 ? '' : `Count: ${users.length}`}
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
        <View style={{flex: 1}}>
          <View style={style.subTitleContainer}>
            <Text style={style.subTxtTitle}>FRIENDS</Text>
          </View>
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
    height: hs(30),
    width: hs(50),
    borderRadius: hs(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleUserHolder: {
    backgroundColor: '#EDEDED',
    borderRadius: hs(10),
  },
  txtAddingUserTittle: {
    alignSelf: 'flex-start',
    color: '#606063',
    fontSize: hs(13),
    fontWeight: '700',
    marginTop: hs(5),
    marginLeft: hs(10),
  },
  subTitleContainer: {
    backgroundColor: 'white',
    paddingTop: hs(10),
    paddingBottom: hs(5),
  },
  subTxtTitle: {
    color: '#919095',
    fontSize: hs(13),
    fontWeight: '700',
  },
});
export default AddingUserGroupScreen;
