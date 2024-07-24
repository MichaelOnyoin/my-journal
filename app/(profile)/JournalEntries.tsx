import React, { useEffect, useState } from 'react';
//import SummaryView from './Summary';
import { supabase } from '@/backend/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert,View, Text,StyleSheet, FlatList } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { Card, Title, Paragraph} from 'react-native-paper';

import { ThemedView } from '@/components/ThemedView';
import {ThemedText} from '@/components/ThemedText'

// interface JournalEntriesProps {
//   //journalEntries: any[];
// }

const JournalEntries = () => {
    const [journalEntries, setJournalEntries] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState('%2024-06-11%');
  
    useEffect(() => {
      const fetchJournalEntries = async () => {
        const email = await AsyncStorage.getItem('email');
        try{
        let {data:journalEntries, error }= await supabase.from('Journals')
        .select('*')
        .eq('user_email',email)
        .order('date', { ascending: true })
        //.gt('date','%2024-07-01%')
        .gt('date',selectedPeriod)
        
        setJournalEntries(journalEntries);

        if (error) {
            console.error('Error fetching journals:', error.message);
              return;
          }else{
           // Alert.alert('Success')
        }

        }
        catch(error)
        {console.error('Error fetching Journal Entries');}
      };
      
      fetchJournalEntries();
    }, []);
  
    const handlePeriodChange = (itemValue: string) => {
        setSelectedPeriod(itemValue);
      };
    

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Journal Entries</Text>
      <Picker
        selectedValue={selectedPeriod}
        //selectedValue={value}
        onValueChange={handlePeriodChange}
      >
       <Picker.Item label="Daily"  value={('%2024-07-21%')} />
       <Picker.Item label="Weekly" value={"%2024-07-10%"} />
       <Picker.Item label="Monthly" value={"%2024-06-01%"} />
      </Picker>
      
      <ThemedView>
      
    <FlatList
      data={journalEntries}
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
          
         </Card>
         
      )}
    />
    </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    header: {
      fontSize: 24,
      marginBottom: 10,
    },
  });

export default JournalEntries;