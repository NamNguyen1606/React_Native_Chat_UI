import AxiosClient from './axiosClient';
class RoomApi {
  static getRoom = (
    senderId: string,
    recipientId: string,
    isGroup: boolean,
  ) => {
    const url = 'rooms';
    return AxiosClient.post(url, {
      senderId: senderId,
      recipientId: recipientId,
      isGroup: isGroup,
    });
  };
}
export default RoomApi;
