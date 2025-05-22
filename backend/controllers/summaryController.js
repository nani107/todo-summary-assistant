const supabase = require('../utils/supabaseClient');
const { summarizeTodos } = require('../services/llmService');
const { sendToSlack } = require('../services/slackService');

exports.summarizeAndSend = async (req, res) => {
  const { data: todos, error } = await supabase.from('todos').select('*').eq('done', false);
  if (error) return res.status(500).json({ error });

  try {
    const summary = await summarizeTodos(todos);
    await sendToSlack(summary);
    res.json({ success: true, summary });
  } catch (err) {
    console.error("❌ ERROR in summarizeAndSend:", err);
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
};
