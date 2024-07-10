import { MenuProvider } from 'react-native-popup-menu';
import {MenuComponent} from '@/components/PopupMenu'
export const App = () => (
  <MenuProvider>
    <MenuComponent />
  </MenuProvider>
);