import React from 'react';

function TransactionCard({ transaction, onDelete, onEdit }) {
  const isIncome = transaction.type === 'income';

  return (
    <div style={{...styles.card, borderLeft: `4px solid ${isIncome ? '#3B6D11' : '#A32D2D'}`}}>
      <div style={styles.left}>
        <div style={{...styles.dot, background: isIncome ? '#3B6D11' : '#A32D2D'}} />
        <div>
          <p style={styles.title}>{transaction.title}</p>
          <p style={styles.meta}>{transaction.category} · {new Date(transaction.date).toLocaleDateString()}</p>
          <p style={styles.desc}>{transaction.description}</p>
        </div>
      </div>
      <div style={styles.right}>
        <p style={{...styles.amount, color: isIncome ? '#3B6D11' : '#A32D2D'}}>
          {isIncome ? '+' : '-'}₹{transaction.amount.toLocaleString()}
        </p>
        <div style={styles.actions}>
          <button style={styles.editBtn} onClick={() => onEdit(transaction)}>Edit</button>
          <button style={styles.deleteBtn} onClick={() => onDelete(transaction._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: { background:'white', borderRadius:'12px', padding:'14px 16px', marginBottom:'10px', display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 2px 6px rgba(0,0,0,0.06)', transition:'transform 0.2s' },
  left: { display:'flex', alignItems:'center', gap:'12px' },
  dot: { width:'10px', height:'10px', borderRadius:'50%', flexShrink:0 },
  title: { fontSize:'14px', fontWeight:'500', margin:'0 0 2px' },
  meta: { fontSize:'12px', color:'#888', margin:'0 0 2px' },
  desc: { fontSize:'12px', color:'#aaa', margin:0 },
  right: { textAlign:'right' },
  amount: { fontSize:'16px', fontWeight:'500', margin:'0 0 6px' },
  actions: { display:'flex', gap:'6px', justifyContent:'flex-end' },
  editBtn: { background:'#FFF3D6', color:'#854F0B', border:'none', padding:'4px 12px', borderRadius:'6px', cursor:'pointer', fontSize:'12px' },
  deleteBtn: { background:'#FCEBEB', color:'#A32D2D', border:'none', padding:'4px 12px', borderRadius:'6px', cursor:'pointer', fontSize:'12px' }
};

export default TransactionCard;