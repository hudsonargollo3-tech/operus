import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Phone, User, AlertCircle, ChevronRight, FileText } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../src/theme/colors';
import { mockPacientes } from '../../src/lib/mock-data';

export default function PacientesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = mockPacientes.filter(p => 
    p.nome.toLowerCase().includes(search.toLowerCase()) ||
    (p.cpf && p.cpf.includes(search))
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Search Input Bar */}
      <View style={styles.searchBar}>
        <Search size={18} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nome, CPF ou convênio..."
          placeholderTextColor={colors.textDim}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Patient Count */}
      <Text style={styles.sectionHeader}>
        Base Clínica Ativa ({filtered.length})
      </Text>

      {/* List */}
      {filtered.map(paciente => (
        <View key={paciente.id} style={styles.patientCard}>
          <View style={styles.cardTop}>
            <View style={styles.avatar}>
              <User size={20} color={colors.cyanLight} />
            </View>
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>{paciente.nome}</Text>
              <Text style={styles.patientMeta}>
                CPF: {paciente.cpf} • Nasc: {paciente.data_nascimento}
              </Text>
            </View>
          </View>

          {/* Medical Notes / Allergies */}
          {paciente.observacoes_medicas && (
            <View style={styles.alertBox}>
              <AlertCircle size={14} color="#F59E0B" />
              <Text style={styles.alertText}>{paciente.observacoes_medicas}</Text>
            </View>
          )}

          {/* Quick Details & Actions */}
          <View style={styles.cardFooter}>
            <View style={styles.contactRow}>
              <Phone size={12} color={colors.textDim} />
              <Text style={styles.contactText}>{paciente.telefone}</Text>
            </View>
            <TouchableOpacity 
              style={styles.historyBtn}
              onPress={() => router.push('/(tabs)/tcle')}
            >
              <FileText size={12} color={colors.cyanLight} />
              <Text style={styles.historyBtnText}>TCLE & Histórico</Text>
              <ChevronRight size={14} color={colors.cyanLight} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  patientCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(8, 145, 178, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  patientMeta: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    marginTop: spacing.sm,
  },
  alertText: {
    fontSize: 12,
    color: '#FCD34D',
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.md,
    paddingTop: spacing.sm,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contactText: {
    fontSize: 12,
    color: colors.textDim,
  },
  historyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  historyBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.cyanLight,
  },
});
