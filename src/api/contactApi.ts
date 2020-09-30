import AxiosClient from './axiosClient';

class ContactApi {
  static getRooms = (token: any) => {
    const url = 'contact/rooms';
    return AxiosClient.get(url, {headers: {token: token}});
  };

  static getFriends = (token: any) => {
    const url = 'contact/friends';
    return AxiosClient.get(url, {headers: {token: token}});
  };
}

export default ContactApi;
