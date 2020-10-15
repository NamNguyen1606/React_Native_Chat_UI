import User from '../models/user.model';
import AxiosClient from './axiosClient';
import axios, {CancelTokenSource} from 'axios';
class UserApi {
  // static register = (user: User) => {
  //   const url = 'users/register';
  //   return AxiosClient.post(url, {
  //     fullName: user.fullName,
  //     email: user.email,
  //     isActive: user.isActive || false,
  //     phone: user.phone || '',
  //     avatar: user.avatar,
  //   });
  // };

  static login = (email: string) => {
    const url = 'users/login';
    return AxiosClient.post(url, {
      email: email,
    });
  };

  static createSearchRequest = () => {
    let call: CancelTokenSource;
    return (search: string, userId: string) => {
      if (call) {
        call.cancel('CANCEL REQUEST');
      }
      const url = 'users/search';
      call = axios.CancelToken.source();
      return AxiosClient.post(
        url,
        {searchKey: search, userId: userId},
        {cancelToken: call.token},
      );
    };
  };
}

export default UserApi;
