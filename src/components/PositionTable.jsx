import { useState } from "react";

const PositionTable = ({ positions, onAddClick }) => {


  return (
    <div style={containerStyle}>
      {/* Breadcrumb */}
      <div style={breadcrumbStyle}>
        <span style={{ color: "#f59e0b", fontWeight: 600 }}>Dữ liệu</span>
        <span style={{ margin: "0 6px" }}>/</span>
        <span>Vị trí công tác</span>
      </div>

      {/* Card */}
      <div style={cardStyle}>
        {/* Toolbar */}
        <div style={toolbarStyle}>
          <button style={buttonStyle} onClick={onAddClick}>
            ＋ Tạo
          </button>
          <button style={buttonStyle}>↻ Làm mới</button>
        </div>

        {/* Table */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>STT</th>
              <th style={thStyle}>Mã</th>
              <th style={thStyle}>Tên</th>
              <th style={thStyle}>Trạng thái</th>
              <th style={thStyle}>Mô tả</th>
              <th style={thStyle}></th>
            </tr>
          </thead>

          <tbody>
            {positions.map((item, index) => (
              <tr key={item.id}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{item.code}</td>
                <td style={tdStyle}>{item.name}</td>

                <td style={tdStyle}>
                  <span
                    style={{
                      background: "#22c55e",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "5px",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    Hoạt động
                  </span>
                </td>

                <td style={tdStyle}>{item.description}</td>

                <td style={tdStyle}>
                  <button style={settingButton}>⚙</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PositionTable;

const containerStyle = {
  flex: 1,
  padding: "20px",
  background: "#f8fafc",
  minHeight: "100vh",
};

const breadcrumbStyle = {
  marginBottom: "15px",
  color: "#64748b",
  fontSize: "14px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "10px",
  padding: "18px",
  boxShadow: "0 1px 4px rgba(0,0,0,.08)",
};

const toolbarStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginBottom: "15px",
};

const buttonStyle = {
  border: "1px solid #ddd",
  background: "#fff",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  background: "#f5f3ff",
  color: "#475569",
  textAlign: "left",
  padding: "12px",
  fontWeight: 600,
  fontSize: "14px",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  fontSize: "14px",
};

const settingButton = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: "18px",
};