import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { sharedStyles as styles } from "./styles/shared";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    console.log("Email:", email, "Password:", password);
    router.push("/home");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/login.png")}
        style={styles.image}
      />

      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.link}>Register here</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push("/forget-password")}>
        <Text style={styles.link}>Forget password</Text>
      </TouchableOpacity>
    </View>
  );
}
