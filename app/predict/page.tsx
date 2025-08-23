"use client";

import React, { useEffect, useRef, useTransition } from "react";
import { useWebcam } from "../hooks/useWebcam";
import { useTensorFlowModel } from "../hooks/useTensorFlowModel";
import { CAPTURE_INTERVAL } from "../lib/constants/webcam.constants";
import { useMediaPipeModel } from "../hooks/useMediaPipeModel";
import { drawLandmarks, drawPrediction } from "../lib/utils/drawing";
import { getPrediction, preprocessHandLandmarks } from "../lib/utils/landmarkProcessing";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { parseLanguage } from "../lib/language";
import LanguageSelector from "@/components/LanguageSelector";
import {  } from "next/navigation";

export default function Predict() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const { language, setLanguage } = useLanguage();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { videoRef } = useWebcam();
  const { handLandmarker } = useMediaPipeModel();

  const { model } = useTensorFlowModel();

  const isLoading = !handLandmarker || !model;

  // One-time URL override
  useEffect(() => {
    const p = parseLanguage(params.get('lang'));
    if (p) setLanguage(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // Sync context -> URL whenever language changes
  useEffect(() => {
    const current = params.get('lang');
    if (current === language) return;

    const next = new URLSearchParams(params.toString());
    next.set('lang', language);

    startTransition(() => {
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    });
  }, [language, params, pathname, router, startTransition]);

  useEffect(() => {
    let captureInterval: ReturnType<typeof setInterval> | null = null;

    const processFrame = async () => {
      if (
        !videoRef.current ||
        !canvasRef.current ||
        !handLandmarker ||
        !model
      ) {
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      // Setup canvas
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      // Process frame
      const imageData = context.getImageData(
        0,
        0,
        video.videoWidth,
        video.videoHeight
      );

      const results = handLandmarker.detect(imageData);

      // clear canvas and redraw video frame
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(video, 0, 0);
      
      if (results.worldLandmarks.length >= 1) {
        const landmarkTensor = preprocessHandLandmarks(results.worldLandmarks);
        const predictionResult = await getPrediction(model, landmarkTensor);


        drawLandmarks(context, results.landmarks, canvas);
        drawPrediction(context, predictionResult.letter, canvas);

        
      }
    }

    if (!isLoading) {
      captureInterval = setInterval(processFrame, CAPTURE_INTERVAL);
    }

    return () => {
      if (captureInterval) {
        clearInterval(captureInterval);
      }
    }


  }, [
    isLoading,
    videoRef,
    handLandmarker,
    model,

  ])

  return (
    <div>

      <div className="h-full w-full flex aspect-video">

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-1 left-1">
          <LanguageSelector variant="compact" />  
        </div>

      </div>

    </div>
  ) 
}