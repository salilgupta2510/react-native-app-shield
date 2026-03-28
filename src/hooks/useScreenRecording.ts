import React, { useEffect, useState } from 'react';
import { onScreenRecording } from '../index';

export const useScreenRecording = () => {
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const unsubscribe = onScreenRecording((recording) => {
      setIsRecording(recording);
    });
    return unsubscribe;
  }, []);

  return isRecording;
};