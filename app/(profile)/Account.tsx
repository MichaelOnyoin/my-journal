import { useState, useEffect } from 'react'
import { supabase } from '@/backend/supabase'
import { StyleSheet, View, Alert,FlatList,Text } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper';
import { Button, Input } from '@rneui/themed'
import { Session } from '@supabase/supabase-js'
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Account() {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  //const [email, setEmail] = await AsyncStorage.getItem('email')
  const [password, setPassword] = useState('')

  
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
        .select(`username, email, password`)
        .eq('email', email)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
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
  }: {
    username: string
    //email: string
    password: string
  }) {
    try {
      setLoading(true)
      //if (!email) throw new Error('No user on the session!')
      const email =await AsyncStorage.getItem('email')
      const updates = {
        
        username,
        //email,
        password,
        created_at: new Date(),
      }

      const { error } = await supabase.from('Users').update({ 'username': username }).eq('email',email).select()

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Card style={{ margin: 10 }}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        
        <Input value={'My Profile'}></Input>
        {/* <Input label="Email" placeholder=''  /> */}
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} />
      </View>
      <View style={styles.verticallySpaced}>
      {/* <Input label="email" value={email}  />  */}
        {/* <Input label="email" value={email || ''} onChangeText={(text) => setEmail(text)} /> */}
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Password" value={password || ''} onChangeText={(text) => setPassword(text)} />
      </View>
      </Card>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({ username, password })}
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign Out2"  onPress={() => router.replace('../(tabs)/')} />
      </View>


      {/* <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type='title'>Journal Entries</ThemedText>
      <FlatList
        data={journals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <View>
          <ThemedText type="subtitle">{item.id}</ThemedText>
          <ThemedText type="subtitle">{item.title}</ThemedText>
          <ThemedText type="subtitle">{item.content}</ThemedText>
          <ThemedText type="subtitle">{item.category}</ThemedText> 
        </View>
        )}
        
      />
    </ThemedView> */}
    </View>

    
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
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