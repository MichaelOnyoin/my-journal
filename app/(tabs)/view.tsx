import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,StyleSheet,Image } from 'react-native';
import { supabase } from '../../backend/supabase';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function App() {
  const [journals, setjournals] = useState([]);
  const PlaceholderImage = require('../../assets/images/background-image.png');

  useEffect(() => {
    const getjournals = async () => {
      try {
        //const { data: journals, error } = await supabase.from('Credentials').select();
        let { data: journals, error } = await supabase
        .from('journal_entries')
        .select('*')
        if (error) {
          console.error('Error fetching journals:', error.message);
          return;
        }

        if (journals && journals.length > 0) {
          setjournals(journals);
        }
      } catch (error) {
        console.error('Error fetching Credentials:');
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <View>
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
    height: 440,
    borderRadius: 18,
  },
});