import React from 'react';
import { View, ActivityIndicator, FlatList,ScrollView,Alert,Modal,Button } from 'react-native';
import { Card, Text, Title, Paragraph } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { supabase } from '@/backend/supabase';
import { Input } from '@rneui/themed'


export default function EditData(item: any){
    const { title, content, category } = item;
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedContent, setUpdatedContent] = useState(content);
    const [updatedCategory, setUpdatedCategory] = useState(category)

    
  
    // Create a new state to store the updated values
    ;
  
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
        console.log('Erroring');
      }
      handleUpdate()
    }
    
  
    // Return a modal or a form to edit the journal entry
    return (
      <Modal>
        <View>
          <Text>Edit Journal Entry</Text>
          <Input
            label="Title"
            value={updatedTitle}
            onChangeText={(text:string) => setUpdatedTitle(text)}
          />
          <Input
            label="Content"
            value={updatedContent}
            onChangeText={(text:string) => setUpdatedContent(text)}
          />
          <Input
            label="Category"
            value={updatedCategory}
            onChangeText={(text: string) => setUpdatedCategory(text)}
          />
          <Button title="Update" onPress={()=>handleUpdate()} />
        </View>
      </Modal>
    );
  }


  