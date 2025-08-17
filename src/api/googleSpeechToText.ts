import { GoogleGenAI } from "@google/genai";

export class GoogleSpeechToTextService {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  public async transcribeAudio(audioBlob: Blob, sourceLanguage: string, translationEnabled: boolean, translationLanguage: string): Promise<string> {
    const base64Data = await this.blobToBase64(audioBlob);

    let prompt = `Transcribe the audio from this file (source language: ${sourceLanguage}).`;
    if (translationEnabled) {
      prompt += ` Then, translate the transcription into the language with this code: ${translationLanguage}.`;
      prompt += " Respond only with the final translated text.";
    } else {
      prompt += " Respond only with the transcribed text.";
    }

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { text: prompt },
          { inlineData: { mimeType: audioBlob.type, data: base64Data } }
        ]
      }
    });
    return response.text;
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]);
        } else {
          reject(new Error('Failed to convert blob to base64.'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}


