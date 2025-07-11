import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../../lib/supabase"; // 👈 Import Supabase
import { sharedStyles as styles } from "../../styles/shared";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert("Registration failed", error.message);
    } else {
      Alert.alert("Success", "Check your email to confirm your account.");
      router.replace("/login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create an account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text style={styles.link}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </View>
  );
}
