import { ProgressDataPoint } from '../types/index';

export class TrackerService {
  // Mock API calls - replace with actual API endpoints
  static async getProgressData(): Promise<ProgressDataPoint[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { date: "2024-06-01", weight: 75, calories: 2100, steps: 6000, water: 1.5 },
          { date: "2024-06-05", weight: 74, calories: 2000, steps: 7000, water: 1.8 },
          { date: "2024-06-10", weight: 73.5, calories: 1950, steps: 8000, water: 2.0 },
          { date: "2024-06-15", weight: 73, calories: 1900, steps: 8500, water: 2.1 },
          { date: "2024-06-20", weight: 72.5, calories: 1850, steps: 9000, water: 2.2 },
          { date: "2024-06-25", weight: 72, calories: 1850, steps: 8200, water: 2.3 },
        ]);
      }, 1000);
    });
  }

  static async saveNote(note: string): Promise<void> {
    // Simulate API call to save note
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Note saved:', note);
        resolve();
      }, 500);
    });
  }

  static async uploadPhoto(photoUri: string): Promise<string> {
    // Simulate API call to upload photo
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Photo uploaded:', photoUri);
        resolve('https://example.com/photo.jpg');
      }, 1000);
    });
  }

  static async exportData(): Promise<string> {
    // Simulate API call to export data
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Data exported');
        resolve('tracker_data_export.csv');
      }, 2000);
    });
  }
} 