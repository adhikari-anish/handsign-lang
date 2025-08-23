'use client';

import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { useEffect, useState } from "react"

export const useMediaPipeModel = () => {
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null);
  const [MediaPipeError, setMediaPipeError] = useState<string | null>(null);
  useEffect(() => {
    let mounted = true;

    const initializeModel = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        );

        const model = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: '/models/hand_landmarker.task'
          },
          numHands: 2, 
          minHandDetectionConfidence: 0.35,
          minHandPresenceConfidence: 0.35
        });

        if (mounted) {
          setHandLandmarker(model);
        }
      } catch (err) {
        if (mounted) {
          setMediaPipeError(`Failed to access webcam: ${err instanceof Error ? err.message : 'Unknown Error'}`);
        }
      }
    };

    initializeModel();

    return () => {
      mounted = false;
    }
  }, []);
  return { handLandmarker, MediaPipeError }
}