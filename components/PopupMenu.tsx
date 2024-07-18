import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
  // import { useState, useEffect } from 'react';
  // import { supabase } from '../backend/supabase';
  // import AsyncStorage from '@react-native-async-storage/async-storage'

import {View,Text,ScrollView} from 'react-native'
  export const MenuComponent = () => (
    //const [del, setData] = useState('');

    // useEffect(() => {
    //   const DelData = async () => {
    //     const email = await AsyncStorage.getItem('email');
    //     try{
    //     const { del, error } = await supabase.from('Journals')
    //     .delete()
    //     .eq('id',item.id)
    //     .single();

    //     if (!error) {
    //       console.error('Journal deleted:', error.message);
    //         return;
    //     }
    //      }catch (error) {
    //     console.error('Error fetching Journal Entries');
    //     }
    //   };
    //    DelData();
    //   },  [])
    
    // )   ;
    <ScrollView>
    <View>
      
      <Menu>
        <MenuTrigger text= '...' style={{alignContent:'stretch'}} />
        <MenuOptions>
          <MenuOption onSelect={() => alert(`Update`)} text='Save' />
          <MenuOption onSelect={() => alert(`Delete`)} >
            <Text style={{color: 'red'}}>Delete</Text>
          </MenuOption>
          <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
          </MenuOptions>
      </Menu>
    </View>
    </ScrollView>
  );