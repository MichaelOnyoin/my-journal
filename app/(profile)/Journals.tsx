import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import React, { useState, useEffect } from 'react';
import { Image, View, FlatList, StyleSheet } from 'react-native';
import { supabase } from '../../backend/supabase';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Session } from '@supabase/supabase-js'
import { Card, Text, Title, Paragraph } from 'react-native-paper';
import { Input } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage'

const PlaceholderImage = require('@/assets/images/partial-react-logo.png')

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
      <View>
        <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={{
        width: 100,
        height: 100,
        borderRadius: 18,}} />
        
      </View>
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type='title'>Journal Entries</ThemedText>
      <FlatList
        data={journals}
        
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ margin: 10 }}>
          <Card.Content>
            <Title>{item.title}</Title>
            <Paragraph>Category: {item.category}</Paragraph>
            <Paragraph>Content: {item.content}</Paragraph>
            
          </Card.Content>
        </Card>
        
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
    paddingTop: 18,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 18,
  },
});