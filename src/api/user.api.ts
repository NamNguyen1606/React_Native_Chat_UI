import User from '../models/user.model';
import AxiosClient from './axiosClient';
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
}

export default UserApi;
