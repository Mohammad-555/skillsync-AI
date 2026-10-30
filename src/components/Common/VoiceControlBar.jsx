import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Sparkles, Volume2 } from 'lucide-react';

export const VoiceControlBar = ({ textToRead, title = "AI Voice Assistant" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlay = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!isSupported || !textToRead) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel(); // stop ongoing speech

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!isPlaying) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.6rem 1rem',
      background: 'var(--primary-lavender-subtle)',
      border: '1px solid var(--primary-lavender-border)',
      borderRadius: '0.75rem',
      margin: '0.75rem 0 1.25rem 0',
      minHeight: '54px',
      boxSizing: 'border-box',
      gap: '0.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, minWidth: '180px' }}>
        <div style={{
          width: '28px',
          height: '28px',
          minWidth: '28px',
          borderRadius: '50%',
          background: 'var(--primary-lavender)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Sparkles size={16} />
        </div>
        <div>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-lavender)', display: 'block', lineHeight: '1.2' }}>
            {title}
          </span>
          <div style={{ height: '16px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
            {isPlaying ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '14px' }}>
                  <span style={{ width: '3px', height: '14px', background: 'var(--primary-lavender)', borderRadius: '2px', animation: 'scaleWave 0.6s infinite ease-in-out', transformOrigin: 'bottom' }}></span>
                  <span style={{ width: '3px', height: '14px', background: 'var(--primary-lavender)', borderRadius: '2px', animation: 'scaleWave 0.6s infinite 0.15s ease-in-out', transformOrigin: 'bottom' }}></span>
                  <span style={{ width: '3px', height: '14px', background: 'var(--primary-lavender)', borderRadius: '2px', animation: 'scaleWave 0.6s infinite 0.3s ease-in-out', transformOrigin: 'bottom' }}></span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Speaking...</span>
              </>
            ) : (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ready to narrate</span>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
        {!isPlaying ? (
          <button
            type="button"
            onClick={handlePlay}
            className="btn btn-primary"
            style={{ padding: '0.35rem 0.85rem', fontSize: '0.825rem' }}
          >
            <Play size={14} /> {isPaused ? 'Resume Voice' : 'Play AI Voice'}
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePause}
            className="btn btn-secondary"
            style={{ padding: '0.35rem 0.85rem', fontSize: '0.825rem' }}
          >
            <Pause size={14} /> Pause
          </button>
        )}

        {(isPlaying || isPaused) && (
          <button
            type="button"
            onClick={handleStop}
            className="btn btn-secondary"
            style={{ padding: '0.35rem 0.65rem', fontSize: '0.825rem', color: '#ef4444' }}
            title="Stop Narration"
          >
            <Square size={14} /> Stop
          </button>
        )}
      </div>
    </div>
  );
};
