import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import {Button} from '../../components';
import {vs, hs, ms} from '../../utils/scaling';
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

  const onRegister = () => console.log(info);

  const onLogin = () => {
    navigator.navigate(Route.HomeScreen);
  };

  return (
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
              onPress={showConfirmPwd}
            />
          }
          onChangeText={handleConfirmPassword}
        />
        <Button
          style={{marginTop: vs(20)}}
          tittle="Register"
          isLoading={false}
          onPress={onRegister}
        />
      </View>
    </View>
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
    paddingHorizontal: hs(15),
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
