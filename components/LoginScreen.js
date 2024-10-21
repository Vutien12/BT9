// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CustomTextInput from './CustomTextInput';
import { useAuth } from '../AuthContext';

const LoginScreen = ({ navigation }) => {
  const { saveUserData, userData } = useAuth(); // Lấy userData từ AuthContext
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const isValidPhoneNumber = (number) => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(number);
  };

  const handleLogin = () => {
    if (!username || !password || !phoneNumber) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }
    
    if (!isValidPhoneNumber(phoneNumber)) {
      Alert.alert('Thông báo', 'Số điện thoại không hợp lệ. Vui lòng nhập lại.');
      return;
    }

    // Kiểm tra xem tài khoản đã tồn tại hay chưa
    const accountExists = userData.some(user => user.username === username && user.phoneNumber === phoneNumber);
    if (accountExists) {
      Alert.alert('Thông báo', 'Tài khoản đã tồn tại.');
      return;
    }

    // Lưu thông tin người dùng và điều hướng đến HomeScreen
    saveUserData({ username, password, phoneNumber });
    navigation.navigate('Home'); // Điều hướng đến màn hình chính
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đăng Nhập</Text>
      <CustomTextInput
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
      />
      <CustomTextInput
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <CustomTextInput
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
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

export default LoginScreen;
