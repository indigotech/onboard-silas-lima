import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorageValue = async (key : string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch(e) {
      console.log(e);
    }
  }

export const setStorageValue = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log(e);
    }
  }

