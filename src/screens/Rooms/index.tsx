import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import Route from '../../utils/route';
import {StoreProviderInterface, GlobalContext} from '../../utils/storeProvider';
import MessageApi from '../../api/message';
import {vs, hs} from '../../utils/scaling';
import UserCard from '../../components/UserCard';
interface Props {}

const RoomsScreen = () => {
  const {id, socket} = useContext<StoreProviderInterface>(GlobalContext);
  const [userId, setUserId] = useState();
  const [userActiveList, setUserActiveList] = useState<[]>([]);

  const handleUserId = (value: string) => setUserId(value);

  const onConnect = async () => {
    socket!.data.emit('send', userId);
  };

  const onDisconnect = async () => {
    const res = await MessageApi.getMessages();
    console.log(res);
  };

  const navigator = useNavigation();

  // useEffect(() => {
  //   const res = async () => {
  //     const res = await MessageApi.getMessages();
  //     setUserActiveList(res);
  //   };
  //   res();
  // }, []);

  // useEffect(() => {
  //   socket!.data.on('messages', (data) => {
  //     console.log(data);
  //     setUserActiveList(data);
  //   });
  // }, [socket]);

  return (
    <View style={style.container}>
      <View style={style.header}></View>
      <View style={style.middle}>
        <UserCard onPress={() => navigator.navigate(Route.ChatScreen)} />
        <UserCard />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2CB9B0',
    height: vs(100),
  },
  middle: {
    flex: 1,
  },
});

export default RoomsScreen;
