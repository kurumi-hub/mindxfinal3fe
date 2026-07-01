import React, { useState, useEffect } from 'react';

const TeacherModal = ({ onClose, onSuccess }) => {
  const [positions, setPositions] = useState([]);
  const [formData, setFormData] = useState({
    name: '', email: '', phoneNumber: '', address: '', identity: '', dob: '',
    code: '', startDate: '', teacherPositionsId: [], degrees: []
  });

  // Local state helper for interactive addition of academic records
  const [currentDegree, setCurrentDegree] = useState({ type: 'Bachelor', school: '', major: '', year: '', isGraduated: true });

  useEffect(() => {
    fetch('http://localhost:5000/api/teachers/positions')
      .then(res => res.json())
      .then(data => setPositions(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePositionToggle = (id) => {
    setFormData(prev => {
      const alreadySelected = prev.teacherPositionsId.includes(id);
      const updated = alreadySelected 
        ? prev.teacherPositionsId.filter(item => item !== id)
        : [...prev.teacherPositionsId, id];
      return { ...prev, teacherPositionsId: updated };
    });
  };

  const addDegreeRow = () => {
    if (!currentDegree.school || !currentDegree.major) {
      alert("Vui lòng điền thông tin Trường và Chuyên ngành học vị!");
      return;
    }
    setFormData(prev => ({ ...prev, degrees: [...prev.degrees, currentDegree] }));
    setCurrentDegree({ type: 'Bachelor', school: '', major: '', year: '', isGraduated: true });
  };

  const removeDegreeRow = (index) => {
    setFormData(prev => ({ ...prev, degrees: prev.degrees.filter((_, idx) => idx !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.teacherPositionsId.length === 0) {
      alert("Vui lòng chọn ít nhất một vị trí công tác đảm nhiệm!");
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) onSuccess();
      else alert('Xảy ra lỗi kiểm định dữ liệu phía máy chủ.');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={modalOverlay}>
      <div style={modalCard}>
        <div style={modalHeader}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', color: '#1E293B' }}>Tạo mới tài khoản cán bộ</h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>Điền thông tin chi tiết hồ sơ giáo viên.</p>
          </div>
          <button onClick={onClose} style={closeXBtn}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} style={modalBody}>
          <h4 style={sectionDivider}>THÔNG TIN CƠ BẢN</h4>
          <div style={formGrid}>
            <div>
              <label style={labelStyle}>Mã Giáo Viên *</label>
              <input type="text" name="code" required style={inputStyle} placeholder="Ví dụ: GV2026_01" onChange={handleChange} />
            </div>
            <div>
              <label style={labelStyle}>Họ và Tên *</label>
              <input type="text" name="name" required style={inputStyle} placeholder="Nguyễn Hoàng Nam" onChange={handleChange} />
            </div>
            <div>
              <label style={labelStyle}>Địa chỉ Email *</label>
              <input type="email" name="email" required style={inputStyle} placeholder="namnh@mindx.edu.vn" onChange={handleChange} />
            </div>
            <div>
              <label style={labelStyle}>Số điện thoại</label>
              <input type="text" name="phoneNumber" style={inputStyle} placeholder="0912345678" onChange={handleChange} />
            </div>
            <div>
              <label style={labelStyle}>Số CCCD/Hộ chiếu</label>
              <input type="text" name="identity" style={inputStyle} placeholder="Cục CSQL hành chính" onChange={handleChange} />
            </div>
            <div>
              <label style={labelStyle}>Ngày sinh</label>
              <input type="date" name="dob" style={inputStyle} onChange={handleChange} />
            </div>
          </div>

          <div style={formGrid2}>
            <div>
              <label style={labelStyle}>Ngày bắt đầu làm việc</label>
              <input type="date" name="startDate" style={inputStyle} onChange={handleChange} />
            </div>
            <div>
              <label style={labelStyle}>Địa chỉ thường trú</label>
              <input type="text" name="address" style={inputStyle} placeholder="Số nhà, Tên đường, Quận, Thành phố..." onChange={handleChange} />
            </div>
          </div>

          <h4 style={sectionDivider}>VỊ TRÍ CÔNG TÁC (CHỌN NHIỀU)</h4>
          <div style={checkboxWrapper}>
            {positions.map(p => {
              const selected = formData.teacherPositionsId.includes(p._id);
              return (
                <div 
                  key={p._id} 
                  onClick={() => handlePositionToggle(p._id)}
                  style={{
                    ...checkboxItem,
                    backgroundColor: selected ? '#EFF6FF' : '#FFFFFF',
                    borderColor: selected ? '#2563EB' : '#CBD5E1'
                  }}
                >
                  <input type="checkbox" checked={selected} readOnly style={{ marginRight: '8px' }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>{p.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>{p.code}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <h4 style={sectionDivider}>HỌC VỊ & BẰNG CẤP</h4>
          <div style={degreeFormBox}>
            <select style={miniInput} value={currentDegree.type} onChange={(e)=>setCurrentDegree({...currentDegree, type: e.target.value})}>
              <option value="Bachelor">Cử Nhân (Bachelor)</option>
              <option value="Master">Thạc Sĩ (Master)</option>
              <option value="Doctorate">Tiến Sĩ (Doctorate)</option>
            </select>
            <input type="text" placeholder="Trường đào tạo" style={miniInput} value={currentDegree.school} onChange={(e)=>setCurrentDegree({...currentDegree, school: e.target.value})} />
            <input type="text" placeholder="Chuyên ngành" style={miniInput} value={currentDegree.major} onChange={(e)=>setCurrentDegree({...currentDegree, major: e.target.value})} />
            <input type="number" placeholder="Năm tốt nghiệp" style={{...miniInput, width:'100px'}} value={currentDegree.year} onChange={(e)=>setCurrentDegree({...currentDegree, year: e.target.value})} />
            <button type="button" onClick={addDegreeRow} style={addDegreeBtn}>Thêm</button>
          </div>

          {formData.degrees.length > 0 && (
            <table style={degreePreviewTable}>
              <thead>
                <tr style={{background:'#F8FAFC'}}>
                  <th style={miniTh}>Loại</th>
                  <th style={miniTh}>Trường</th>
                  <th style={miniTh}>Chuyên ngành</th>
                  <th style={miniTh}>Năm</th>
                  <th style={{...miniTh, textAlign:'center'}}>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {formData.degrees.map((deg, i) => (
                  <tr key={i} style={{borderBottom:'1px solid #E2E8F0'}}>
                    <td style={miniTd}>{deg.type}</td>
                    <td style={miniTd}>{deg.school}</td>
                    <td style={miniTd}>{deg.major}</td>
                    <td style={miniTd}>{deg.year}</td>
                    <td style={{...miniTd, textAlign:'center'}}>
                      <button type="button" onClick={() => removeDegreeRow(i)} style={{background:'none', border:'none', cursor:'pointer', color:'#EF4444'}}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div style={modalFooter}>
            <button type="button" onClick={onClose} style={secondaryBtn}>Hủy bỏ</button>
            <button type="submit" style={submitBtn}>Lưu thông tin</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const modalOverlay = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 };
const modalCard = { backgroundColor: '#FFFFFF', borderRadius: '16px', width: '760px', maxHeight: '92vh', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column' };
const modalHeader = { padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const closeXBtn = { background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#94A3B8' };
const modalBody = { padding: '24px', overflowY: 'auto', flex: 1 };
const sectionDivider = { fontSize: '12px', fontWeight: '700', color: '#2563EB', letterSpacing: '1px', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px', marginBottom: '16px', marginTop: '8px' };
const formGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px' };
const formGrid2 = { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '12px' };
const labelStyle = { display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' };
const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none', backgroundColor: '#F8FAFC' };
const checkboxWrapper = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' };
const checkboxItem = { padding: '10px', borderRadius: '8px', border: '1px solid', display: 'flex', alignItems: 'center', cursor: 'pointer', transition: 'all 0.15s ease' };
const degreeFormBox = { display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' };
const miniInput = { padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', backgroundColor: '#F8FAFC', flex: 1 };
const addDegreeBtn = { padding: '8px 16px', backgroundColor: '#475569', color:'#FFF', border:'none', borderRadius:'6px', fontSize:'13px', fontWeight:'600', cursor:'pointer' };
const degreePreviewTable = { width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '24px', border: '1px solid #E2E8F0' };
const miniTh = { padding: '8px 12px', textAlign: 'left', color: '#64748B', fontWeight: '600' };
const miniTd = { padding: '8px 12px', color: '#334155' };
const modalFooter = { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px', borderTop: '1px solid #E2E8F0', paddingWith: '16px 0 0 0', paddingBox: 'unset', paddingTop: '20px' };
const secondaryBtn = { padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' };
const submitBtn = { padding: '10px 20px', backgroundColor: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' };

export default TeacherModal;