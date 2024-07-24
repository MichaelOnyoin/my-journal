import React from 'react';
import { View, ActivityIndicator, FlatList,Alert, StyleSheet,AppState } from 'react-native';
import { Card, Text, Title, Paragraph} from 'react-native-paper';
import { useFetchData } from './useFetchData';
import { ThemedView } from '@/components/ThemedView';
import {ThemedText} from '@/components/ThemedText'
import { Input, Button } from '@rneui/themed'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { supabase } from '@/backend/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { router } from 'expo-router';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})


const DataView = () => {
  
  const { data, loading } = useFetchData();
  if (loading) return <ActivityIndicator animating={true} size="large" />;
 
  
 
  async function DelData(item:any){
    //AsyncStorage.setItem('id',item.id);
    try{
    const {data, error } = await supabase
    .from('Journals')
    .delete()
    .eq('id', item.id.toString())
    .single()
  
    if (error) {
      console.log(error.message)
      }
      else{
        Alert.alert(
          
          "Journal Entry Deleted ",
        );
       if (!loading) return useFetchData()
      }
    }catch(error){console.log('Errored');}  

  }

  async function Editer(item:any){
    //const { title, content, category }=item
    AsyncStorage.setItem('id',item.id.toString());
    //AsyncStorage.setItem('item',item);
    router.push('/update')
  
  }

  return (
    
    <ThemedView>
      
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      
      renderItem={({ item }) => (

        <Card style={{ margin: 10 }}>
         <Card.Content>
          
          <ThemedText>                                                                        {item.id}</ThemedText>
          <ThemedText type="title"><Title>{item.title}</Title></ThemedText>
          <ThemedText type="subtitle"><Paragraph>Content: {item.content}</Paragraph></ThemedText>
          <ThemedText type="subtitle"><Paragraph>Category: {item.category}</Paragraph></ThemedText>
          <ThemedText type="subtitle"><Paragraph>Date: {item.date}</Paragraph></ThemedText>
          </Card.Content>
          <Card.Actions>
            <Ionicons
              name="create"
              size={30}
              
              onPress={() =>router.push('/addJournal')}
              color='green'
              
              />
            <Ionicons
              name="pencil-sharp"
              size={30}
              onPress={() => Editer(item)}
              color="blue"
              />

            <Ionicons
              name="trash"
              size={30}
              onPress={() =>DelData(item)}
              color='red'
              
              />
              
              
          
          </Card.Actions>
          
         </Card>
         
      )}
    />
    </ThemedView>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    
  },
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  btn:{
    borderRadius:30,
  }
})

export default DataView;
