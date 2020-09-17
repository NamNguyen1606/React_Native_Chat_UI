import {DarkTheme, DefaultTheme} from '@react-navigation/native';

export interface Color {
  text: string;
  subText: string;
  background: string;
  senderBubble: string;
  ReceiverBubble: string;
  icon: string;
  primary: string;
  card: string;
  border: string;
  notification: string;
}
export interface Theme {
  dark: boolean;
  colors: Color;
}
export const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'black',
    subText: '#FBFDFE',
    ReceiverBubble: '',
    senderBubble: '',
    icon: 'blue',
  },
};
export const MyDefaultTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    text: 'white',
    subText: '#9B9C9D',
    ReceiverBubble: '',
    senderBubble: '',
    icon: '',
  },
};
