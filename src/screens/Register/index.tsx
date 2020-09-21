import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import {Button} from '../../components';
import {vs, hs, ms} from '../../utils/scaling';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import UserApi from '../../api/user.api';
import User from '../../models/user.model';
import Store from '../../utils/asyncStore';
import Route from '../../utils/route';

interface Props {}
interface FormInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowPwd, setIsShowPwd] = useState<boolean>(true);
  const [isShowConfirmPwd, setIsShowConfirmPwd] = useState<boolean>(true);
  const [info, setInfo] = useState<FormInfo>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigator = useNavigation();
  //HANDLE FORM
  const handleFirstName = (value: string) =>
    setInfo({...info, firstName: value});
  const handleLastName = (value: string) => setInfo({...info, lastName: value});
  const handleEmail = (value: string) => setInfo({...info, email: value});
  const handlePassword = (value: string) => setInfo({...info, password: value});
  const handleConfirmPassword = (value: string) =>
    setInfo({...info, confirmPassword: value});
  //FUNCTION
  const showPwd = () => {
    setIsShowPwd(!isShowPwd);
  };

  const showConfirmPwd = () => {
    setIsShowConfirmPwd(!isShowConfirmPwd);
  };

  const onBack = () => navigator.goBack();

  const onRegister = async () => {
    if (info.password === info.confirmPassword) {
      setIsLoading(true);
      const res = await UserApi.register(
        new User({
          firstName: info.firstName,
          lastName: info.lastName,
          email: info.email,
          password: info.password,
          avatar:
            'https://i.pinimg.com/736x/4d/8e/cc/4d8ecc6967b4a3d475be5c4d881c4d9c.jpg',
        }),
      );
      const user = new User({
        id: res.data._id,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
        password: res.data.password,
        phone: res.data.phone,
        token: res.data.token,
        avatar: res.data.avatar,
      });
      await Store.saveUserData(user);
      navigator.navigate(Route.HomeScreen);
    }
    setIsLoading(false);
  };

  return (
    <KeyboardAwareScrollView>
      <View style={style.container}>
        <View style={style.header}>
          <Icon
            name="keyboard-backspace"
            type="material-community"
            size={ms(25)}
            color={'white'}
            onPress={onBack}
          />
          <Text style={style.txtHeader}>Register</Text>
          <View />
        </View>
        <View style={style.bottom}>
          <View style={style.nameContainer}>
            <Input
              containerStyle={{width: hs(150), height: vs(80)}}
              label="First Name"
              labelStyle={style.txtInputLabel}
              placeholder="Wick"
              inputStyle={style.txtInput}
              onChangeText={handleFirstName}
            />
            <Input
              containerStyle={{width: hs(150), height: vs(80)}}
              label="Last Name"
              labelStyle={style.txtInputLabel}
              placeholder="John"
              inputStyle={style.txtInput}
              onChangeText={handleLastName}
            />
          </View>
          <Input
            containerStyle={style.inputContainer}
            label="Email"
            labelStyle={style.txtInputLabel}
            placeholder="psc@gmail.com"
            inputStyle={style.txtInput}
            onChangeText={handleEmail}
          />
          <Input
            containerStyle={style.inputContainer}
            label="Password"
            labelStyle={style.txtInputLabel}
            placeholder="******"
            inputStyle={style.txtInput}
            secureTextEntry={isShowPwd}
            rightIcon={
              <Icon
                type="font-awesome"
                name={isShowPwd ? 'eye-slash' : 'eye'}
                size={ms(18)}
                color="#5D5D5D"
                onPress={showPwd}
              />
            }
            onChangeText={handlePassword}
          />
          <Input
            containerStyle={style.inputContainer}
            label="Confirm Password"
            labelStyle={style.txtInputLabel}
            placeholder="******"
            inputStyle={style.txtInput}
            secureTextEntry={isShowConfirmPwd}
            rightIcon={
              <Icon
                type="font-awesome"
                name={isShowConfirmPwd ? 'eye-slash' : 'eye'}
                size={ms(18)}
                color="#5D5D5D"
                onPress={showConfirmPwd}
              />
            }
            onChangeText={handleConfirmPassword}
          />
          <Button
            style={{marginTop: vs(20)}}
            tittle="Register"
            isLoading={isLoading}
            onPress={onRegister}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    height: vs(90),
    backgroundColor: 'black',
    flexDirection: 'row',
    paddingLeft: hs(15),
    paddingRight: hs(35),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottom: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: hs(50),
    paddingTop: vs(30),
    paddingHorizontal: hs(20),
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginBottom: vs(15),
  },
  txtHeader: {
    fontSize: ms(25),
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    height: ms(60),
    marginBottom: vs(20),
  },
  txtInputLabel: {color: '#5D5D5D', fontSize: ms(16)},
  txtInput: {color: 'black', fontSize: ms(14)},
});
export default RegisterScreen;
