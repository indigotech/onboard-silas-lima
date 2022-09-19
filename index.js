/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import { LoginPage } from './pages/login-page.tsx';
import { UsersPage } from './pages/users-page.tsx';
import { UserDetailPage } from './pages/user-detail-page.tsx';
import { AddUserPage } from './pages/add-user-page.tsx'

Navigation.registerComponent('loginPage', () => LoginPage);
Navigation.registerComponent('usersPage', () => UsersPage);
Navigation.registerComponent('userDetailPage', () => UserDetailPage);
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
