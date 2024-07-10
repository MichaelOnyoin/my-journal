import React from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { Card, Text, Title, Paragraph } from 'react-native-paper';
import { useFetchData } from './useFetchData';

const DataView = () => {
  const { data, loading } = useFetchData();

  if (loading) return <ActivityIndicator animating={true} size="large" />;
  //if (error) return <Text>Error fetching data: {error.message}</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Card style={{ margin: 10 }}>
          <Card.Content>
            <Title>{item.title}</Title>
            <Paragraph>{item.content}</Paragraph>
            <Paragraph>{item.category}</Paragraph>
          </Card.Content>
        </Card>
      )}
    />
  );
};

export default DataView;
