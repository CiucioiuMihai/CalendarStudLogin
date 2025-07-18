import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const router = useRouter();
  const { user, student, loading, logout } = useAuth();
  const [isReady, setIsReady] = useState(false);
  
  const checkAuthStatus = useCallback(async () => {
    if (loading) {
      console.log("Auth still loading...");
      return; // Still loading auth state
    }
    
    if (!user) {
      console.log("No user found, redirecting to login");
      router.replace("/(auth)/login");
      return;
    }
    
    console.log("User authenticated:", user.email);
    console.log("Student profile:", student ? "Found" : "Not found");
    setIsReady(true);
  }, [loading, user, router, student]);

  useEffect(() => {
    // Check authentication status on load
    checkAuthStatus();
  }, [user, loading, checkAuthStatus]);
  
  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error signing out:", error);
      Alert.alert("Error", "Could not sign out. Please try again.");
    }
  };

  if (loading || !isReady) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Redirecting to login...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home!</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Email: {user.email}</Text>
        {student ? (
          <View style={styles.studentInfo}>
            <Text style={styles.infoText}>Nume: {student.Nume} {student.Prenume}</Text>
            <Text style={styles.infoText}>Grupa: {student.Grupa}</Text>
            <Text style={styles.infoText}>An: {student.An}</Text>
            <Text style={styles.infoText}>Specializare: {student.Specializare}</Text>
          </View>
        ) : (
          <Text style={styles.warningText}>Nu a fost găsit profilul de student</Text>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
  },
  infoContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    maxWidth: 400,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  studentInfo: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  warningText: {
    fontSize: 16,
    color: "#f39c12",
    fontStyle: "italic",
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
