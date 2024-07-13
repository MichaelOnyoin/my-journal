import React from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { Card, Text, Title, Paragraph } from 'react-native-paper';
import { useFetchData } from './useFetchData';
import { ThemedView } from '@/components/ThemedView';
import ThemedCard from '@rneui/themed/dist/Card';
import {ThemedText} from '@/components/ThemedText'
import { MenuProvider } from 'react-native-popup-menu';
import {MenuComponent} from '@/components/PopupMenu'

const DataView = () => {
  const { data, loading } = useFetchData();

  if (loading) return <ActivityIndicator animating={true} size="large" />;
  //if (error) return <Text>Error fetching data: {error.message}</Text>;

  return (
    <ThemedView>
      <MenuProvider>
            <MenuComponent/>
          </MenuProvider>
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (

        <Card style={{ margin: 10 }}>
         <Card.Content>
          
          <ThemedText type="title"><Title>Title: {item.title}</Title></ThemedText>
          <ThemedText type="subtitle"><Paragraph>Content: {item.content}</Paragraph></ThemedText>
          <ThemedText type="subtitle"><Paragraph>Category: {item.category}</Paragraph></ThemedText>
          <ThemedText type="subtitle"><Paragraph>Date: {item.date}</Paragraph></ThemedText>
          </Card.Content>
          
         </Card>
      )}
    />
    </ThemedView>
  );
};

export default DataView;
