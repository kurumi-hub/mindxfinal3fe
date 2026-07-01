import React, { useState } from "react";

const PositionModal = ({ onClose, onSuccess }) => {

    const [formData, setFormData] = useState({
        code: "",
        name: "",
        description: "",
        isActive: true
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        if (onSuccess) {
            onSuccess(formData);
        }
    };

    return (
        <div style={modalOverlay}>
            <div style={modalCard}>

                {/* Header */}

                <div style={modalHeader}>

                    <div>
                        <h3 style={title}>
                            Tạo vị trí công tác
                        </h3>

                        <p style={subTitle}>
                            Thêm vị trí công tác mới
                        </p>
                    </div>

                    <button
                        style={closeBtn}
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                {/* Body */}

                <form
                    onSubmit={handleSubmit}
                    style={modalBody}
                >

                    <div style={formGroup}>

                        <label style={label}>
                            Mã vị trí
                        </label>

                        <input
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            style={input}
                            placeholder="VD: GV"
                        />

                    </div>

                    <div style={formGroup}>

                        <label style={label}>
                            Tên vị trí
                        </label>

                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={input}
                            placeholder="Giảng viên"
                        />

                    </div>

                    <div style={formGroup}>

                        <label style={label}>
                            Mô tả
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            style={textarea}
                            rows={5}
                            placeholder="Nhập mô tả..."
                        />

                    </div>

                    <div style={formGroup}>

                        <label style={label}>
                            Trạng thái
                        </label>

                        <div style={radioGroup}>

                            <label>

                                <input
                                    type="radio"
                                    checked={formData.isActive}
                                    onChange={() =>
                                        setFormData({
                                            ...formData,
                                            isActive: true
                                        })
                                    }
                                />

                                Hoạt động

                            </label>

                            <label>

                                <input
                                    type="radio"
                                    checked={!formData.isActive}
                                    onChange={() =>
                                        setFormData({
                                            ...formData,
                                            isActive: false
                                        })
                                    }
                                />

                                Ngừng hoạt động

                            </label>

                        </div>

                    </div>

                    <div style={footer}>

                        <button
                            type="button"
                            style={cancelBtn}
                            onClick={onClose}
                        >
                            Hủy
                        </button>

                        <button
                            type="submit"
                            style={saveBtn}
                        >
                            Lưu
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
};

export default PositionModal;


/* ======================================================
                        STYLES
====================================================== */

const modalOverlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,.35)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
};

const modalCard = {
    width: "520px",
    background: "#fff",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0,0,0,.2)"
};

const modalHeader = {
    padding: "20px",
    borderBottom: "1px solid #E2E8F0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
};

const title = {
    margin: 0,
    fontSize: "20px",
    fontWeight: 600
};

const subTitle = {
    margin: "5px 0 0",
    color: "#64748B",
    fontSize: "13px"
};

const closeBtn = {
    border: "none",
    background: "none",
    fontSize: "22px",
    cursor: "pointer"
};

const modalBody = {
    padding: "24px"
};

const formGroup = {
    marginBottom: "20px"
};

const label = {
    display: "block",
    marginBottom: "8px",
    fontWeight: 600,
    color: "#334155"
};

const input = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #CBD5E1",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box"
};

const textarea = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #CBD5E1",
    borderRadius: "8px",
    resize: "vertical",
    fontSize: "14px",
    boxSizing: "border-box"
};

const radioGroup = {
    display: "flex",
    gap: "30px"
};

const footer = {
    marginTop: "30px",
    borderTop: "1px solid #E2E8F0",
    paddingTop: "20px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px"
};

const cancelBtn = {
    padding: "10px 20px",
    border: "none",
    background: "#E2E8F0",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600
};

const saveBtn = {
    padding: "10px 20px",
    border: "none",
    background: "#2563EB",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600
};