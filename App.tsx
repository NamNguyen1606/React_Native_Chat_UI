import React, {useState, useMemo} from 'react';
import MainStack from './src/routes/mainStack';
import {NavigationContainer} from '@react-navigation/native';
import {MyDefaultTheme, MyDarkTheme} from './src/utils/theme';
import StoreProvider from './src/utils/storeProvider';

interface ThemeData {
  isDarkMode: boolean;
  setIsDarkMode: Function;
}
export const ThemeContext = React.createContext<ThemeData>(null);

const App = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const themeProvider = useMemo(
    (): ThemeData => ({
      isDarkMode: isDark,
      setIsDarkMode: setIsDark,
    }),
    [isDark],
  );
  return (
    <ThemeContext.Provider value={themeProvider}>
      <StoreProvider>
        <NavigationContainer theme={isDark ? MyDarkTheme : MyDefaultTheme}>
          <MainStack />
        </NavigationContainer>
      </StoreProvider>
    </ThemeContext.Provider>
  );
};
export default App;
