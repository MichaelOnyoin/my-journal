import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
//import Profile from './_layout';
import React, { useState, useEffect } from 'react';
import { Image, View, Text, FlatList, StyleSheet } from 'react-native';
import { supabase } from '../../backend/supabase';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Session } from '@supabase/supabase-js'
import getProfile from '../(tabs)/LoginScreen'
import { Input } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage'

const PlaceholderImage = require('../../assets/images/background-image.png');

export default function App({ session }: { session: Session }) {
  const [journals, setjournals] = useState([]);
  //const [loading, setLoading] = useState(true);
   //const [user_id, setUserid] = useState(null);
 // const [user_id,setUserid]=useState('')
   const Profile = async () => {
    
    const email = await AsyncStorage.getItem('email');
    
    //console.log('Journals email')
    console.log(email); // Output: johnDoe, johndoe@example.com
  };
  Profile()

  useEffect(() => {
    const getjournals = async () => {
      try {
       
        const email = await AsyncStorage.getItem('email');
        
        let { data: journals, error } = await supabase
        .from('Journals')
        .select('*')
        .eq('user_email', email)
        if (error) {
          console.error('Error fetching journals:', error.message);
          return;
        }

        if (journals && journals.length > 0) {
          setjournals(journals);
        }
      } catch (error) {
        console.error('Error fetching Journal Entries');
      }
    };

    getjournals();
    
  }, []);

  return (
    <SafeAreaProvider>
      <View
      style={styles.container}>
        <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
        
      </View>
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type='title'>Journal Entries</ThemedText>
      <FlatList
        data={journals}
        
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <View>
          <Text>{item.id}</Text>
          <Text>{item.title}</Text>
          <Text>{item.content}</Text>
          <Text>{item.category}</Text> 
        </View>
        )}
        
      />
    </ThemedView>
    </View>
  </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 340,
    borderRadius: 18,
  },
});