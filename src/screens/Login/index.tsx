import {useTheme, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import {Button} from '../../components';
import {vs, hs, ms} from '../../utils/scaling';
import Route from '../../utils/route';

interface Props {}
interface FormInfo {
  email: string;
  password: string;
}
const LoginScreen = () => {
  const [isShowPwd, setIsShowPwd] = useState<boolean>(true);
  const [info, setInfo] = useState<FormInfo>({
    email: '',
    password: '',
  });
  const navigator = useNavigation();
  const {colors} = useTheme();
  //HANDLE FORM
  const handleEmail = (value: string) => setInfo({...info, email: value});
  const handlePassword = (value: string) => setInfo({...info, password: value});
  //FUNCTION
  const showPwd = () => {
    setIsShowPwd(!isShowPwd);
  };

  const onSignUp = () => navigator.navigate(Route.RegisterScreen);

  const onLogin = () => {
    navigator.navigate(Route.HomeScreen);
  };

  return (
    <View style={[style.container, {backgroundColor: 'black'}]}>
      {/* HEADER */}
      <View style={style.header}>
        <View style={style.logoBox}>
          <Text style={style.txtLogoTittle}>PSC</Text>
        </View>
      </View>
      {/* BOTTOM */}
      <View style={style.bottom}>
        {/* <Text style={style.txtTittle}>Login</Text> */}
        <Input
          label="Email"
          labelStyle={style.txtInputLabel}
          placeholder="psc@gmail.com"
          inputStyle={style.txtInput}
          onChangeText={handleEmail}
        />
        <Input
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
        <Button tittle="LOGIN" isLoading={false} onPress={onLogin} />
        <Text style={{marginTop: vs(50), fontSize: ms(14)}}>
          Don't have any account?{' '}
          <Text style={{color: '#049FE3', fontSize: ms(14)}} onPress={onSignUp}>
            {' '}
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: vs(180),
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: hs(50),
    alignItems: 'center',
    paddingHorizontal: hs(20),
    paddingTop: vs(40),
  },
  logoBox: {
    height: ms(65),
    width: ms(65),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: ms(15),
    borderBottomLeftRadius: ms(15),
    borderBottomRightRadius: ms(15),
  },
  txtLogoTittle: {
    color: 'black',
    fontSize: ms(20),
    fontWeight: 'bold',
  },
  txtInputLabel: {color: '#5D5D5D', fontSize: ms(17)},
  txtInput: {color: 'black', fontSize: ms(16)},
});
export default LoginScreen;
