// AccountListScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useAuth } from '../AuthContext';

const AccountListScreen = ({ navigation }) => {
  const { userData } = useAuth();

  const renderItem = ({ item }) => (
    <View style={styles.accountItem}>
      <Text style={styles.accountText}>Tên đăng nhập: {item.username}</Text>
      <Text style={styles.accountText}>Mật khẩu: {item.password}</Text>
      <Text style={styles.accountText}>Số điện thoại: {item.phoneNumber}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh Sách Tài Khoản</Text>
      <FlatList
        data={userData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')} // Quay lại màn hình chính
      >
        <Text style={styles.buttonText}>Quay Lại</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: '600',
  },
  accountItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  accountText: {
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AccountListScreen;
