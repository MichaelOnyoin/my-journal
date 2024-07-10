import React from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { Card, Text, Title, Paragraph } from 'react-native-paper';
import { useFetchData } from './useFetchData';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const DataView = () => {
  const { data, loading } = useFetchData();

  if (loading) return <ActivityIndicator animating={true} size="large" />;
  //if (error) {error.message}</Text>;
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ThemedView
         style={{ flex: 1, justifyContent: 'center' }}
        >
        <Card style={{ margin: 10 }}>
          <Card.Content>
          <ThemedText type='title'><Title>{item.title}</Title></ThemedText>
          <ThemedText type='subtitle'><Paragraph>Category: {item.category}</Paragraph></ThemedText>
          <ThemedText type='subtitle'><Paragraph>Content: {item.content}</Paragraph></ThemedText>
            
          </Card.Content>
        </Card>
        </ThemedView>
      )}
    />
  );
};

export default DataView;
