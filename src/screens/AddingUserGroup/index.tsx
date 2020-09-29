import {useTheme, useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import {UserCircleAvatar, UserInfoCard} from '../../components';
import {hs, vs} from '../../utils/scaling';

interface Props {}
const DATA = [
  {id: '1', name: 'Nam Nguyen'},
  {id: '2', name: 'Nguyen Nguyen'},
  {id: '3', name: 'Phuong Nam Tran'},
  {id: '4', name: 'Nam Nguyen'},
  {id: '5', name: 'Nam Nguyen'},
  {id: '12', name: 'Nam Nguyen'},
  {id: '311', name: 'Nam Nguyen'},
  {id: '112', name: 'Nam Nguyen'},
  {id: '1132', name: 'Nam Nguyen'},
  {id: '14412', name: 'Nam Nguyen'},
];
const AddingUserGroupScreen = () => {
  const {colors} = useTheme();
  const navigator = useNavigation();
  //FUNCTION
  const onBack = () => {
    navigator.goBack();
  };
  // FLAT LIST
  const renderItem = ({item}: any) => <UserCircleAvatar />;
  const renderUserItem = ({item}: any) => (
    <UserInfoCard
      img="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSu_CkYd2E5LFALTLFSok-gMV5Tw9hxUQSyxg&usqp=CAU"
      email="nam@gmail.com"
      isOnline={true}
      name="Nam Nguyen"
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
        <View style={style.btnDone}>
          <Text style={{color: colors.text}}> Done</Text>
        </View>
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
        />
        <FlatList
          style={{height: hs(130)}}
          horizontal={true}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={renderKey}
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          data={DATA}
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
