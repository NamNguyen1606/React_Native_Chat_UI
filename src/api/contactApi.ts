import AxiosClient from './axiosClient';

class ContactApi {
  static getRooms = (userId: any) => {
    const url = 'contact/rooms';
    return AxiosClient.post(url, {userId: userId});
  };

  static getFriends = (userId: any) => {
    const url = 'contact/friends';
    return AxiosClient.post(url, {userId: userId});
  };

  static checkFriendExist = (userId: string, friendId: string) => {
    const url = 'contact/checkFriendExist';
    return AxiosClient.post(url, {friendId: friendId, userId: userId});
  };

  static addFriend = (userId: string, recipientId: string) => {
    const url = 'contact/friends/addFriend';
    return AxiosClient.post(url, {recipientId: recipientId, userId: userId});
  };
}

export default ContactApi;
