import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateContent = async (prompt, preferences) => {
  try {
    const systemPrompt = `You are a social media content expert. Create content for Instagram with these preferences:
- Industry: ${preferences.industry}
- Target Audience Age: ${preferences.ageRange}
- Location: ${preferences.location}
- Tone: ${preferences.tone}

Format the response with:
1. Caption
2. Hashtags (up to 10 relevant ones)
3. Best time to post
4. Content type suggestion (image, carousel, reel)`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate content');
  }
};