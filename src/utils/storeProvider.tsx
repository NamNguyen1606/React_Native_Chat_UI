import React, {createContext, useMemo, useState} from 'react';
import io from 'socket.io-client';
export interface StoreProviderInterface {
  id?: Data;
  socket?: Socket;
  darkTheme?: Data;
}

interface Data {
  data: any;
  setData: Function;
}

interface Socket {
  data: SocketIOClient.Socket;
  setData?: Function;
}

export const GlobalContext = createContext<StoreProviderInterface>({});

const StoreProvider = ({children}: any) => {
  const [id, setId] = useState();
  const [socket, setSocket] = useState<SocketIOClient.Socket>(
    io('http://192.168.1.83:5035'),
  );

  const idProvider = useMemo<Data>(
    () => ({
      data: id,
      setData: setId,
    }),
    [id],
  );

  const socketProvider = useMemo<Socket>(
    () => ({
      data: socket,
      setData: setSocket,
    }),
    [socket],
  );

  const store = useMemo<StoreProviderInterface>(
    () => ({
      id: idProvider,
      socket: socketProvider,
    }),
    [idProvider, socketProvider],
  );
  return (
    <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
  );
};

export default StoreProvider;
