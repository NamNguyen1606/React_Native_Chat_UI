import AxiosClient from './axiosClient';
export default class MessageApi {
  static getMessages = () => {
    return AxiosClient.get('messages');
  };

  static postMessage = async (message: string) => {
    return AxiosClient.post('messages', {msg: message});
  };
}
