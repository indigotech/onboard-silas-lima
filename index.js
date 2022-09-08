/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import { LoginPage } from './pages/login-page.tsx';
import { BlankPage } from './pages/blank-page.tsx';

Navigation.registerComponent('loginPage', () => LoginPage);
Navigation.registerComponent('blankPage', () => BlankPage);

Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
           {
             component: {
               name: 'loginPage'
             }
           }
         ]
       }
     }
  });
});
