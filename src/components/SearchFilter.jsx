import React from 'react';

const SearchFilter = ({ onSearchChange, onFilterChange, positions, onAddClick }) => {
  return (
    <div style={filterWrapper}>
      <div style={inputsGroup}>
        <div style={searchContainer}>
          <span style={searchIcon}>🔍</span>
          <input 
            type="text" 
            placeholder="Tìm kiếm theo mã, tên hoặc email..." 
            style={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <select style={selectInput} onChange={(e) => onFilterChange(e.target.value)}>
          <option value="">Tất cả vị trí chức vụ</option>
          {positions.map(p => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
      </div>

      <button onClick={onAddClick} style={primaryActionBtn}>
        <span style={{ marginRight: '8px', fontSize: '16px' }}>+</span>
        Thêm mới giáo viên
      </button>
    </div>
  );
};

const filterWrapper = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  padding: '16px 24px',
  borderRadius: '12px',
  border: '1px solid #E2E8F0',
  marginBottom: '20px',
  gap: '16px',
  flexWrap: 'wrap'
};

const inputsGroup = { display: 'flex', gap: '12px', flex: 1, maxWidth: '700px' };
const searchContainer = { position: 'relative', flex: 1 };
const searchIcon = { position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontSize: '14px' };
const searchInput = {
  width: '100%',
  padding: '10px 12px 10px 40px',
  borderRadius: '8px',
  border: '1px solid #CBD5E1',
  fontSize: '14px',
  outline: 'none',
  transition: 'border 0.2s',
  backgroundColor: '#F8FAFC'
};
const selectInput = {
  padding: '10px 16px',
  borderRadius: '8px',
  border: '1px solid #CBD5E1',
  fontSize: '14px',
  outline: 'none',
  backgroundColor: '#F8FAFC',
  minWidth: '200px',
  cursor: 'pointer'
};
const primaryActionBtn = {
  padding: '10px 20px',
  backgroundColor: '#2563EB',
  color: '#FFFFFF',
  border: 'none',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  transition: 'background 0.2s'
};

export default SearchFilter;