'use client';

import { useEffect, useRef, useState } from "react";

export const useWebcam = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [WebcamError, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let stream: MediaStream | null = null;
    const initializeWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 960 },
            facingMode: 'user'
          }
        })

        if (mounted && videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current?.play();
        }
      } catch (err) {
        if (mounted) {
          setError(`Failed to access webcam: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
      }
    }

    initializeWebcam();

    return () => {
      mounted = false;
      stream?.getTracks().forEach(track => track.stop());
    }
  }, [])

  return { videoRef, WebcamError };
}