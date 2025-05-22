import React from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export const ThemedPasswordInput = ({
  value,
  onChangeText,
  placeholder = 'Password',
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        secureTextEntry={!showPassword}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6b7280"
      />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setShowPassword(!showPassword)}
        accessible
        accessibilityLabel={showPassword ? '隐藏密码' : '显示密码'}
      >
        {showPassword ? (
          <FontAwesome name="eye-slash" size={20} color="#6b7280" />
        ) : (
          <FontAwesome name="eye" size={20} color="#6b7280" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 40,
    paddingVertical: 8,
  },
  iconContainer: {
    paddingLeft: 8,
    paddingRight: 4,
  },
});
