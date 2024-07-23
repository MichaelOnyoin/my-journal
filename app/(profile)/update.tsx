import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import { supabase } from '@/backend/supabase'
import { StyleSheet, View, Alert,FlatList,Text,ScrollView } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper';
import { Button, Input } from '@rneui/themed'
import Dataview from './display'
//import DataView from './display'
//import { Edit } from '@mui/icons-material'

export default function Update(){
    // const [title, setTitle] = useState('')
    // const [content, setContent] = useState('')
    // const [category, setCategory] = useState('')
    const [title, setTitle] = useState('');
    const [content, setcontent] = useState('');
    const [category, setcategory] = useState('');
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        async function Sess() {
        const id = await AsyncStorage.getItem('id');
        if (id) getJournal()
        }
        Sess()
      }, [])
        
      async function getJournal() {
        const id = await AsyncStorage.getItem('id');
        try {
          
          setLoading(true)
          if (!id) throw new Error('No id on the session!')
          
          const { data, error, status } = await supabase
            .from('Journals')
            .select(`id,title,content,category`)
            .eq('id', id)
            .single()

          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
            id
            setTitle(data.title)
            setcontent(data.content)
            setcategory(data.category)
            
          }
        } catch (error) {
          if (error instanceof Error) {
            Alert.alert(error.message)
          }
        } finally {
          setLoading(false)
        }
        console.log('Account Journal: '+id)
      }
    


    async function updateJournal({title,content,category}:
                                 {title:string,content:string,category:string}) {
        const id =await AsyncStorage.getItem('id')
       // const item = await AsyncStorage.getItem('item')
       
        try {
          setLoading(true)
          
    
          const { data, error } = await supabase
              .from('Journals')
              .update({
                'title':title,
                'content': content,
                'category': category,
              })
              .eq('id',id)
              .select();
    
          if (error) {
            throw error
          }else{Alert.alert('Journal Updated!')}
          
        } catch (error) {
          if (error instanceof Error) {
            Alert.alert(error.message)
          }
          else{}
          
        } finally {
          setLoading(false)
        }
      }
      return (
        <ScrollView contentContainerStyle={{
          flexGrow: 1,
        }}>
          
        <View style={styles.container}>
          
          <Card style={{ margin: 10 }}>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            
            <Input value={'My Journal'}></Input>
            
          </View>
          <View style={styles.verticallySpaced}>
            <Input label="Title" value={title || ''} onChangeText={(text) => setTitle(text)} />
          </View>
          <View style={styles.verticallySpaced}>
          {/* <Input label="content" value={content}  />  */}
            <Input label="Content" value={content || ''} onChangeText={(text) => setcontent(text)} />
          </View>
          <View style={styles.verticallySpaced}>
            <Input label="Category" value={category || ''}  onChangeText={(text) => setcategory(text)} />
          </View>
          </Card>
          
          <View style={styles.verticallySpaced}>
            <Button title="Update"  onPress={() => updateJournal({title,content,category})} />
          </View>
    
        </View>
        </ScrollView>
    
        
      )



}


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