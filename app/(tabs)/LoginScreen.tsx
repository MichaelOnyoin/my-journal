import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState , ScrollView, KeyboardAvoidingView, Image} from 'react-native'
import { supabase } from '../../backend/supabase'
import { Button, Input } from '@rneui/themed'
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Layout,
  Text,
  TextInput,
  Button as Button2,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";

import { ThemedView} from '@/components/ThemedView';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  //const [user_id, setUserid] = useState('')
  const [loading, setLoading] = useState(false)
  
  async function signInWithEmail() {
     setLoading(true)
   
    const { data, error } = await supabase
    .from('Users')
    .select('*')
    
    .eq('email',email)
    .single()
    


    if (error) Alert.alert(error.message)
    setLoading(false)
    
    //   //withDelay
     console.log(email)
     
    if(!error) Alert.alert('Successful login!');{
     
        AsyncStorage.setItem('email',email);
        router.replace('../(profile)/Account')
    }
    
   }

  return (
  <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }} >
   <Layout>
    <ScrollView contentContainerStyle={{
            flexGrow: 1,
          }}>
      <ThemedView style={styles.titleContainer} >
      <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              //backgroundColor:  themeColor.white100,
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 220,
                width: 220,
              }}
              source={require("@/assets/images/login.png")}
            />
          </View></ThemedView>
         <View style={styles.container}>
         <View style={[styles.verticallySpaced, styles.mt20]}>
            <Text
              //fontWeight="bold"
              style={{
                alignSelf: "center",
                padding: 20,
              }}
              size="h3"
            >
              Login
            </Text>
      <Input
          label="Username"
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="username"
          autoCapitalize={'none'}
        />
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail() } />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => router.replace('./signup')} />
      </View>
      
    </View>
    
   </ScrollView>
   </Layout>
  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  container: {
    marginTop: 5,
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
