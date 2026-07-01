import React from 'react';

const TeacherTable = ({ teachers }) => {
  return (
    <div style={tableContainer}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={tableHeaderRow}>
            <th style={thStyle}>MÃ GIÁO VIÊN</th>
            <th style={thStyle}>HỌ VÀ TÊN</th>
            <th style={thStyle}>THÔNG TIN LIÊN HỆ</th>
            <th style={thStyle}>VỊ TRÍ CÔNG TÁC</th>
            <th style={thStyle}>TRẠNG THÁI</th>
            <th style={{ ...thStyle, textAlign: 'right' }}>HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length === 0 ? (
            <tr>
              <td colSpan="6" style={emptyDataCell}>
                📭 Không tìm thấy kết quả phù hợp hệ thống.
              </td>
            </tr>
          ) : (
            teachers.map((teacher) => (
              <tr key={teacher._id} style={tableBodyRow}>
                <td style={{ ...tdStyle, fontWeight: '600', color: '#2563EB' }}>{teacher.code}</td>
                <td style={tdStyle}>
                  <div style={{ fontWeight: '500', color: '#1E293B' }}>{teacher.userId?.name || 'N/A'}</div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                    ID: {teacher._id.substring(0, 8)}...
                  </div>
                </td>
                <td style={tdStyle}>
                  <div style={{ fontSize: '13px', color: '#334155' }}>{teacher.userId?.email || 'N/A'}</div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                    {teacher.userId?.phoneNumber || 'N/A'}
                  </div>
                </td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {teacher.teacherPositionsId && teacher.teacherPositionsId.length > 0 ? (
                      teacher.teacherPositionsId.map((pos) => (
                        <span key={pos._id} style={positionBadge}>{pos.name}</span>
                      ))
                    ) : (
                      <span style={{ color: '#94A3B8', fontStyle: 'italic', fontSize: '13px' }}>Chưa thiết lập</span>
                    )}
                  </div>
                </td>
                <td style={tdStyle}>
                  <span style={{
                    ...statusPill,
                    backgroundColor: teacher.isActive ? '#DCFCE7' : '#FEE2E2',
                    color: teacher.isActive ? '#15803D' : '#B91C1C'
                  }}>
                    {teacher.isActive ? 'Đang làm việc' : 'Nghỉ thai sản/Tạm dừng'}
                  </span>
                </td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>
                  <button style={actionBtn} title="Xem chi tiết">👁️</button>
                  <button style={actionBtn} title="Chỉnh sửa">✏️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const tableContainer = {
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  border: '1px solid #E2E8F0',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  overflow: 'hidden'
};
const tableHeaderRow = { backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' };
const thStyle = { padding: '16px', fontSize: '12px', fontWeight: '700', color: '#64748B', letterSpacing: '0.5px' };
const tableBodyRow = { borderBottom: '1px solid #F1F5F9', transition: 'background 0.15s ease' };
const tdStyle = { padding: '16px', fontSize: '14px', verticalAlign: 'middle' };
const emptyDataCell = { padding: '48px', textAlign: 'center', color: '#64748B', fontSize: '14px' };
const positionBadge = { backgroundColor: '#F1F5F9', color: '#475569', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '500', border: '1px solid #E2E8F0' };
const statusPill = { padding: '4px 10px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600', display: 'inline-block' };
const actionBtn = { background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', marginLeft: '8px', padding: '4px', borderRadius: '4px', transition: 'background 0.2s' };

export default TeacherTable;