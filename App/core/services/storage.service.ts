import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "../types";

export default class StorageService {
    async getItem(key: StorageKeys): Promise<any> {
        try {
            const value = await AsyncStorage.getItem(key);
            return JSON.parse(value);
        } catch (e) {
            return new Error(e);
        }
    }

    async setItem(key: StorageKeys, value: any) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            return new Error(e);
        }
    }

    async removeItem(key: StorageKeys): Promise<any> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            return new Error(e);
        }
    }
}
