const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

exports.summarizeTodos = async (todos) => {
  const prompt = `Summarize the following todo items:\n${todos.map(t => `- ${t.task}`).join('\n')}`;

  const response = await cohere.generate({
    model: "command",
    prompt,
    maxTokens: 100,
    temperature: 0.5,
  });

  return response.generations[0].text.trim();
};
