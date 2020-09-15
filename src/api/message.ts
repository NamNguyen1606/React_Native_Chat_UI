import AxiosClient from './axiosClient';
export default class MessageApi {
  static getMessages = () => {
    const res = AxiosClient.get('messages');
    return res;
  };

  static postMessage = (message: string) => {
    const res = AxiosClient.post('messages', {msg: message});
    return res;
  };
}
