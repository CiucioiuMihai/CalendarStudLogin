import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function DatabaseTestScreen() {
  const [tables, setTables] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkDatabase();
  }, []);

  const checkDatabase = async () => {
    setLoading(true);
    setError(null);
    try {
      // Try to get list of tables (needs appropriate permissions)
      const { data, error } = await supabase
        .from('pg_tables')
        .select('tablename')
        .eq('schemaname', 'public');

      if (error) throw error;
      
      if (data) {
        setTables(data.map((t: { tablename: string }) => t.tablename));
      }
    } catch (err: any) {
      console.error('Database connection error:', err);
      setError(err.message || 'Failed to connect to database');
    } finally {
      setLoading(false);
    }
  };

  const testStudentsTable = async () => {
    try {
      // Just check if the table exists by fetching a single row
      const { data, error } = await supabase
        .from('Student')  // Changed from 'students' to 'Student' to match Supabase table name
        .select('id')
        .limit(1);

      if (error) {
        Alert.alert('Error', `Could not access Student table: ${error.message}`);
      } else {
        Alert.alert('Success', `Successfully accessed Student table. Found ${data?.length || 0} records.`);
      }
    } catch (err: any) {
      Alert.alert('Error', `Test failed: ${err.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Database Connection Test</Text>
      
      {loading ? (
        <Text>Loading database information...</Text>
      ) : error ? (
        <View>
          <Text style={styles.error}>{error}</Text>
          <Button title="Retry" onPress={checkDatabase} />
        </View>
      ) : (
        <View>
          <Text style={styles.success}>Database connection successful!</Text>
          
          <Text style={styles.subtitle}>Available Tables:</Text>
          {tables.length === 0 ? (
            <Text>No tables found or no permission to list tables.</Text>
          ) : (
            tables.map(table => (
              <Text key={table} style={styles.item}>• {table}</Text>
            ))
          )}
          
          <View style={styles.buttonContainer}>
            <Button 
              title="Test Students Table" 
              onPress={testStudentsTable} 
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  success: {
    color: 'green',
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 30,
  }
});
