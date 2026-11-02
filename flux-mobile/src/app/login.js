import { useState } from "react";
import { View, Text, Image, TextInput, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const { signIn } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleLogin() {
        setLoading(true);
        setError(null);
        try {
            await signIn(username, password);
        } catch (e) {
            if ([400, 401].includes(e.response?.status)) {
                setError("Usuário ou senha incorretos.");
            } else if (e.response) {
                setError("Erro no servidor. Tente novamente.");
            } else {
                setError("Sem conexão com o servidor.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/images/flux-logo-white.png')}
            />
            <Text style={styles.title}>Flux</Text>

            <TextInput
                style={styles.input}
                placeholder="Usuário"
                placeholderTextColor="#374151"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#374151"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {error && <Text style={styles.error}>{error}</Text>}

            <Pressable
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Entrar</Text>
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#09090b" },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 24, color: "#9f9fa9", textAlign: "center" },
    logo: { alignSelf: "center", width: 80, height: 80, marginBottom: 10 },
    input: { borderWidth: 1, color: "#9f9fa9", borderColor: "#9f9fa9", padding: 12, marginBottom: 12 },
    error: { color: "#dc2626", marginBottom: 12 },
    button: { backgroundColor: "#f54900", padding: 14, alignItems: "center" },
    buttonDisabled: {opacity: 0.6},
    buttonText: { color: "#fff", fontWeight: "600" },
});