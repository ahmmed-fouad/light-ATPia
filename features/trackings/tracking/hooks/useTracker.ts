import { useState, useEffect } from 'react';
import { ProgressDataPoint } from '../types/index';
import { TrackerService } from '../services/trackerService';

export const useTracker = () => {
  const [progressData, setProgressData] = useState<ProgressDataPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProgressData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await TrackerService.getProgressData();
      setProgressData(data);
    } catch (err) {
      setError('Failed to fetch progress data');
      console.error('Error fetching progress data:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveNote = async (note: string) => {
    try {
      await TrackerService.saveNote(note);
      return true;
    } catch (err) {
      console.error('Error saving note:', err);
      return false;
    }
  };

  const uploadPhoto = async (photoUri: string) => {
    try {
      const uploadedUrl = await TrackerService.uploadPhoto(photoUri);
      return uploadedUrl;
    } catch (err) {
      console.error('Error uploading photo:', err);
      return null;
    }
  };

  const exportData = async () => {
    try {
      const fileName = await TrackerService.exportData();
      return fileName;
    } catch (err) {
      console.error('Error exporting data:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchProgressData();
  }, []);

  return {
    progressData,
    loading,
    error,
    fetchProgressData,
    saveNote,
    uploadPhoto,
    exportData,
  };
}; 