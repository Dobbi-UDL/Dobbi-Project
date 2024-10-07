const supabase = require('../config/supabaseClient');

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new company: name, email, password, status
exports.createCompany = async (req, res) => {
  try {
    const { name, email, password, status } = req.body;
    const { data, error } = await supabase
      .from('companies')
      .insert([{ name, email, password, status }]);
    if (error) throw error;
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(600).json({ error: error.message });
  }
}

// Update a company
exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, status } = req.body;
    const { data, error } = await supabase
      .from('companies')
      .update({ name, email, password, status })
      .eq('id', id);
    if (error) throw error;
    if (data.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a company
exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', id);
    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};