//  import { useState, useEffect } from 'react'
// import { supabase } from '../../backend/supabase'
// import { Session } from '@supabase/supabase-js'
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';


export default function Layout() {
  
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
          name="JournalEntries" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Summary ',
            //title: 'Summary view',
            drawerIcon: ({color, focused}) => ( <Ionicons name={focused ? 'documents' : 'documents-outline'} color={color} /> ),
            
          }}
        />
        <Drawer.Screen
        name="display" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Journals',
          title: 'View your Journals',
          drawerIcon: ({color, focused}) => ( <Ionicons name={focused ? 'journal' : 'journal-outline'} color={color} /> ),
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
       
        <Drawer.Screen
          name="update" // This is the name of the page and must match the url from root
          options={{
          drawerLabel: 'Updates',
          title: 'Editing Journals',
          drawerIcon: ({color, focused}) => ( <Ionicons name={focused ? 'book' : 'book-outline'} color={color} /> ),
          }} 
          />
          

        
      </Drawer>
      
     </GestureHandlerRootView>
   );
}

