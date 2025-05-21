// backend/services/llmService.js
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function summarizeTodos(todos) {
  const prompt = `Summarize these tasks: ${todos.map(t => `- ${t.task}`).join('\n')}`;
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }]
  });
  return response.choices[0].message.content;
}

module.exports = { summarizeTodos };
