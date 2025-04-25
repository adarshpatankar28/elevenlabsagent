import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const body = await req.json();
  const { text } = body;

  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${process.env.VOICE_ID}`,
      {
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      },
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY!,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    return new Response(response.data, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error: unknown) { // Use `unknown` type
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
    } else {
      console.error('An unexpected error occurred', error);
    }
    return NextResponse.json({ error: 'Failed to generate speech' }, { status: 500 });
  }
}
