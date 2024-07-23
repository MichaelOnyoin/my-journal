import React from 'react';
import { View, ActivityIndicator, FlatList,Alert,Modal,Button } from 'react-native';
import { Card, Text, Title, Paragraph } from 'react-native-paper';
import { useFetchData } from './useFetchData';
import { ThemedView } from '@/components/ThemedView';
import ThemedCard from '@rneui/themed/dist/Card';
import {ThemedText} from '@/components/ThemedText'

import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { supabase } from '@/backend/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Input } from '@rneui/themed'
import { CardMedia } from '@mui/material';

const DataView = () => {
 
  const { data, loading } = useFetchData();
  if (loading) return <ActivityIndicator animating={true} size="large" />;
  
  

  async function DelData(item:any){
    try{
    const {data, error } = await supabase
    .from('Journals')
    .delete()
    .eq('id', item.id)
    .single()
    

    if (error) {
      console.log(error.message)
      }
      else{
        Alert.alert(
          
          "Journal Entry Deleted ",
        );
        //console.log(data.id);
      }
    }catch(error){console.log('Errored');}  
  }

  return (
    
    <ThemedView>
      
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      
      renderItem={({ item }) => (
        <ThemedCard>
        <Card style={{ margin: 10 }}>
         <Card.Content>
          {/* <MenuProvider><ScrollView><MenuComponent/> </ScrollView> </MenuProvider> */}
          <ThemedText>                                                                       {item.id}</ThemedText>
          <ThemedText type="title"><Title>{item.title}</Title></ThemedText>
          <ThemedText type="subtitle"><Paragraph>Content: {item.content}</Paragraph></ThemedText>
          <ThemedText type="subtitle"><Paragraph>Category: {item.category}</Paragraph></ThemedText>
          <ThemedText type="subtitle"><Paragraph>Date: {item.date}</Paragraph></ThemedText>
          </Card.Content>
          
            {/* <CardMedia>
              <Image source={{ uri: item.image }} style={{ height: 200, width:
              200 }} />
            </CardMedia> */}
          <Card.Actions>
            <Ionicons
              name="create-sharp"
              size={30}
              //title={uploading ? 'Uploading ...' : 'Uploaded'}
              //onPress={() =>DelData()}
              color='green'
              
              />
          <Ionicons
              name="archive-sharp"
              size={30}
              //title={uploading ? 'Uploading ...' : 'Uploaded'}
              onPress={() =>DelData(item)}
              color='red'
              
              />
              
          
          </Card.Actions>
            {/* <Dropdown/> */}
          {/* <IconMenu/> */}
         </Card>
         </ThemedCard>
      )}
    />

    </ThemedView>
    

    
  );
};

export default DataView;

