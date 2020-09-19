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
    background: '#19191B',
    text: '#E2E2E4',
    border: '#252527',
    card: '#2B2B33',
    subText: 'white',
    ReceiverBubble: '#2B343B',
    senderBubble: '#1E2225',
    icon: 'blue',
  },
};
export const MyDefaultTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    text: 'black',
    border: '#9B9C9D',
    card: '#F1F1F3',
    subText: '#9B9C9D',
    ReceiverBubble: '#F2F6F9',
    senderBubble: '#DCF4FE',
    icon: '',
  },
};
