// C:\Users\iverson\Documents\GitHub\trackguard\src\hooks\useGpsData.ts
import { useState, useEffect } from 'react';
import { database } from '../config/firebaseConfig';
import { ref, onValue, off } from 'firebase/database';

interface GpsData {
  latitude: number;
  longitude: number;
}

const useGpsData = () => {
  const [gpsData, setGpsData] = useState<GpsData | null>(null);

  useEffect(() => {
    const gpsDataRef = ref(database, 'locations');
    const onDataChange = (snapshot: any) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const latestEntry: any = Object.values(data).pop(); // Get the latest entry
        setGpsData({
          latitude: latestEntry.latitude,
          longitude: latestEntry.longitude,
        });
      }
    };

    onValue(gpsDataRef, onDataChange);
    return () => {
      off(gpsDataRef, 'value', onDataChange);
    };
  }, []);

  return gpsData;
};

export default useGpsData;
