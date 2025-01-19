import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Link } from 'expo-router';

export default function NotFound() {
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : '#f0f0f0' }]}>
      <Text style={[styles.title, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>404 - Page Not Found</Text>
      <Text style={[styles.description, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>Oops! The page you're looking for doesn't exist.</Text>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

