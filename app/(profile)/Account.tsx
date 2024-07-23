import { useState, useEffect } from 'react'
import { supabase } from '@/backend/supabase'
import { StyleSheet, View, Alert,FlatList,Text,ScrollView, Touchable } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper';
import { Button, Input } from '@rneui/themed'

import { router } from 'expo-router';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage'
import  Avatar  from '@/components/Avatar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Account() {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  //const [email, setEmail] = await AsyncStorage.getItem('email')
  const [password, setPassword] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  
  //print()

  //console.log('Account Profile'+email)

  useEffect(() => {
    async function Sess() {
    const email = await AsyncStorage.getItem('email');
    if (email) getProfile()
    }
    Sess()
  }, [])
    
  async function getProfile() {
    const email = await AsyncStorage.getItem('email');
    try {
      
      setLoading(true)
      if (!email) throw new Error('No email on the session!')
      
      const { data, error, status } = await supabase
        .from('Users')
        .select(`username, email, password, avatar_url`)
        .eq('email', email)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
        //setEmail(data.email)
        email
        setPassword(data.password)
        
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
    console.log('Account Profile: '+email)
  }

  async function updateProfile({
    username,
    //email,
    password,
    avatar_url,
  }: {
    username: string
    //email: string
    password: string
    avatar_url: string
  }) {
    try {
      setLoading(true)
      //if (!email) throw new Error('No user on the session!')
      const email =await AsyncStorage.getItem('email')
      const updates = {
        
        username,
        //email,
        password,
        avatar_url,
        created_at: new Date(),
      }

      const { error } = await supabase.from('Users').update({ 'username': username,'password':password,'avatar_url':avatar_url }).eq('email',email).select()
        
      if (error) {
        throw error
      }else{Alert.alert('Profile Updated')}
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }else{ Alert.alert('Profile Updated')}

      //if(!error){Alert.alert('Profile Updated!');}
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={{
      flexGrow: 1,
    }}>
      <View style={styles.header}>
        <View>
         <Avatar
            size={200}
            url={avatarUrl}
            
            onUpload={(url: string) => {
              setAvatarUrl(url)
              updateProfile({ username, password, avatar_url: url })
            }}
          />
      
        </View>

      </View>
    <View style={styles.container}>
      
      <Card style={{ margin: 10 }}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        
        <Input value={'My Profile'}></Input>
        {/* <Input label="Email" placeholder={email}  /> */}
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} />
      </View>
      <View style={styles.verticallySpaced}>
      
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Password" value={password || ''}  onChangeText={(text) => setPassword(text)} />
      </View>
      
      </Card>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({ username, password,avatar_url: avatarUrl })}
          disabled={loading}
        />
      </View>

      {/* <View style={styles.verticallySpaced}>
        <Button title="Sign Out" style={styles.btn} onPress={() => supabase.auth.refreshSession()} />
      </View> */}
      <View style={styles.verticallySpaced}>
        <TouchableOpacity onPress={() => router.replace('../(tabs)/')}>Sign Out</TouchableOpacity>
        {/* <Button title="Sign Out"  onPress={() => router.replace('../(tabs)/')} /> */}
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