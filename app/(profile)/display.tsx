import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, FlatList,Alert } from 'react-native';
import { Card, Text, Title, Paragraph } from 'react-native-paper';
import { useFetchData } from './useFetchData';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { supabase } from '../../backend/supabase'
import { Button, Input } from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'


const DataView = () => {
  const { data, loading } = useFetchData();
  //const{del, error}= useState([])
  if (loading) return <ActivityIndicator animating={true} size="large" />;
  //if (error) {error.message}</Text>;
  const [load, setLoad] = useState(false)

  async function Del(){
    setLoad(true)
    if (load) return <ActivityIndicator animating={true} size="large" />;
    try{
    const email = await AsyncStorage.getItem('email');
    const {error } = await supabase
    .from('Journals')
    .delete()
    .eq('email',email)
    // .insert([
    // { username:username, email: email, password: password,  },
    // ])
    // .select()

    if (error) Alert.alert(error.message)
    if (!error) Alert.alert('Journal Deleted!')
    setLoad(false)
  }catch(error){console.error('Error in deletion')}
  }

  




  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ThemedView
         style={{ flex: 1, justifyContent: 'center' }}
        >
        <Card style={{ margin: 10 }}>
          <Card.Content>
          <ThemedText type='title'><Title>{item.title}</Title></ThemedText>
          <ThemedText type='subtitle'><Paragraph>Category: {item.category}</Paragraph></ThemedText>
          <ThemedText type='subtitle'><Paragraph>Content: {item.content}</Paragraph></ThemedText>
          <ThemedText type='subtitle'><Paragraph>Created on: {item.date}</Paragraph></ThemedText>
          </Card.Content>
            <Button style={{ backgroundColor:'#ff0000',height:10,width:15}} onPress={()=>Del() }>Delete</Button>
        </Card>
        </ThemedView>
      )}
    />
  );

async function Edit(){
    setLoad(true)
    if (load) return <ActivityIndicator animating={true} size="large" />;
    try{
    const email = await AsyncStorage.getItem('email');
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('')

    const {data,error } = await supabase
    .from('Journals')
    .update({'title':title,'category':category,'content':content})
    .eq('email',email)
    .select()
    
    if (error) Alert.alert(error.message)
    if (!error) Alert.alert('Journal Deleted!')
    setLoad(false)
  }catch(error){console.error('Error in deletion')}
  }




};

export default DataView;
