import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState,ScrollView, KeyboardAvoidingView, Image,Text } from 'react-native'
import { supabase } from '../../backend/supabase'
import { Button, Input } from '@rneui/themed'
import { ThemedView } from '@/components/ThemedView'
//import {Button as Button2} from 'react-native-rapi-ui'


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
  const [loading, setLoading] = useState(false)

  

  async function signUpWithEmail() {
    setLoading(true)
    
    const { data, error } = await supabase
    .from('Users')
    .insert([
    { username:username, email: email, password: password,  },
    ])
    .select()

    if (error) Alert.alert(error.message)
    if (data) Alert.alert('You have been registered/ Now Please login!')
    setLoading(false)
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }} >
   
    <ScrollView contentContainerStyle={{
            flexGrow: 1,
          }}>
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
                borderTopLeftRadius:15,
                borderTopRightRadius:15,
              }}
              source={require("@/assets/images/register.png")}
            />
          </View>
    <ThemedView style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
      <Text
              
              style={{
                alignSelf: "center",
                padding: 20,
                fontSize:30,
              }}
              
            >
              Sign Up
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
      
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} style={styles.btn} onPress={() => signUpWithEmail()} />
      </View>
    </ThemedView>
    
    </ScrollView>
    </KeyboardAvoidingView>
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
  btn:{
    borderRadius:10,
  }
})