import React, {useContext} from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {GlobalContext, StoreProviderInterface} from '../../utils/storeProvider';
interface Props {}

const ChatRoomScreen = () => {
  const {socket} = useContext<StoreProviderInterface>(GlobalContext);
  let [data, setData] = useState<string[]>([]);
  let text: string = '';
  const sendMsg = () => socket!.data.emit('send', text);
  const handleText = (value: string) => (text = value);

  useEffect(() => {
    socket!.data.on('receive', (response: string[]) => {
      setData(response);
      console.log(response);
    });
  });

  return (
    <View style={style.container}>
      {data.map((item: string, index: any) => {
        return <Text key={index}>{item}</Text>;
      })}
      <TextInput style={style.input} onChangeText={handleText} />
      <TouchableOpacity onPress={sendMsg}>
        <Text>CLICK</Text>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {borderColor: 'black', borderWidth: 1},
});
export default ChatRoomScreen;
