// Web Speech APIs Service (Speech Synthesis and Speech Recognition)

export interface SpeechRecognitionResultPayload {
  transcript: string;
  isFinal: boolean;
}

// Window type augmentation for Web Speech API
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

class SpeechService {
  private recognitionInstance: any = null;
  private isListeningActive: boolean = false;

  // Check speech synthesis support
  public isSynthesisSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  // Check speech recognition support
  public isRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  // Speak text with natural speech synthesis
  public speak(text: string, rate: number = 0.95, pitch: number = 1.0): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isSynthesisSupported()) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.lang = 'en-US';

      // Pick best English voice if available
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(
        (v) => (v.lang.startsWith('en-US') || v.lang.startsWith('en-GB')) && !v.name.includes('Google') === false
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onend = () => {
        resolve();
      };

      utterance.onerror = () => {
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  // Cancel any active speech synthesis
  public stopSpeaking(): void {
    if (this.isSynthesisSupported()) {
      window.speechSynthesis.cancel();
    }
  }

  // Start speech recognition
  public startListening(
    onResult: (result: SpeechRecognitionResultPayload) => void,
    onError: (errorMessage: string) => void,
    onEnd: () => void
  ): boolean {
    if (!this.isRecognitionSupported()) {
      onError('Voice recognition is not supported in this browser. Please use text input.');
      return false;
    }

    try {
      this.stopListening();

      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognitionInstance = new SpeechRecognitionClass();
      this.recognitionInstance.lang = 'en-US';
      this.recognitionInstance.interimResults = true;
      this.recognitionInstance.continuous = false;
      this.recognitionInstance.maxAlternatives = 1;

      this.isListeningActive = true;

      this.recognitionInstance.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptPiece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece;
          } else {
            interimTranscript += transcriptPiece;
          }
        }

        const text = finalTranscript || interimTranscript;
        onResult({
          transcript: text,
          isFinal: !!finalTranscript
        });
      };

      this.recognitionInstance.onerror = (event: any) => {
        this.isListeningActive = false;
        let msg = 'Speech recognition error occurred.';
        if (event.error === 'not-allowed') {
          msg = 'Microphone access was denied. Please allow microphone permissions in your browser or type your sentence below.';
        } else if (event.error === 'no-speech') {
          msg = 'No speech was detected. Please try speaking again or type your sentence.';
        } else if (event.error === 'network') {
          msg = "Voice recognition isn't available in this browser right now. You can type your sentence instead.";
        }
        onError(msg);
      };

      this.recognitionInstance.onend = () => {
        this.isListeningActive = false;
        onEnd();
      };

      this.recognitionInstance.start();
      return true;
    } catch (err: any) {
      this.isListeningActive = false;
      onError('Could not start speech recognition: ' + (err?.message || 'Unknown error'));
      return false;
    }
  }

  // Stop listening
  public stopListening(): void {
    if (this.recognitionInstance && this.isListeningActive) {
      try {
        this.recognitionInstance.stop();
      } catch (e) {
        // ignore
      }
      this.isListeningActive = false;
    }
  }
}

export const speechService = new SpeechService();
