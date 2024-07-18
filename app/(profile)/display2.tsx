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
//import AsyncStorage from '@react-native-async-storage/async-storage'
import { Input } from '@rneui/themed'

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
              name="pencil-sharp"
              size={30}
              //title={uploading ? 'Uploading ...' : 'Uploaded'}
              onPress={() =>EditData(item)}
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
           
         </Card>
         
      )}
    />
    </ThemedView>
  );
};
 
async function EditData(item: any) {
    const { title, content, category } = item;
  
    // Create a new state to store the updated values
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedContent, setUpdatedContent] = useState(content);
    const [updatedCategory, setUpdatedCategory] = useState(category);
  
    // Create a function to handle the update
    async function handleUpdate() {
      try {
        const { data, error } = await supabase
          .from('Journals')
          .update({
            title: updatedTitle,
            content: updatedContent,
            category: updatedCategory,
          });
  
        if (error) {
          console.log(error.message);
        } else {
          Alert.alert("Update Successful", "Journal entry updated successfully");
          // Refresh the data
          // fetchData(); // Call the fetchData function to refresh the data
        }
      } catch (error) {
        //console.log(error.message);
      }
    }
  
    // Return a modal or a form to edit the journal entry
    return (
      <Modal>
        <View>
          <Text>Edit Journal Entry</Text>
          <Input
            label="Title"
            value={updatedTitle}
            onChangeText={(text) => setUpdatedTitle(text)}
          />
          <Input
            label="Content"
            value={updatedContent}
            onChangeText={(text) => setUpdatedContent(text)}
          />
          <Input
            label="Category"
            value={updatedCategory}
            onChangeText={(text) => setUpdatedCategory(text)}
          />
          <Button title="Update" onPress={handleUpdate} />
        </View>
      </Modal>
    );
  }


export default DataView;

