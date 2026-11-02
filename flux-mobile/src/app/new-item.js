import { useState } from "react";
import {
    View, Text, TextInput, Pressable, ScrollView, ActivityIndicator, StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { createItem } from "../api/items";

const CATEGORIES = {
    gasto: ["contas", "mercado", "transporte", "manutenções", "lazer", "outro gasto"],
    ganho: ["salário", "vale", "outro ganho"],
};

export default function NewItem() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [type, setType] = useState("gasto");
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function selectType(newType) {
        setType(newType);
        setCategory(null);
    }

    async function handleSave() {
        const numericValue = parseFloat(value.replace(",", "."));

        if (!title.trim()) {
            setError("Informe um título.");
            return;
        }
        if (!category) {
            setError("Escolha uma categoria.");
        }

        setLoading(true);
        setError(null);
        try {
            await createItem({ title: title.trim(), value: numericValue, type, category });
            router.back();
        } catch (e) {
            setError(e.response ? "O servidor recusou os dados." : "Sem conexão com o servidor.");
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Nova transação</Text>
                <Pressable onPress={() => router.back()}>
                    <Text style={styles.cancel}>Cancelar</Text>
                </Pressable>
            </View>

            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={styles.typeRow}>
                    {["gasto", "ganho"].map((t) => (
                        <Pressable
                            key={t}
                            style={[styles.typeButton, type === t && styles.typeButtonActive]}
                            onPress={() => selectType(t)}
                        >
                            <Text style={[styles.typeText, type === t && styles.typeTextActive]}>
                                {t === "gasto" ? "Gasto" : "Ganho"}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Título"
                    placeholderTextColor="#374151"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Valor (ex: 25,90)"
                    placeholderTextColor="#374151"
                    value={value}
                    onChangeText={setValue}
                    keyboardType="decimal-pad"
                />

                <Text style={styles.label}>Categoria</Text>
                <View style={styles.chips}>
                    {CATEGORIES[type].map((c) => (
                        <Pressable
                            key={c}
                            style={[styles.chip, category === c && styles.chipActive]}
                            onPress={() => setCategory(c)}
                        >
                            <Text style={[styles.chipText, category === c && styles.chipTextActive]}>
                                {c}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                {error && <Text style={styles.error}>{error}</Text>}

                <Pressable
                    style={[styles.saveButton, loading && styles.saveDisabled]}
                    onPress={handleSave}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveText}>Salvar</Text>
                    )}
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 16, backgroundColor: "#09090b" },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 16 },
    title: { fontSize: 24, fontWeight: "bold", color: "#f54900" },
    cancel: { backgroundColor: "#18181b", color: "#9f9fa9", fontWeight: "600", paddingVertical: 3, paddingHorizontal: 6, borderWidth: 1, borderColor: "#9f9fa9" },
    typeRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
    typeButton: { flex: 1, padding: 12, borderWidth: 1, borderColor: "#9f9fa9", alignItems: "center" },
    typeButtonActive: { backgroundColor: "#f54900", borderColor: "#f54900" },
    typeText: { fontWeight: "600", color: "#374151" },
    typeTextActive: { color: "#fff" },
    input: { borderWidth: 1, color: "#9f9fa9", borderColor: "#9f9fa9", padding: 12, marginBottom: 12 },
    label: { fontWeight: "600", marginBottom: 16, color: "#9f9fa9" },
    chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
    chip: { paddingVertical: 8, paddingHorizontal: 14, borderWidth: 1, borderColor: "#9f9fa9" },
    chipActive: { backgroundColor: "#9f9fa9", borderColor: "#9f9fa9" },
    chipText: { color: "#374151" },
    chipText: { color: "#374151" },
    chipTextActive: { color: "#09090b", fontWeight: "600" },
    error: { color: "#dc2626", marginBottom: 12 },
    saveButton: { backgroundColor: "#16a34a", padding: 14, alignItems: "center" },
    saveDisabled: { opacity: 0.6 },
    saveText: { color: "#fff", fontWeight: "600" },
});