import OpenAI from 'openai';
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
 // apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
  },
});
const PredictString = async (params?: string) => {
  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1-0528:free",
    messages: [
      {
        "role": "user",
        "content": `Correct this string ${params} to correct sentence.`
      }
    ],
    
  });

  console.log(completion.choices[0].message);
}

export default PredictString