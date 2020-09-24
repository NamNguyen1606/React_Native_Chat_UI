import AxiosClient from './axiosClient';
export default class MessageApi {
  static getMessagesById = (roomId: string) => {
    return AxiosClient.post('messages/data', {roomId: roomId});
  };

  static sendMessage = async (
    roomId: string,
    senderId: string,
    message: string,
    isRead: boolean,
  ) => {
    return AxiosClient.post('messages', {
      roomId: roomId,
      senderId: senderId,
      message: message,
      isRead: isRead,
    });
  };

  static search = (searchKey: string) => {
    const url = 'messages/search';
    return AxiosClient.post(url, {searchKey: searchKey});
  };
}
