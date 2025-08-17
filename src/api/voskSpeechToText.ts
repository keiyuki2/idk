import { createModel, createWorker } from "vosk-browser";

export class VoskSpeechToTextService {
  private model: any;
  private worker: any;
  private onResultCallback: ((text: string) => void) | null = null;

  constructor() {
    this.initModel();
  }

  private async initModel() {
    try {
      this.model = await createModel("https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip");
      this.worker = await createWorker(this.model);
      this.worker.onmessage = (event: any) => {
        if (event.data.result && this.onResultCallback) {
          this.onResultCallback(event.data.result.text);
        }
      };
    } catch (error) {
      console.error("Error initializing Vosk model:", error);
    }
  }

  public start(onResult: (text: string) => void) {
    if (this.worker) {
      this.onResultCallback = onResult;
      this.worker.postMessage({ task: "start" });
    }
  }

  public stop() {
    if (this.worker) {
      this.worker.postMessage({ task: "stop" });
    }
  }

  public acceptAudio(audioData: Float32Array) {
    if (this.worker) {
      this.worker.postMessage({ task: "recognize", data: audioData });
    }
  }
}


