import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
      <Text style={styles.subtitle}>This text using Ubuntu font</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Go to second screen")}
      >
        <Text style={styles.buttonText}>Go to second screen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logout}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 14, marginBottom: 30 },
  button: {
    backgroundColor: "#3b82f6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  logout: {
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 10,
  },
  logoutText: { color: "#fff", fontWeight: "bold" },
});
