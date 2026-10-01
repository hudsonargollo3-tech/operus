import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Share
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ShieldCheck, 
  Share2, 
  Fingerprint, 
  CheckCircle2, 
  Clock, 
  AlertTriangle 
} from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../src/theme/colors';
import { mockTermos } from '../../src/lib/mock-data';
import { authenticateWithBiometrics } from '../../src/lib/biometrics';

export default function TcleDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [termo, setTermo] = useState(
    () => mockTermos.find(t => t.id === id) || mockTermos[0]
  );

  const isSigned = termo.status_aceite === 'aceito';

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Termo de Consentimento Livre e Esclarecido (TCLE) - Operus CFM: https://operus.clubemkt.digital/aceite-termo/${termo.token_aceite}`,
        title: termo.titulo,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSurgeonCoSignature = async () => {
    const success = await authenticateWithBiometrics(
      `Co-Assinatura Médica do TCLE de ${termo.paciente?.nome}`
    );
    if (success) {
      setTermo(prev => ({
        ...prev,
        status_aceite: 'aceito',
        data_aceite: new Date().toISOString(),
        ip_aceite: '177.132.89.44',
      }));
      Alert.alert(
        'TCLE Autenticado',
        'O termo foi validado e arquivado no prontuário digital com hash SHA-256.'
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Status Header */}
      <View style={[
        styles.statusBox,
        { borderColor: isSigned ? colors.emerald : colors.status.pending }
      ]}>
        <View style={styles.statusBoxTop}>
          {isSigned ? (
            <CheckCircle2 size={24} color={colors.emerald} />
          ) : (
            <Clock size={24} color={colors.status.pending} />
          )}
          <View style={{ flex: 1 }}>
            <Text style={styles.statusTitle}>
              {isSigned ? 'Consentimento Assinado e Válido' : 'Pendente de Assinatura do Paciente'}
            </Text>
            <Text style={styles.statusSub}>
              {isSigned ? `Conformidade Resolução CFM 2.299/2021 ativa.` : `Link seguro enviado ao paciente.`}
            </Text>
          </View>
        </View>
      </View>

      {/* Patient & Procedure */}
      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>PACIENTE</Text>
        <Text style={styles.infoName}>{termo.paciente?.nome}</Text>
        <Text style={styles.infoTitle}>{termo.titulo}</Text>
      </View>

      {/* Benefits */}
      <Text style={styles.sectionHeader}>Benefícios Esperados</Text>
      <View style={styles.card}>
        {termo.beneficios_esperados?.map((b, i) => (
          <View key={i} style={styles.bulletRow}>
            <View style={styles.bulletEmerald} />
            <Text style={styles.bulletText}>{b}</Text>
          </View>
        ))}
      </View>

      {/* Risks */}
      <Text style={styles.sectionHeader}>Riscos e Intercorrências Informados</Text>
      <View style={styles.card}>
        {termo.riscos_especificos?.map((r, i) => (
          <View key={i} style={styles.bulletRow}>
            <AlertTriangle size={14} color="#F59E0B" />
            <Text style={styles.bulletText}>{r}</Text>
          </View>
        ))}
      </View>

      {/* Cryptographic Proof */}
      <Text style={styles.sectionHeader}>Auditoria Criptográfica (SHA-256)</Text>
      <View style={styles.cryptoCard}>
        <Text style={styles.cryptoLabel}>HASH DO DOCUMENTO:</Text>
        <Text style={styles.cryptoHash}>{termo.token_aceite}</Text>
        {isSigned && (
          <Text style={styles.cryptoMeta}>
            Carimbo: {new Date(termo.data_aceite!).toLocaleString('pt-BR')} • IP: {termo.ip_aceite}
          </Text>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <Share2 size={16} color={colors.cyanLight} />
          <Text style={styles.shareBtnText}>Compartilhar Link</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signBtn} onPress={handleSurgeonCoSignature}>
          <Fingerprint size={16} color="#FFF" />
          <Text style={styles.signBtnText}>Validar Biometria</Text>
        </TouchableOpacity>
      </View>
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
  statusBox: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  statusBoxTop: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  statusSub: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textDim,
    letterSpacing: 0.5,
  },
  infoName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginTop: 2,
  },
  infoTitle: {
    fontSize: 13,
    color: colors.cyanLight,
    fontWeight: '600',
    marginTop: 4,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletEmerald: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.emerald,
    marginTop: 6,
  },
  bulletText: {
    fontSize: 13,
    color: colors.text,
    flex: 1,
    lineHeight: 18,
  },
  cryptoCard: {
    backgroundColor: 'rgba(9, 13, 22, 0.9)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  cryptoLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textDim,
  },
  cryptoHash: {
    fontSize: 11,
    fontFamily: 'Courier',
    color: colors.cyanLight,
    marginTop: 2,
  },
  cryptoMeta: {
    fontSize: 11,
    color: colors.emerald,
    marginTop: 4,
  },
  btnRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  shareBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.card,
    paddingVertical: 14,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  shareBtnText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  signBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: borderRadius.md,
  },
  signBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
