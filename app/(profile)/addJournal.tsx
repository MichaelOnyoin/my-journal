import React, { useState } from 'react';
//import { Button, Input } from '@rneui/themed'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, TextInput} from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
import { Alert, StyleSheet, AppState } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Image} from 'react-native';
import { supabase } from '../../backend/supabase'
import { ThemedText, ThemedTextProps } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button, Input } from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function addJournalScreen(){
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    //const [date, setDate] = useState('')
    //const [image, setImage] = useState('')
    //category
    const [category, setCategory] = useState('')

    async function addJournal() {
        setLoading(true)
        const email = await AsyncStorage.getItem('email');
        const { data, error } = await supabase.from('Journals')
        .insert([ 
            {title: title, category:category,content: content, user_email: email}
            ])
        .select()
        .single()
        if (error) { 
            console.log(error)
            } else {
                console.log(data) 
                Alert.alert('New Journal Added')
                }
        
        
    }

    return(
        <SafeAreaProvider>
            <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
              <Image
                source={require('@/assets/images/partial-react-logo.png')}
                style={{ width: 100, height: 100 }}
              />
            }
            >
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
       {/* <Input 
       label="Date"
       placeholder="Date" value={''} onChangeText={(text) => setDate(text)}/> */}
      <Button title="Add"  onPress={addJournal}
       style={{borderRadius:12}}
       />
      </View>
      </View>
    </ThemedView>
    </ParallaxScrollView>    

        </SafeAreaProvider>
    )





}

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