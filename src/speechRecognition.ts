export class SpeechRecognitionService {
  private recognition: SpeechRecognition | null = null;
  private onResultCallback: ((text: string) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  constructor() {
    if (	ypeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US'; // Default language

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        if (this.onResultCallback) {
          this.onResultCallback(finalTranscript + interimTranscript);
        }
      };

      this.recognition.onend = () => {
        if (this.onEndCallback) {
          this.onEndCallback();
        }
      };

      this.recognition.onerror = (event: SpeechRecognitionError) => {
        console.error('Speech recognition error:', event.error);
      };
    } else {
      console.warn('Web Speech API not supported in this browser.');
    }
  }

  public start(onResult: (text: string) => void, onEnd: () => void) {
    if (this.recognition) {
      this.onResultCallback = onResult;
      this.onEndCallback = onEnd;
      this.recognition.start();
    }
  }

  public stop() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}


