import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSettingsStore } from '../stores/settingsStore';
import { User, Apple, Mail, Plus, Trash2 } from 'lucide-react-native';

const providerIcon = (provider: string) => {
  switch (provider.toLowerCase()) {
    case 'google':
      return <Mail size={22} color="#ea4335" />;
    case 'apple':
      return <Apple size={22} color="#000" />;
    default:
      return <User size={22} color="#64748b" />;
  }
};

const ConnectedAccountsCard = () => {
  const accounts = useSettingsStore(s => s.connectedAccounts);

  // Stub handlers
  const addAccount = () => {
    // TODO: Integrate OAuth
    alert('Add account (not implemented)');
  };
  const removeAccount = (provider: string) => {
    // TODO: Remove account logic
    alert(`Remove ${provider} (not implemented)`);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Connected Accounts</Text>
      <View style={styles.accountsList}>
        {accounts.map((acc) => (
          <View key={acc.provider} style={styles.accountRow}>
            <View style={styles.iconBox}>{providerIcon(acc.provider)}</View>
            {acc.avatar ? (
              <Image source={{ uri: acc.avatar }} style={styles.avatar} />
            ) : null}
            <Text style={styles.email}>{acc.email}</Text>
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => removeAccount(acc.provider)}
            >
              <Trash2 size={16} color="#ef4444" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addBtn} onPress={addAccount}>
          <Plus size={18} color="#fff" />
          <Text style={styles.addText}>Add Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 12,
  },
  accountsList: {
    gap: 10,
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  iconBox: {
    width: 32,
    alignItems: "center",
    marginRight: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  email: {
    flex: 1,
    fontSize: 15,
    color: "#334155",
    fontWeight: "600",
  },
  removeBtn: {
    backgroundColor: "#fee2e2",
    borderRadius: 8,
    padding: 6,
    marginLeft: 8,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18b888",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  addText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    marginLeft: 6,
  },
});

export default ConnectedAccountsCard; 