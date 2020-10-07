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

  static checkFriendExist = (token: string, friendId: string) => {
    const url = 'contact/checkFriendExist';
    return AxiosClient.post(
      url,
      {friendId: friendId},
      {headers: {token: token}},
    );
  };

  static addFriend = (token: string, recipientId: string) => {
    const url = 'contact/friends';
    return AxiosClient.post(
      url,
      {recipientId: recipientId},
      {headers: {token: token}},
    );
  };
}

export default ContactApi;
