import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "../types";

export default class StorageService {
    async getItem(key: StorageKeys): Promise<any> {
        const value = await AsyncStorage.getItem(key);
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }

    setItem(key: StorageKeys, value: any) {
        return AsyncStorage.setItem(key, value);
        // try {
        //     await AsyncStorage.setItem(key, value);
        // } catch (e) {
        //     return new Error(e);
        // }
    }

    async removeItem(key: StorageKeys): Promise<any> {
        return AsyncStorage.removeItem(key);
    }
}
