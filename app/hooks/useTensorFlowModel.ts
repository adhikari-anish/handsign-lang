'use client';

import { useLanguage } from '@/components/LanguageProvider';
import * as tf from '@tensorflow/tfjs';
import { useEffect, useRef, useState } from 'react';

export const useTensorFlowModel = () => {
  const { language } = useLanguage();

  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [TFerror, setTFerror] = useState<string | null>(null);

  const prevModelRef = useRef<tf.GraphModel | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadModel = async () => {
      try {
        setTFerror(null);

        // Dispose the previous model before loading a new one
        if (prevModelRef.current) {
          prevModelRef.current.dispose();
          prevModelRef.current = null;
        }

        const url = `/models/classifiers/${language}/model.json`;
        const loadedModel = await tf.loadGraphModel(url);
        if (mounted) {
          setModel(loadedModel);
        }
      } catch (err) {
        if (mounted) {
          setModel(null);
          setTFerror(
            `Failed to load classifier for ${language.toUpperCase()}: ${
              err instanceof Error ? err.message : 'Unknown error'
            }`
          );
        }
      }
    };

    loadModel();

    return () => {
      mounted =false;
    }
  }, [language]);

  useEffect(() => {
    return () => {
      if (prevModelRef.current) {
        prevModelRef.current.dispose();
        prevModelRef.current = null;
      }
    };
  }, []);

  return { model, TFerror };
}