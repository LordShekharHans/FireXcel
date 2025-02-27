import axios from 'axios';
import { Inspection } from '@/types/inspection';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchInspectorInspections(): Promise<Inspection[]> {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/inspector/my-inspections`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching inspections:', error);
    throw new Error('Failed to fetch inspections');
  }
}