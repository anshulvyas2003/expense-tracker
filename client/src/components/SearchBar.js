import React from 'react';

const CATEGORIES = ['', 'Food', 'Housing', 'Transport', 'Utilities', 'Healthcare', 'Education', 'Freelance', 'Salary', 'Investment', 'Other'];

function SearchBar({ search, setSearch, type, setType, category, setCategory }) {
  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        placeholder="Search transactions..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select style={styles.select} value={type} onChange={e => setType(e.target.value)}>
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select style={styles.select} value={category} onChange={e => setCategory(e.target.value)}>
        {CATEGORIES.map(c => <option key={c} value={c}>{c || 'All Categories'}</option>)}
      </select>
    </div>
  );
}

const styles = {
  container: { display:'flex', gap:'10px', flexWrap:'wrap', marginBottom:'16px' },
  input: { flex:2, minWidth:'180px', padding:'9px 12px', borderRadius:'8px', border:'0.5px solid #ddd', fontSize:'13px' },
  select: { flex:1, minWidth:'130px', padding:'9px 10px', borderRadius:'8px', border:'0.5px solid #ddd', fontSize:'13px' }
};

export default SearchBar;