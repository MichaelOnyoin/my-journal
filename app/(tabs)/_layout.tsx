import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
      name="LoginScreen"
      options={{
        title: 'Login',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'log-in' : 'log-in-outline'} color={color} />
        ),
      }}
      />
      <Tabs.Screen
      name="signup"
      options={{
        title: 'Register',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'create' : 'create-outline'} color={color} />
          ),
          }}
      />
      <Tabs.Screen
      name="AddEntry"
      options={{
        title: 'New-Entry',
        tabBarIcon: ({ color, focused }) => (
         <TabBarIcon name={focused ? 'add-circle' : 'add-circle-outline'} color={color} />),
         }}
         />
      <Tabs.Screen
      name="view"
      options={{
        title: 'view',
        tabBarIcon: ({ color, focused }) => (
         <TabBarIcon name={focused ? 'logo-android' : 'logo-android'} color={color} />),
         }}
       />
    </Tabs>
  );
}
