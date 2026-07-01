import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import SearchFilter from "./components/SearchFilter";
import TeacherTable from "./components/TeacherTable";
import TeacherModal from "./components/TeacherModal";
import PositionTable from "./components/PositionTable";
import PositionModal from "./components/PositionModal";


function App() {
  const [curentView, setCurrentView] = useState("teachers"); // 'teachers' or 'positions'

  const [teachers, setTeachers] = useState([]);
  const [positions, setPositions] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPositionModal, setShowPositionModal] = useState(false);

  const loadData = async () => {
    try {
      const teacherRes = await fetch("http://localhost:5000/api/teachers?page=1&limit=10");
      const teacherData = await teacherRes.json();

      const positionRes = await fetch(
        "http://localhost:5000/api/teachers/positions",
      );
      const positionData = await positionRes.json();

      setTeachers(teacherData.data);
      setFilteredTeachers(teacherData.data);
      setPositions(positionData);
    } catch (err) {
      console.error(
        "Error connecting with structural server database context layers:",
        err,
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter computation logic block runs on input change
  useEffect(() => {
    let result = [...teachers];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.code?.toLowerCase().includes(q) ||
          t.userId?.name?.toLowerCase().includes(q) ||
          t.userId?.email?.toLowerCase().includes(q),
      );
    }

    if (selectedPosition) {
      result = result.filter((t) =>
        t.teacherPositionsId?.some((pos) => pos._id === selectedPosition),
      );
    }

    setFilteredTeachers(result);
  }, [searchQuery, selectedPosition, teachers]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#F8FAFC",
      }}
    >
      <Sidebar onNavigate={setCurrentView} />

      {/* Main Viewport Content container shifted left to respect fixed Sidebar bounds */}
      <div style={{ marginLeft: "260px", flex: 1, padding: "40px 32px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "700",
              color: "#1E293B",
            }}
          >
            Hồ sơ nhân sự giảng dạy
          </h1>
          <p
            style={{ margin: "6px 0 0 0", color: "#64748B", fontSize: "14px" }}
          >
            Xem danh sách, tìm kiếm phân loại và cập nhật hồ sơ bằng cấp chuyên
            môn của giáo viên trường.
          </p>
        </div>
        {curentView === "teachers" && (
          <>
            <SearchFilter
              positions={positions}
              onSearchChange={setSearchQuery}
              onFilterChange={setSelectedPosition}
              onAddClick={() => setShowModal(true)}
            />

            <TeacherTable teachers={filteredTeachers} />
          </>
        )}

        {curentView === "teacher-position" && 
          <PositionTable
            positions={positions} 
            onAddClick={() => setShowPositionModal(true)}
          />}
      </div>

      {showModal && (
        <TeacherModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            loadData();
          }}
        />
      )}

      {showPositionModal && (
        <PositionModal
          onClose={() => setShowPositionModal(false)}
          onSuccess={() => {
            setShowPositionModal(false);
            loadData();
          }}
        />
      )}
    </div>
  );
}

export default App;
