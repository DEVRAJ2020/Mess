/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import App from './App';
import Splash from './src/Splash';

AppRegistry.registerComponent(appName, () => Splash);
