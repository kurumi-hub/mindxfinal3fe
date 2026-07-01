import React from "react";
import { useState } from "react";

const Sidebar = ({ onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState("Giáo Viên");

  const menuItems = [
    { name: "Thống Kê", page: "dashboard" },
    { name: "Lớp Học", page: "class" },
    { name: "Học Sinh", page: "student" },
    { name: "Giáo Viên", page: "teacher" },
    {
      name: "Dữ Liệu",
      children: [
        {
          name: "Vị Trí Công Tác",
          page: "teacher-position",
        },
      ],
    },
  ];

  return (
    <div style={sidebarContainer}>
      <div style={logoSection}>
        <div style={logoIcon}>🏫</div>
        <div>
          <div style={logoText}>MINDX SCHOOL</div>
          <div style={logoSubtext}>Hệ thống Quản lý</div>
        </div>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {menuItems.map((item, idx) => {
          const isActive = activeIndex === item.name;

          return (
            <React.Fragment key={idx}>
              <div
                onClick={() => {
                  setActiveIndex(item.name);
                  if (item.page) {
                    onNavigate(item.page);
                  }
                }}
                style={{
                  ...menuItemStyle,
                  cursor: "pointer",
                  backgroundColor: isActive ? "#EFF6FF" : "transparent",
                  color: isActive ? "#2563EB" : "#64748B",
                  fontWeight: isActive ? "600" : "500",
                }}
              >
                <span style={{ marginRight: "12px" }}>
                  {isActive ? "👤" : "📁"}
                </span>

                {item.name}

                {isActive && <div style={activeIndicator} />}
              </div>

              {item.children && isActive && (
                <div style={{ marginLeft: "40px" }}>
                  {item.children.map((child) => (
                    <div
                      key={child.name}
                      onClick={()=>onNavigate(child.page)}
                      style={{
                        padding: "8px 0",
                        cursor: "pointer",
                        color: "#64748B",
                      }}
                    >
                      {child.name}
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

const sidebarContainer = {
  width: "260px",
  backgroundColor: "#FFFFFF",
  borderRight: "1px solid #E2E8F0",
  height: "100vh",
  padding: "24px 16px",
  position: "fixed",
  left: 0,
  top: 0,
};

const logoSection = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "32px",
  padding: "0 8px",
};

const logoIcon = {
  width: "40px",
  height: "40px",
  backgroundColor: "#2563EB",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
};

const logoText = {
  fontWeight: "700",
  fontSize: "15px",
  color: "#1E293B",
  letterSpacing: "0.5px",
};
const logoSubtext = { fontSize: "11px", color: "#94A3B8", marginTop: "2px" };
const menuItemStyle = {
  display: "flex",
  alignItems: "center",
  padding: "12px 14px",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer",
  position: "relative",
  transition: "all 0.2s ease",
};
const activeIndicator = {
  position: "absolute",
  right: "0",
  top: "25%",
  height: "50%",
  width: "4px",
  backgroundColor: "#2563EB",
  borderRadius: "4px 0 0 4px",
};

export default Sidebar;
