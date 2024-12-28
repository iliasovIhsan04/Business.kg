import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import Header from '../components/Header';
import Container from '../assets/styles/components/Container';
import Column from '../assets/styles/components/Column';
import TextContent from '../assets/styles/components/TextContent';
import ButtonLayouts from '../layouts/buttonLayouts';
import { colors } from '../assets/styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from '../api/api';
import { useNavigation } from '@react-navigation/native';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorActivation, setErrorActivation] = useState({});
  const navigation = useNavigation();

  const postValue = {
    old_password: oldPassword,
    new_password: newPassword,
    confirm_password: confirmPassword,
  };

  const handleSubmit = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await url.post("auth/accounts/change-password/", postValue, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.data.response === true) {
        navigation.navigate("Profile");
      } else {
        setErrorActivation(response.data || {});
      }
    } catch (error) {
      setErrorActivation(error.response?.data || {});
    } finally {
      setLoading(false);
    }
  };
  return (
    <ButtonLayouts
      handle={handleSubmit}
      loading={loading}
      title="Обновить пароль"
      color={colors.blue}
    >
      <Container>
        <Header back={true}>Смена пароля</Header>
        <Column gap={16} style={{ marginTop: 16 }}>
          <Column gap={4}>
            <TextContent fontSize={14} fontWeight={400} color={colors.black}>
              Старый пароль
            </TextContent>
            <TextInput
              style={[styles.input, styles.input_from_gray]}
              placeholder="Введите старый пароль"
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            {errorActivation.old_password && (
              <Text style={styles.error_text_registr}>
                {errorActivation.old_password[0]}
              </Text>
            )}
                       {errorActivation.non_field_errors && (
              <Text style={styles.error_text_registr}>
                {errorActivation.non_field_errors}
              </Text>
            )}
          </Column>
          <Column gap={4}>
            <TextContent fontSize={14} fontWeight={400} color={colors.black}>
              Новый пароль
            </TextContent>
            <TextInput
              style={[styles.input]}
              placeholder="Введите новый пароль"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            {errorActivation.new_password && (
              <Text style={styles.error_text_registr}>
                {errorActivation.new_password[0]}
              </Text>
            )}
          </Column>
          <Column gap={4}>
            <TextContent fontSize={14} fontWeight={400} color={colors.black}>
              Повторите новый пароль
            </TextContent>
            <TextInput
              style={[styles.input]}
              placeholder="Повторите новый пароль"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {errorActivation.confirm_password && (
              <Text style={styles.error_text_registr}>
                {errorActivation.confirm_password[0]}
              </Text>
            )}
 
          </Column>
        </Column>
      </Container>
    </ButtonLayouts>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    color: colors.black,
    backgroundColor: colors.phon,
  },
  error_text_registr: {
    color:"red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default ChangePassword;
