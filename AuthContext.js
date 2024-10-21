// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tạo context
const AuthContext = createContext();

// Tạo Provider component
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState([]); // Danh sách tất cả tài khoản đã đăng nhập

  useEffect(() => {
    const loadUserData = async () => {
      const savedUserData = await AsyncStorage.getItem('userData');
      if (savedUserData) {
        setUserData(JSON.parse(savedUserData));
      }
    };

    loadUserData();
  }, []);

  const saveUserData = async (data) => {
    const updatedUserData = [...userData, data]; // Thêm tài khoản mới vào danh sách
    await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
    setUserData(updatedUserData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userData'); // Xóa danh sách tài khoản đã lưu
    setUserData([]); // Reset lại dữ liệu
  };

  return (
    <AuthContext.Provider value={{ userData, saveUserData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
