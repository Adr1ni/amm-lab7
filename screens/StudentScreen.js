import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { fetchStudents } from '../api/api';

const StudentsScreen = ({ route }) => {
  const { token } = route.params;
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const data = await fetchStudents(token);
        setStudents(data.data);
      } catch (error) {
        alert('Failed to fetch students');
      }
    };

    getStudents();
  }, [token]);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>{item.name} {item.lastName}</Title>
        <Paragraph style={styles.paragraph}>{item.address}, {item.city}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <IconButton
          icon="account-details"
          size={20}
          onPress={() => console.log('Pressed')}
        />
        <Text style={styles.status}>{item.stateCustomer}</Text>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={(item) => item.customerId.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0'
  },
  card: {
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
  },
  paragraph: {
    marginBottom: 10,
  },
  status: {
    marginLeft: 'auto',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default StudentsScreen;
