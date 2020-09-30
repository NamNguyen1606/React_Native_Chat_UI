import User from '../models/user.model';
import AxiosClient from './axiosClient';
import axios, {CancelTokenSource} from 'axios';
class UserApi {
  static register = (user: User) => {
    const url = 'users/register';
    return AxiosClient.post(url, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      isActive: user.isActive || false,
      phone: user.phone || '',
      avatar: user.avatar,
    });
  };

  static login = (email: string, password: string) => {
    const url = 'users/login';
    return AxiosClient.post(url, {
      email: email,
      password: password,
    });
  };

  static search = (search: string) => {
    const url = 'users/search';
    return AxiosClient.post(url, {searchKey: search});
  };

  static createSearchRequest = () => {
    let call: CancelTokenSource;
    return (search: string) => {
      if (call) {
        call.cancel('CANCEL REQUEST');
      }
      const url = 'users/search';
      call = axios.CancelToken.source();
      return AxiosClient.post(
        url,
        {searchKey: search},
        {cancelToken: call.token},
      );
    };
  };
}

export default UserApi;
