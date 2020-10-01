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

  static createRoom = (ownerId: string, users: string[], groupName: string) => {
    const url = 'rooms/group';
    return AxiosClient.post(url, {
      ownerId: ownerId,
      users: users,
      groupName: groupName,
    });
  };
}
export default RoomApi;
