import { useEffect, useRef, useState } from 'react';
import { Orientation } from '../../types/Orientation';

interface PropsSound {
  sound: string;
  soundOrientation: Orientation;
  next: () => void;
}

const Sound = ({ sound, soundOrientation, next }: PropsSound) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const panNodeRef = useRef<StereoPannerNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    if (!panNodeRef.current && audioContextRef.current) {
      panNodeRef.current = audioContextRef.current.createStereoPanner();
      panNodeRef.current.pan.value = getPan();
    }

    togglePlay();
  }, []);

  const getPan = () => {
    if (soundOrientation === 'LEFT') {
      return -1;
    } else {
      return 1;
    }
  };

  const togglePlay = () => {
    if (audioRef.current && audioContextRef.current && panNodeRef.current) {
      if (!sourceRef.current) {
        sourceRef.current = audioContextRef.current.createMediaElementSource(
          audioRef.current
        );
        sourceRef.current.connect(panNodeRef.current);
        panNodeRef.current.connect(audioContextRef.current.destination);
      }

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return <audio ref={audioRef} crossOrigin="anonymous" src={sound} />;
};

export default Sound;
