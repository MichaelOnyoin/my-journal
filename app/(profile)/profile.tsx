import React , { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity,ActivityIndicator, FlatList} from 'react-native'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { supabase } from '../../backend/supabase';
import { router } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Session } from '@supabase/supabase-js'
import { Card,Title, Paragraph, Button } from 'react-native-paper';
import { Input } from '@rneui/themed';
//import {}
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Profile(){
    const [prof, setprof] = useState([]);
    
  
    useEffect(() => {
      const getprof = async () => {
        try {
         
          const email = await AsyncStorage.getItem('email');
          
          let { data: prof, error } = await supabase
          .from('Users')
          .select('*')
          .eq('email', email)
          if (error) {
            console.error('Error fetching prof:', error.message);
            return;
          }
  
          if (prof && prof.length > 0) {
            setprof(prof);
          }
        } catch (error) {
          console.error('Error fetching Journal Entries');
        }
      };
  
      getprof();
      
    }, []);
  
  return (
    <View >
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
        <FlatList
           data={prof}
           keyExtractor={(item) => item.id}
           renderItem={({ item }) => (
          <ThemedView style={{ flex: 1, justifyContent: 'center' }}>
          <Card style={{ margin: 10 }}>
          <Card.Content>
          <ThemedText type='title'><Title>User ID:{item.id}</Title></ThemedText>
          <ThemedText type='subtitle'><Paragraph>Username: {item.username}</Paragraph></ThemedText>
          <ThemedText type='subtitle'><Paragraph>Email: {item.email}</Paragraph></ThemedText>
            
          </Card.Content>
        </Card>
        </ThemedView>
      )}
    />

          <TouchableOpacity style={styles.buttonContainer}>
            <Text>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text><Button onPress={() => router.replace('/')}>Sign Out</Button></Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
})