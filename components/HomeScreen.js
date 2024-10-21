// HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../AuthContext';

const HomeScreen = ({ navigation }) => {
  const { userData, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.navigate('Login'); // Quay lại màn hình đăng nhập
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Màn Hình Chính</Text>
      {userData.length > 0 && (
        <>
          <Text style={styles.infoText}>Tên đăng nhập: {userData[userData.length - 1].username}</Text>
          <Text style={styles.infoText}>Số điện thoại: {userData[userData.length - 1].phoneNumber}</Text>
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Đăng Xuất</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('AccountList')}
      >
        <Text style={styles.buttonText}>Xem Tất Cả Tài Khoản</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
