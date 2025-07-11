import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { sharedStyles as styles } from "./styles/shared";

export default function ForgetPasswordScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleReset = () => {
    console.log("Reset password for:", email);
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forget Password</Text>

      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Send email</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text style={styles.link}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </View>
  );
}
