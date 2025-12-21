// utils/tokenCache.ts
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const tokenCache = {
  async getToken(key: string): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        // For web, use localStorage
        return localStorage.getItem(key);
      }
      const item = await SecureStore.getItemAsync(key);
      console.log('Token retrieved:', !!item);
      return item;
    } catch (error) {
      console.error('SecureStore get error:', error);
      return null;
    }
  },
  async saveToken(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        // For web, use localStorage
        localStorage.setItem(key, value);
        return;
      }
      await SecureStore.setItemAsync(key, value);
      console.log('Token saved successfully');
    } catch (error) {
      console.error('SecureStore save error:', error);
    }
  },
};