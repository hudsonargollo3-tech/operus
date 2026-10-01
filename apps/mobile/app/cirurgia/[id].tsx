import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Layers, 
  FileText, 
  CheckSquare, 
  Square,
  Stethoscope
} from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../src/theme/colors';
import { mockCirurgias } from '../../src/lib/mock-data';
import { authenticateWithBiometrics } from '../../src/lib/biometrics';

export default function CirurgiaDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const cirurgia = mockCirurgias.find(c => c.id === id) || mockCirurgias[0];

  const [checklist, setChecklist] = useState({
    jejumConfirmado: true,
    tcleValidado: true,
    examesPreOp: true,
    opmeEmSala: cirurgia.necessita_opme,
    anestesistaChecado: true,
    reservaSangue: false,
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAuthorizeRelease = async () => {
    const success = await authenticateWithBiometrics(
      `Autorização Cirúrgica para ${cirurgia.paciente?.nome}`
    );
    if (success) {
      Alert.alert(
        'Protocolo Cirúrgico Liberado',
        `A equipe cirúrgica do ${cirurgia.hospital_nome} foi notificada para início do ato operatório.`
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Info */}
      <View style={styles.topCard}>
        <View style={styles.statusRow}>
          <View style={styles.statusPill}>
            <Clock size={12} color={colors.cyanLight} />
            <Text style={styles.statusPillText}>
              {new Date(cirurgia.data_cirurgia).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} • {cirurgia.duracao_estimada_minutos} min
            </Text>
          </View>
          <View style={[styles.statusTag, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
            <Text style={[styles.statusTagText, { color: colors.emerald }]}>
              {cirurgia.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={styles.patientName}>{cirurgia.paciente?.nome}</Text>
        <Text style={styles.procedureTitle}>{cirurgia.procedimentos?.[0]?.descricao}</Text>

        <View style={styles.hospitalRow}>
          <MapPin size={14} color={colors.textMuted} />
          <Text style={styles.hospitalText}>{cirurgia.hospital_nome} ({cirurgia.sala_cirurgica})</Text>
        </View>
      </View>

      {/* TUSS Procedures & Billing Codes */}
      <Text style={styles.sectionHeader}>Procedimentos & Códigos TUSS</Text>
      <View style={styles.boxGroup}>
        {cirurgia.procedimentos?.map((p, index) => (
          <View key={p.id || index} style={styles.procRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.procDesc}>{p.descricao}</Text>
              <Text style={styles.procMeta}>TUSS: {p.codigo_tuss} • Via: {p.via_acesso} (100%)</Text>
            </View>
            <Text style={styles.procVal}>
              R$ {p.valor_estimado?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Text>
          </View>
        ))}
      </View>

      {/* OPME Material Box */}
      {cirurgia.necessita_opme && (
        <>
          <Text style={styles.sectionHeader}>Rastreabilidade OPME (ANVISA)</Text>
          <View style={styles.opmeCard}>
            <View style={styles.opmeTop}>
              <Layers size={18} color="#38BDF8" />
              <Text style={styles.opmeStatus}>{cirurgia.status_opme}</Text>
            </View>
            <Text style={styles.opmeDesc}>{cirurgia.opme_descricao}</Text>
          </View>
        </>
      )}

      {/* Pre-Op Safety Checklist (WHO Surgical Safety Protocol) */}
      <Text style={styles.sectionHeader}>Checklist de Segurança Cirúrgica (OMS)</Text>
      <View style={styles.boxGroup}>
        <TouchableOpacity style={styles.checkRow} onPress={() => toggleCheck('jejumConfirmado')}>
          {checklist.jejumConfirmado ? <CheckSquare size={18} color={colors.emerald} /> : <Square size={18} color={colors.textDim} />}
          <Text style={styles.checkText}>Jejum pré-operatório cumprido (&gt; 8h)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkRow} onPress={() => toggleCheck('tcleValidado')}>
          {checklist.tcleValidado ? <CheckSquare size={18} color={colors.emerald} /> : <Square size={18} color={colors.textDim} />}
          <Text style={styles.checkText}>TCLE assinado com carimbo criptográfico SHA-256</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkRow} onPress={() => toggleCheck('examesPreOp')}>
          {checklist.examesPreOp ? <CheckSquare size={18} color={colors.emerald} /> : <Square size={18} color={colors.textDim} />}
          <Text style={styles.checkText}>Avaliação cardiológica e risco cirúrgico anexados</Text>
        </TouchableOpacity>

        {cirurgia.necessita_opme && (
          <TouchableOpacity style={styles.checkRow} onPress={() => toggleCheck('opmeEmSala')}>
            {checklist.opmeEmSala ? <CheckSquare size={18} color={colors.emerald} /> : <Square size={18} color={colors.textDim} />}
            <Text style={styles.checkText}>Caixa de instrumentais e OPME conferidos em sala</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.checkRow} onPress={() => toggleCheck('anestesistaChecado')}>
          {checklist.anestesistaChecado ? <CheckSquare size={18} color={colors.emerald} /> : <Square size={18} color={colors.textDim} />}
          <Text style={styles.checkText}>Equipe de anestesia presente e ciente do plano</Text>
        </TouchableOpacity>
      </View>

      {/* Team Split */}
      <Text style={styles.sectionHeader}>Equipe Cirúrgica Escalada</Text>
      <View style={styles.boxGroup}>
        {cirurgia.equipe?.map((membro) => (
          <View key={membro.id} style={styles.teamRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.teamName}>{membro.membro_nome}</Text>
              <Text style={styles.teamRole}>{membro.funcao.replace('_', ' ').toUpperCase()} • {membro.crm}</Text>
            </View>
            <Text style={styles.teamRepasse}>
              R$ {membro.valor_honorario?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Text>
          </View>
        ))}
      </View>

      {/* Bottom Action: Biometric Sign-off */}
      <TouchableOpacity 
        style={styles.authorizeBtn}
        activeOpacity={0.8}
        onPress={handleAuthorizeRelease}
      >
        <Stethoscope size={20} color="#FFF" />
        <Text style={styles.authorizeBtnText}>Liberar Ato Cirúrgico com Biometria</Text>
      </TouchableOpacity>
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
  topCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(8, 145, 178, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  statusPillText: {
    color: colors.cyanLight,
    fontSize: 12,
    fontWeight: '700',
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  statusTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  patientName: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  procedureTitle: {
    fontSize: 15,
    color: colors.cyanLight,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  hospitalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  hospitalText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  boxGroup: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  procRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  procDesc: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  procMeta: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  procVal: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.emerald,
  },
  opmeCard: {
    backgroundColor: 'rgba(56, 189, 248, 0.06)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  opmeTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  opmeStatus: {
    fontSize: 12,
    fontWeight: '700',
    color: '#38BDF8',
  },
  opmeDesc: {
    fontSize: 12,
    color: colors.text,
    lineHeight: 16,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  checkText: {
    fontSize: 13,
    color: colors.text,
    flex: 1,
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  teamName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  teamRole: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  teamRepasse: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.cyanLight,
  },
  authorizeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.emeraldDark,
    borderRadius: borderRadius.md,
    paddingVertical: 16,
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.emerald,
  },
  authorizeBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
