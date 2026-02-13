import OpenAI from 'openai';

let clientInstance: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!clientInstance) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }
    clientInstance = new OpenAI({ apiKey });
  }
  return clientInstance;
}

export function getModel(): string {
  return process.env.OPENAI_MODEL || 'gpt-4o';
}
