 import { useState, useEffect } from 'react'
import { supabase } from '../../backend/supabase'
import { Session } from '@supabase/supabase-js'
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { StyleSheet, View, Alert } from 'react-native'
import { Button, Input } from '@rneui/themed'

export default function Layout() {
  const [session, setSession] = useState<Session | null>(null)
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  //console.log(session)


  const Profile = async () => {
    //const username = await AsyncStorage.getItem('username');
    const email = await AsyncStorage.getItem('email');
    console.log('Layout email')
    console.log(email); // Output: johnDoe, johndoe@example.com
  };
  
  //console.log(Profile())

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      
      <Drawer>
        <Drawer.Screen
          name="Account" // This is the name of the page and must match the url from root
          
          options={{
            drawerLabel: 'My Profile',
            title: 'overview',
            drawerIcon: ({color, focused}) => ( <Ionicons name={focused ? 'person' : 'person-outline'} color={color} /> ),
          }}
        />
        <Drawer.Screen
          name="Journals" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'My Journal',
            title: 'overview',
            drawerIcon: ({color, focused}) => ( <Ionicons name={focused ? 'journal' : 'journal'} color={color} /> ),
            
          }}
        />
        <Drawer.Screen
        name="display" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Display',
          title: 'overview',
          drawerIcon: ({color, focused}) => ( <Ionicons name={focused ? 'document' : 'document-attach'} color={color} /> ),
          }}
          />
          <Drawer.Screen
          name="addJournal" // This is the name of the page and must match the url from root
          options={{
          drawerLabel: 'Add Journal',
          title: 'New Entries',
          drawerIcon: ({color, focused}) => ( <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} color={color} /> ),
          }}
          />

        
      </Drawer>
      
     </GestureHandlerRootView>
   );
}

