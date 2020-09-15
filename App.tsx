import React from 'react';
import MainStack from './src/routes/mainStack';
import {NavigationContainer} from '@react-navigation/native';
import StoreProvider from './src/utils/storeProvider';
interface Props {}

const App = () => {
  return (
    <StoreProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </StoreProvider>
  );
};
export default App;
