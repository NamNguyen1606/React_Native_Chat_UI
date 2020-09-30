import {useTheme, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ContactApi from '../../api/contactApi';
import {UserCircleAvatar, UserInfoCard} from '../../components';
import Store from '../../utils/asyncStore';
import {hs, vs} from '../../utils/scaling';
import UserApi from '../../api/user.api';

let search = UserApi.createSearchRequest();
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjcxYWNjNmJiMTVkMDVkYTgxNmM2ZDIiLCJleHAiOjE2MDM5NjE5ODQsImlhdCI6MTYwMTM2OTk4NH0.qMLMBW3LHJb-39EDZQCyDlMzeXB2nKsbM89JAvstPDQ';

interface Props {}
// let userInfo: any;

const AddingUserGroupScreen = () => {
  const {colors} = useTheme();
  const navigator = useNavigation();

  const [users, setUsers] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchKey, setSearchKey] = useState<string>('');
  //FUNCTION
  const onBack = () => {
    navigator.goBack();
  };

  const onSearch = useCallback(
    async (value: string) => {
      setSearchKey(value);
      const res = await search(searchKey);
      setSearchResults(res.data);
    },
    [searchKey],
  );
  // const onSearch = async (value: string) => {
  //   setSearchKey(value);
  //   const res = await UserApi.search(searchKey);
  //   setFriends(res.data);
  // };

  const onAddUserToGroup = (userInfo: any) => {
    const index = users.findIndex((user) => user.id === userInfo.id);
    if (index === -1) {
      setUsers([...users, userInfo]);
    }
  };

  const onDeleteUser = (userId: string) => {
    console.log(userId);
    const result = users.filter((user) => user.email !== userId);
    setUsers(result);
  };

  const getListFriends = async (token: string) => {
    const res = await ContactApi.getFriends(token);
    return res.data;
  };

  // SIDE EFFECT

  useEffect(() => {
    const getUserInfo = async () => {
      const info = await Store.getUserData();
      // userInfo = info;
      const res = await getListFriends(TOKEN);
      setFriends(res);
      return info;
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
      onPress={onAddUserToGroup}
    />
  );
  const renderKey = (item: any) => item.id;

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
        <TouchableOpacity onPress={() => console.log(users)}>
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
        />
        <View style={{height: hs(110)}}>
          <FlatList
            horizontal={true}
            data={users}
            renderItem={renderCircleInfoItem}
            keyExtractor={renderKey}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <FlatList
          data={searchKey ? searchResults : friends}
          renderItem={renderUserItem}
          keyExtractor={renderKey}
        />
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
});
export default AddingUserGroupScreen;
