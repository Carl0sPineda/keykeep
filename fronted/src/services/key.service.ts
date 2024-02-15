import { Key, FormData } from "../interfaces/key.interface";
import axios from "axios";

const baseUrl = "http://localhost:8080/keys";

export const getAllKeys = async (): Promise<Key[]> => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get keys");
  }
};

export const postKey = async (formData: FormData): Promise<Key[]> => {
  try {
    const response = await axios.post(baseUrl, formData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add key");
  }
};

export const putKey = async (formData: Key): Promise<Key> => {
  try {
    const response = await axios.put(`${baseUrl}/${formData.id}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update key`);
  }
};

export const deleteKey = async (taskId: number): Promise<void> => {
  try {
    await axios.delete(`${baseUrl}/${taskId}`);
  } catch (error) {
    throw new Error("Failed to delete key");
  }
};
