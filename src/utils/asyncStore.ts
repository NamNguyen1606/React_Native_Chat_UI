import AsyncStorage from '@react-native-community/async-storage';
import User from '../models/user.model';

class Store {
  static saveUserData = async (value: User) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user_data', jsonValue);
    } catch (err) {
      console.log(err);
    }
  };

  static getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user_data');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (err) {
      console.log(err);
    }
  };
}
export default Store;
