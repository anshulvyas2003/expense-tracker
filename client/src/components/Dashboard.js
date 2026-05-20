import React from 'react';

function Dashboard({ transactions }) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  return (
    <div style={styles.container}>
      <div style={{...styles.card, borderTop: '4px solid #3B6D11'}}>
        <p style={styles.label}>Total Income</p>
        <h3 style={{...styles.value, color: '#3B6D11'}}>+₹{income.toLocaleString()}</h3>
      </div>
      <div style={{...styles.card, borderTop: '4px solid #A32D2D'}}>
        <p style={styles.label}>Total Expenses</p>
        <h3 style={{...styles.value, color: '#A32D2D'}}>-₹{expense.toLocaleString()}</h3>
      </div>
      <div style={{...styles.card, borderTop: '4px solid #185FA5'}}>
        <p style={styles.label}>Balance</p>
        <h3 style={{...styles.value, color: '#185FA5'}}>₹{balance.toLocaleString()}</h3>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', gap:'16px', flexWrap:'wrap', marginBottom:'24px' },
  card: { flex:'1', minWidth:'140px', background:'white', borderRadius:'12px', padding:'16px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' },
  label: { fontSize:'13px', color:'#888', margin:'0 0 8px' },
  value: { fontSize:'24px', fontWeight:'500', margin:0 }
};

export default Dashboard;