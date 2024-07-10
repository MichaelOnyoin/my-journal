import { useState, useEffect } from 'react'
import { supabase } from '../backend/supabase'
import { StyleSheet, View, Alert,FlatList,Text } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { Session } from '@supabase/supabase-js'
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  

  useEffect(() => {
    if (session) getProfile()
  }, [session])
   
  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')
      
        const email = await AsyncStorage.getItem('email');
  

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
        setEmail(data.email)
        setPassword(data.password)
        
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    email,
    password,
  }: {
    username: string
    email: string
    password: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        
        username,
        email,
        password,
        created_at: new Date(),
      }

      const { error } = await supabase.from('Users').upsert(updates)

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
      <View style={[styles.verticallySpaced, styles.mt20]}>
        
        <Input value={session?.user?.email}></Input>
        <Input label="Email" placeholder='hello'  />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="email" value={email || ''} onChangeText={(text) => setEmail(text)} />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({ username, email, password })}
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up"  onPress={() => router.replace('../(tabs)index')} />
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