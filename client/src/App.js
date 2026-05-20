import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionCard from './components/TransactionCard';
import SearchBar from './components/SearchBar';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search)   params.search = search;
      if (type)     params.type = type;
      if (category) params.category = category;
      const res = await axios.get('/api/transactions', { params });
      setTransactions(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTransactions(); }, [search, type, category]);

  const handleSubmit = async (form) => {
    try {
      if (editTransaction) {
        await axios.put(`/api/transactions/${editTransaction._id}`, form);
        setEditTransaction(null);
      } else {
        await axios.post('/api/transactions', form);
      }
      fetchTransactions();
    } catch (err) {
      setError('Failed to save transaction.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this transaction?')) {
      await axios.delete(`/api/transactions/${id}`);
      fetchTransactions();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Mini Expense Tracker</h1>
        <p style={styles.subtitle}>Track your daily income and expenses</p>
      </div>
      <Dashboard transactions={transactions} />
      <TransactionForm
        onSubmit={handleSubmit}
        editTransaction={editTransaction}
        onCancel={() => setEditTransaction(null)}
      />
      <SearchBar
        search={search} setSearch={setSearch}
        type={type} setType={setType}
        category={category} setCategory={setCategory}
      />
      {error && <p style={styles.error}>{error}</p>}
      {loading ? (
        <p style={styles.center}>Loading...</p>
      ) : transactions.length === 0 ? (
        <p style={styles.center}>No transactions yet. Add one above!</p>
      ) : (
        transactions.map(t => (
          <TransactionCard
            key={t._id}
            transaction={t}
            onDelete={handleDelete}
            onEdit={setEditTransaction}
          />
        ))
      )}
    </div>
  );
}

const styles = {
  page: { maxWidth:'800px', margin:'0 auto', padding:'24px 16px', fontFamily:'sans-serif', background:'#f9f9f9', minHeight:'100vh' },
  header: { textAlign:'center', marginBottom:'24px' },
  title: { fontSize:'24px', fontWeight:'500', margin:'0 0 4px' },
  subtitle: { fontSize:'14px', color:'#888', margin:0 },
  error: { color:'#A32D2D', textAlign:'center', marginBottom:'12px' },
  center: { textAlign:'center', color:'#aaa', padding:'40px 0' }
};

export default App;