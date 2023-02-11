import { useCallback, useEffect, useRef, useState } from 'react';
import dogBark from '../../../../assets/sound/dog.mp3';
import { Sound } from 'renderer/interfaces/Sound';

interface PropsSound {
  sound: Sound;
}

const SoundExercise = ({ sound }: PropsSound) => {
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
    if (sound.orientation === 'LEFT') {
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

  const selectedSound = useCallback(() => {
    if (sound.name === 'dog') {
      return dogBark;
    } else {
      return '';
    }
  }, []);

  return <audio ref={audioRef} crossOrigin="anonymous" src={selectedSound()} />;
};

export default SoundExercise;
