import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {hs, vs} from '../../utils/scaling';
import {Icon} from 'react-native-elements';
import {useTheme, useNavigation} from '@react-navigation/native';
import Route from '../../utils/route';

interface Props {}
const degValue = new Animated.Value(1);

const CreatingGroupScreen = () => {
  const {colors} = useTheme();
  const navigator = useNavigation();
  const [groupName, setGroupName] = useState<string>('');
  const deg = degValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '0deg'],
  });
  const colorInterpolate = degValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(158,158,158)', 'rgb(90,210,244)'],
  });

  const animatedStyle = {
    backgroundColor: colorInterpolate,
  };

  //FUNCTIONs
  const handleGroupName = (value: string) => setGroupName(value);

  const onNext = () =>
    navigator.navigate(Route.AddingGroup, {groupName: groupName});
  const onRotate = (value: number) => {
    // degValue.setValue(0);
    Animated.timing(degValue, {
      toValue: value,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  // SIDE EFFECT
  useEffect(() => {
    if (!groupName) {
      onRotate(0);
    }
  }, [groupName]);

  return (
    <View style={style.container}>
      <View style={style.middle}>
        {/* Group Info */}
        <View style={style.groupInfoContainer}>
          <View>
            <Image
              style={style.imageHolder}
              source={{
                uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSu_CkYd2E5LFALTLFSok-gMV5Tw9hxUQSyxg&usqp=CAU',
              }}
            />
          </View>
          <TextInput
            style={{...style.inputGroupName, borderColor: colors.text}}
            placeholder=" ENTER GROUP NAME "
            placeholderTextColor={colors.text}
            onChangeText={handleGroupName}
            onEndEditing={() => {
              if (groupName) {
                onRotate(1);
              }
            }}
          />
          <TouchableOpacity
            disabled={groupName ? false : true}
            activeOpacity={0}
            onPress={onNext}>
            <Animated.View
              style={{
                ...style.submitBtn,
                transform: [{rotate: deg}],
                ...animatedStyle,
              }}>
              <Icon
                name="arrow-right"
                type="material-community"
                size={hs(35)}
                color={'white'}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: hs(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  middle: {
    flex: 1,
    paddingTop: hs(30),
  },
  groupInfoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  AddingUserContainer: {
    flex: 1,
    paddingTop: hs(10),
  },
  imageHolder: {
    height: hs(100),
    width: hs(100),
    backgroundColor: 'black',
    borderRadius: hs(50),
    marginBottom: hs(10),
  },
  inputGroupName: {
    textAlign: 'center',
    borderBottomWidth: 0.5,
  },
  submitBtn: {
    height: hs(55),
    width: hs(55),
    borderRadius: hs(30),
    backgroundColor: '#2DCFEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hs(20),
  },
});
export default CreatingGroupScreen;
