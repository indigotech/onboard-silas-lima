/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import { LoginPage } from './pages/login-page.tsx';
import { UsersPage } from './pages/users-page.tsx';
import { AddUserPage } from './pages/add-user-page.tsx'

Navigation.registerComponent('loginPage', () => LoginPage);
Navigation.registerComponent('usersPage', () => UsersPage);
Navigation.registerComponent('addUserPage', () => AddUserPage);


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
