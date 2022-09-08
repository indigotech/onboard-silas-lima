/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import App from './app.tsx';
import BlankPage from './blank-page.tsx';

Navigation.registerComponent('loginScreen', () => App);
Navigation.registerComponent('blankPage', () => BlankPage)

Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
           {
             component: {
               name: 'loginScreen'
             }
           }
         ]
       }
     }
  });
});

