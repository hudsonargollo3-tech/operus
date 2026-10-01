import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  RefreshControl 
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Clock, 
  MapPin, 
  ShieldCheck, 
  ShieldAlert, 
  ChevronRight, 
  CheckCircle2, 
  Activity,
  Layers
} from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../src/theme/colors';
import { mockCirurgias } from '../../src/lib/mock-data';

export default function SurgicalHubScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'todas' | 'autorizada' | 'em_autorizacao'>('todas');
  const [refreshing, setRefreshing] = useState(false);

  const filteredSurgeries = mockCirurgias.filter(c => {
    if (filter === 'todas') return true;
    return c.status === filter;
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.cyanLight} />
      }
    >
      {/* Top Banner: Quick Telemetry Stats */}
      <View style={styles.kpiContainer}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiValue}>02</Text>
          <Text style={styles.kpiLabel}>Hoje (Aptas)</Text>
          <View style={styles.kpiDot} />
        </View>
        <View style={styles.kpiCard}>
          <Text style={[styles.kpiValue, { color: colors.status.pending }]}>01</Text>
          <Text style={styles.kpiLabel}>Em Autorização</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={[styles.kpiValue, { color: colors.emerald }]}>100%</Text>
          <Text style={styles.kpiLabel}>TCLEs Assinados</Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        <TouchableOpacity 
          style={[styles.filterChip, filter === 'todas' && styles.filterChipActive]}
          onPress={() => setFilter('todas')}
        >
          <Text style={[styles.filterText, filter === 'todas' && styles.filterTextActive]}>Todas (3)</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterChip, filter === 'autorizada' && styles.filterChipActive]}
          onPress={() => setFilter('autorizada')}
        >
          <Text style={[styles.filterText, filter === 'autorizada' && styles.filterTextActive]}>Autorizadas (2)</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterChip, filter === 'em_autorizacao' && styles.filterChipActive]}
          onPress={() => setFilter('em_autorizacao')}
        >
          <Text style={[styles.filterText, filter === 'em_autorizacao' && styles.filterTextActive]}>Pendente (1)</Text>
        </TouchableOpacity>
      </View>

      {/* Surgical Cards List */}
      <Text style={styles.sectionTitle}>Fila Cirúrgica & Mapas de Sala</Text>

      {filteredSurgeries.map((cirurgia) => {
        const isReady = cirurgia.status === 'autorizada';
        const formattedDate = new Date(cirurgia.data_cirurgia).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        });

        return (
          <TouchableOpacity
            key={cirurgia.id}
            style={styles.surgeryCard}
            activeOpacity={0.8}
            onPress={() => router.push(`/cirurgia/${cirurgia.id}`)}
          >
            {/* Header: Time & Status Badge */}
            <View style={styles.cardHeader}>
              <View style={styles.timeBadge}>
                <Clock size={14} color={colors.cyanLight} />
                <Text style={styles.timeText}>{formattedDate} • {cirurgia.duracao_estimada_minutos} min</Text>
              </View>
              <View style={[
                styles.statusBadge, 
                { backgroundColor: isReady ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)' }
              ]}>
                {isReady ? (
                  <CheckCircle2 size={12} color={colors.emerald} />
                ) : (
                  <Activity size={12} color={colors.status.pending} />
                )}
                <Text style={[
                  styles.statusBadgeText,
                  { color: isReady ? colors.emerald : colors.status.pending }
                ]}>
                  {isReady ? 'Liberada' : 'Em Análise'}
                </Text>
              </View>
            </View>

            {/* Patient & Main Procedure */}
            <Text style={styles.patientName}>{cirurgia.paciente?.nome}</Text>
            <Text style={styles.procedureName}>
              {cirurgia.procedimentos?.[0]?.descricao || 'Procedimento Cirúrgico'}
            </Text>

            {/* Hospital & Location */}
            <View style={styles.hospitalRow}>
              <MapPin size={14} color={colors.textMuted} />
              <Text style={styles.hospitalText}>{cirurgia.hospital_nome} — {cirurgia.sala_cirurgica}</Text>
            </View>

            {/* Badges: OPME & TCLE */}
            <View style={styles.tagsRow}>
              {cirurgia.necessita_opme ? (
                <View style={styles.tagOpme}>
                  <Layers size={12} color="#38BDF8" />
                  <Text style={styles.tagOpmeText}>{cirurgia.status_opme}</Text>
                </View>
              ) : (
                <View style={styles.tagSimple}>
                  <Text style={styles.tagSimpleText}>Sem OPME</Text>
                </View>
              )}

              <View style={styles.tagTcle}>
                {isReady ? (
                  <ShieldCheck size={12} color={colors.emerald} />
                ) : (
                  <ShieldAlert size={12} color={colors.status.pending} />
                )}
                <Text style={[styles.tagTcleText, { color: isReady ? colors.emerald : colors.status.pending }]}>
                  TCLE CFM
                </Text>
              </View>

              <View style={{ flex: 1 }} />
              <ChevronRight size={18} color={colors.textDim} />
            </View>
          </TouchableOpacity>
        );
      })}
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
  kpiContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  kpiLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  kpiDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.emerald,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryLight,
  },
  filterText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  surgeryCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(8, 145, 178, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  timeText: {
    color: colors.cyanLight,
    fontSize: 12,
    fontWeight: '700',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  patientName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  procedureName: {
    fontSize: 14,
    color: colors.cyanLight,
    fontWeight: '500',
    marginBottom: 8,
  },
  hospitalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.md,
  },
  hospitalText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  tagOpme: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  tagOpmeText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '600',
  },
  tagSimple: {
    backgroundColor: colors.cardHover,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  tagSimpleText: {
    color: colors.textDim,
    fontSize: 11,
  },
  tagTcle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  tagTcleText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
