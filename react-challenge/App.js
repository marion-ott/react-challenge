import React from 'react';
import { Provider } from 'react-native-paper';
import { theme } from './core/theme';
import LoginScreen from './screens/LoginScreen'
import './core/style.css'

const Main = () => (
  <Provider theme={theme}>
    <LoginScreen />

  </Provider>
);

export default Main;
