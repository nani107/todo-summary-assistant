// === backend/controllers/todoController.js ===
const supabase = require('../utils/supabaseClient');

exports.getTodos = async (req, res) => {
  const { data, error } = await supabase.from('todos').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
};

exports.addTodo = async (req, res) => {
  const { task } = req.body;
  const { data, error } = await supabase.from('todos').insert([{ task, done: false }]).select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('todos').delete().eq('id', id);
  if (error) return res.status(500).json({ error });
  res.status(204).send();
};