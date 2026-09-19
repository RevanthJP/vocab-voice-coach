import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Keyboard, RotateCcw, AlertTriangle, Send, Briefcase, Volume2 } from 'lucide-react';
import { speechService } from '../services/speechService';
import { VoiceState } from '../types';

interface VoiceVisualizerProps {
  targetWord: string;
  voiceState: VoiceState;
  practiceMode?: 'open' | 'situation';
  situationPrompt?: string;
  initialSentence?: string;
  previousMistakes?: string[];
  onTranscriptReady: (transcript: string, method: 'voice' | 'text') => void;
  onStateChange: (state: VoiceState) => void;
  disabled?: boolean;
}

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({
  targetWord,
  voiceState,
  practiceMode = 'open',
  situationPrompt,
  initialSentence = '',
  previousMistakes,
  onTranscriptReady,
  onStateChange,
  disabled = false
}) => {
  const [transcript, setTranscript] = useState('');
  const [isRecognitionAvailable, setIsRecognitionAvailable] = useState(true);
  const [preferTextInput, setPreferTextInput] = useState(false);
  const [manualText, setManualText] = useState(initialSentence);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsRecognitionAvailable(speechService.isRecognitionSupported());
  }, []);

  // Update manualText if initialSentence changes (e.g. when Try Again is pressed)
  useEffect(() => {
    if (initialSentence) {
      setManualText(initialSentence);
    }
  }, [initialSentence]);

  const handleStartListening = () => {
    setErrorMessage(null);
    setTranscript('');
    onStateChange('listening');

    const started = speechService.startListening(
      (result) => {
        setTranscript(result.transcript);
        if (result.isFinal && result.transcript.trim().length > 0) {
          onStateChange('processing');
          setTimeout(() => {
            onTranscriptReady(result.transcript, 'voice');
          }, 300);
        }
      },
      (error) => {
        setErrorMessage(error);
        onStateChange('idle');
      },
      () => {
        // onEnd
        if (transcript.trim().length > 0 && voiceState === 'listening') {
          onStateChange('processing');
          setTimeout(() => {
            onTranscriptReady(transcript, 'voice');
          }, 300);
        } else if (voiceState === 'listening') {
          onStateChange('idle');
        }
      }
    );

    if (!started) {
      setErrorMessage('Could not activate microphone. You can type your sentence instead.');
      onStateChange('idle');
    }
  };

  const handleStopListening = () => {
    speechService.stopListening();
    if (transcript.trim().length > 0) {
      onStateChange('processing');
      setTimeout(() => {
        onTranscriptReady(transcript, 'voice');
      }, 300);
    } else {
      onStateChange('idle');
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualText.trim()) return;
    onStateChange('processing');
    setTimeout(() => {
      onTranscriptReady(manualText.trim(), 'text');
    }, 200);
  };

  const handleReadPrompt = () => {
    if (situationPrompt) {
      speechService.speak(situationPrompt, 0.95);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
      {/* Real-Life Situation Prompt Banner if in situation mode */}
      {practiceMode === 'situation' && situationPrompt && (
        <div className="bg-sky-50/80 rounded-xl p-4 border border-sky-200 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#0B749C]">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Real-Life Situation Scenario</span>
            </span>
            <button
              onClick={handleReadPrompt}
              className="p-1 rounded-md text-[#0B749C] hover:bg-sky-100 transition-colors"
              title="Listen to scenario prompt"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-slate-800 font-medium leading-relaxed">
            {situationPrompt}
          </p>
        </div>
      )}

      {/* Header Prompt */}
      <div className="text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#1FBAC0] bg-[#1FBAC0]/10 px-3 py-1 rounded-full mb-2">
          {practiceMode === 'situation' ? 'Respond to Scenario' : 'Your Turn to Speak'}
        </span>
        <h4 className="text-lg font-bold text-slate-900">
          {practiceMode === 'situation' ? (
            <>
              Respond using &ldquo;<span className="text-[#0B749C]">{targetWord}</span>&rdquo;
            </>
          ) : (
            <>
              Can you use &ldquo;<span className="text-[#0B749C]">{targetWord}</span>&rdquo; in your own sentence?
            </>
          )}
        </h4>
        <p className="text-xs text-slate-500 mt-1">
          Speak clearly into your microphone or type your sentence to receive instant feedback.
        </p>
      </div>

      {/* Try Again Context: Display previous sentence & guidance if present */}
      {initialSentence && (
        <div className="bg-amber-50/70 rounded-xl p-3.5 border border-amber-200/80 text-xs">
          <span className="font-bold text-amber-900 block mb-0.5">
            ✏️ Refining Your Previous Attempt:
          </span>
          <p className="text-amber-800 italic">
            &ldquo;{initialSentence}&rdquo;
          </p>
          {previousMistakes && previousMistakes.length > 0 && (
            <p className="text-amber-900 font-medium mt-1">
              Tip: Fix identified grammar or tense issues before resubmitting.
            </p>
          )}
        </div>
      )}

      {/* Voice Recognition Unavailable Notice */}
      {!isRecognitionAvailable && !preferTextInput && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          <div>
            <p className="font-bold">Voice recognition is not supported in this browser.</p>
            <p className="mt-0.5 text-amber-700">
              No problem! You can type your sentence below and receive the exact same language feedback.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
          <div className="flex-1">
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Mode 1: Voice Recognition (Default if supported) */}
      {isRecognitionAvailable && !preferTextInput ? (
        <div className="flex flex-col items-center justify-center py-3">
          {/* Animated Microphone Hero Button */}
          <div className="relative mb-4">
            {voiceState === 'listening' && (
              <div className="absolute inset-0 rounded-full bg-[#1FBAC0]/30 animate-ping pointer-events-none" />
            )}

            <button
              onClick={voiceState === 'listening' ? handleStopListening : handleStartListening}
              disabled={disabled || voiceState === 'processing'}
              className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all shadow-lg ${
                voiceState === 'listening'
                  ? 'bg-[#1FBAC0] text-white ring-8 ring-[#1FBAC0]/25 scale-105'
                  : voiceState === 'processing'
                  ? 'bg-slate-300 text-slate-600 cursor-wait'
                  : 'bg-gradient-to-tr from-[#0B749C] to-[#1FBAC0] text-white hover:scale-105 active:scale-95 shadow-[#0B749C]/25'
              }`}
            >
              {voiceState === 'listening' ? (
                <MicOff className="w-9 h-9 animate-pulse" />
              ) : voiceState === 'processing' ? (
                <RotateCcw className="w-8 h-8 animate-spin" />
              ) : (
                <Mic className="w-9 h-9" />
              )}
            </button>
          </div>

          {/* Status Label */}
          <div className="text-center min-h-6 mb-2">
            {voiceState === 'listening' ? (
              <div className="flex items-center gap-2 text-sm font-bold text-[#1FBAC0]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1FBAC0] animate-ping" />
                <span>Listening... speak your sentence now</span>
              </div>
            ) : voiceState === 'processing' ? (
              <span className="text-xs font-semibold text-slate-500 animate-pulse">
                Analyzing grammar &amp; vocabulary...
              </span>
            ) : (
              <span className="text-xs font-semibold text-slate-500">
                Tap microphone to start speaking
              </span>
            )}
          </div>

          {/* Transcript Display Box */}
          {transcript && (
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-3 text-center">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Transcript
              </span>
              <p className="text-sm font-medium text-slate-800 italic">
                &ldquo;{transcript}&rdquo;
              </p>
            </div>
          )}

          {/* Controls below mic */}
          <div className="flex items-center gap-2 mt-2">
            {voiceState === 'listening' ? (
              <button
                onClick={handleStopListening}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold shadow-xs hover:bg-slate-900 transition-colors"
              >
                Stop &amp; Check Sentence
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setPreferTextInput(true)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span>Or type your sentence instead</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Mode 2: Text Input Fallback / Alternate */
        <form onSubmit={handleManualSubmit} className="space-y-3 py-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Type your sentence using &ldquo;{targetWord}&rdquo;:
            </label>
            <div className="relative">
              <textarea
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder={`e.g., I asked my team lead to ${targetWord.toLowerCase()} the action items.`}
                rows={3}
                className="w-full p-3.5 text-sm border border-slate-300 rounded-xl focus:border-[#0B749C] focus:ring-2 focus:ring-[#0B749C]/20 outline-hidden resize-none bg-slate-50/50 focus:bg-white"
                autoFocus
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            {isRecognitionAvailable ? (
              <button
                type="button"
                onClick={() => {
                  setPreferTextInput(false);
                  setErrorMessage(null);
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#0B749C] hover:underline"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Switch to voice microphone</span>
              </button>
            ) : (
              <span className="text-[11px] text-slate-600">Keyboard mode enabled</span>
            )}

            <button
              type="submit"
              disabled={!manualText.trim() || voiceState === 'processing'}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B749C] hover:bg-[#085a79] text-white text-xs sm:text-sm font-bold shadow-md transition-all disabled:opacity-50"
            >
              <span>{voiceState === 'processing' ? 'Checking...' : 'Check My Sentence'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
