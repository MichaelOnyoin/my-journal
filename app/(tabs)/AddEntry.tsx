import React, { useState } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, TextInput} from 'react-native';

import { Alert, StyleSheet, AppState } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Image} from 'react-native';
import { supabase } from '../../backend/supabase'
import { ThemedText, ThemedTextProps } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button, Input } from '@rneui/themed'

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function AddEntryScreen  ()  {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false)
  

  async function addEntry(){
    setLoading(true)
    const { data, error } = await supabase
    .from('journal_entries')
    .insert([
    { title: title, content: content, category:category },
  ])
  .select()

  if (error) Alert.alert(error.message)
    setLoading(false)
  if (data) Alert.alert('New Journal Entry Added!')
    setLoading(false)
  if (title == '' || content == '' || category == '') {
      Alert.alert( 
        'Error',
        'Please fill in all fields',
        [
          {text: 'OK', onPress: () => {}}
          ]
          );
  }
  
}
        
  return (
    <SafeAreaProvider>
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={{ width: 100, height: 100 }}
        />
      }>
    
    <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}} >
      <ThemedText type="title">Add Journal Entry</ThemedText>
      <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
      <Input 
      label="Title"
      placeholder="Title" value={title} onChangeText={(text) => setTitle(text)} 
      />
      <Input 
      label="Content"
      placeholder="Content" value={content} onChangeText={(text) => setContent(text)}
      autoCapitalize={'none'} 
      />
      <Input label="Category"
      placeholder="Category" value={category} onChangeText={(text) => setCategory(text)}
      autoCapitalize={'none'}
       />
      <Button title="Add" onPress={addEntry}
      
       />
      </View>
      </View>
    </ThemedView>
    </ParallaxScrollView>
    </SafeAreaProvider>
  );
};



const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    width:400,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})
