import React, { useState, useEffect } from 'react';

const CATEGORIES = ['Food', 'Housing', 'Transport', 'Utilities', 'Healthcare', 'Education', 'Freelance', 'Salary', 'Investment', 'Other'];

function TransactionForm({ onSubmit, editTransaction, onCancel }) {
  const [form, setForm] = useState({
    title: '', description: '', amount: '', type: 'income', category: 'Salary', date: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editTransaction) {
      setForm({
        title: editTransaction.title,
        description: editTransaction.description,
        amount: editTransaction.amount,
        type: editTransaction.type,
        category: editTransaction.category,
        date: editTransaction.date?.slice(0, 10)
      });
    }
  }, [editTransaction]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.amount || !form.date) {
      setError('All fields are required!');
      return;
    }
    if (Number(form.amount) <= 0) {
      setError('Amount must be greater than 0!');
      return;
    }
    setError('');
    onSubmit({ ...form, amount: Number(form.amount) });
    setForm({ title:'', description:'', amount:'', type:'income', category:'Salary', date:'' });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{editTransaction ? 'Edit Transaction' : 'Add Transaction'}</h2>
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.typeToggle}>
        <button
          type="button"
          style={{...styles.typeBtn, ...(form.type === 'income' ? styles.incomeActive : {})}}
          onClick={() => setForm({...form, type:'income', category:'Salary'})}>
          + Income
        </button>
        <button
          type="button"
          style={{...styles.typeBtn, ...(form.type === 'expense' ? styles.expenseActive : {})}}
          onClick={() => setForm({...form, type:'expense', category:'Food'})}>
          - Expense
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={styles.row}>
          <input style={styles.input} name="title" placeholder="Title" value={form.title} onChange={handleChange} />
          <input style={styles.input} name="amount" type="number" placeholder="Amount (₹)" value={form.amount} onChange={handleChange} min="0.01" step="0.01" />
        </div>
        <div style={styles.row}>
          <select style={styles.input} name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <input style={styles.input} name="date" type="date" value={form.date} onChange={handleChange} />
        </div>
        <textarea style={{...styles.input, width:'100%'}} name="description" placeholder="Description" value={form.description} onChange={handleChange} rows={2} />
        <div style={{display:'flex', gap:'8px'}}>
          <button style={styles.submitBtn} type="submit">{editTransaction ? 'Update' : 'Add Transaction'}</button>
          {editTransaction && <button style={styles.cancelBtn} type="button" onClick={onCancel}>Cancel</button>}
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: { background:'white', padding:'20px', borderRadius:'12px', marginBottom:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' },
  heading: { fontSize:'16px', fontWeight:'500', marginBottom:'12px' },
  error: { color:'#A32D2D', marginBottom:'8px', fontSize:'13px' },
  typeToggle: { display:'flex', gap:'8px', marginBottom:'12px' },
  typeBtn: { flex:1, padding:'8px', borderRadius:'8px', border:'0.5px solid #ddd', fontSize:'13px', cursor:'pointer', background:'#f5f5f5', color:'#888' },
  incomeActive: { background:'#EAF3DE', color:'#3B6D11', border:'0.5px solid #3B6D11' },
  expenseActive: { background:'#FCEBEB', color:'#A32D2D', border:'0.5px solid #A32D2D' },
  row: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginBottom:'8px' },
  input: { padding:'9px 10px', borderRadius:'8px', border:'0.5px solid #ddd', fontSize:'13px', width:'100%', boxSizing:'border-box', marginBottom:'8px' },
  submitBtn: { background:'#185FA5', color:'white', border:'none', padding:'10px 24px', borderRadius:'8px', cursor:'pointer', fontSize:'13px' },
  cancelBtn: { background:'#aaa', color:'white', border:'none', padding:'10px 24px', borderRadius:'8px', cursor:'pointer', fontSize:'13px' }
};

export default TransactionForm;