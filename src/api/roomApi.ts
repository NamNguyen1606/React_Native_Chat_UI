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

  static createRoom = (
    userId: string,
    users: string[],
    admins: string[],
    groupName: string,
    groupId: string,
    groupType: string,
  ) => {
    const url = 'rooms/group';
    return AxiosClient.post(url, {
      userId: userId,
      users: users,
      admins: admins,
      groupName: groupName,
      groupId: groupId,
      groupType: groupType,
    });
  };
}
export default RoomApi;
