import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldCheck, Clock, ExternalLink, QrCode, FileCheck, CheckCircle2 } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../src/theme/colors';
import { mockTermos } from '../../src/lib/mock-data';

export default function TcleScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Compliance Header Card */}
      <View style={styles.complianceCard}>
        <View style={styles.complianceTop}>
          <ShieldCheck size={28} color={colors.emerald} />
          <View style={{ flex: 1 }}>
            <Text style={styles.complianceTitle}>Resolução CFM nº 2.299/2021</Text>
            <Text style={styles.complianceSub}>
              Assinatura digital autenticada com hash SHA-256, telemetria IP e geolocalização.
            </Text>
          </View>
        </View>
        <View style={styles.badgeRow}>
          <View style={styles.tagCfmPreview}>
            <CheckCircle2 size={12} color={colors.emerald} />
            <Text style={styles.tagCfmPreviewText}>Validade Jurídica Plena</Text>
          </View>
          <View style={styles.tagCfmPreview}>
            <FileCheck size={12} color={colors.cyanLight} />
            <Text style={styles.tagCfmPreviewText}>Anti-Glosa Prévio</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Termos de Consentimento Emitidos</Text>

      {mockTermos.map((termo) => {
        const isSigned = termo.status_aceite === 'aceito';

        return (
          <TouchableOpacity 
            key={termo.id} 
            style={styles.termoCard}
            activeOpacity={0.8}
            onPress={() => router.push(`/tcle/${termo.id}`)}
          >
            <View style={styles.termoHeader}>
              <Text style={styles.termoPatient}>{termo.paciente?.nome}</Text>
              <View style={[
                styles.statusTag,
                { backgroundColor: isSigned ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)' }
              ]}>
                {isSigned ? (
                  <CheckCircle2 size={12} color={colors.emerald} />
                ) : (
                  <Clock size={12} color={colors.status.pending} />
                )}
                <Text style={[
                  styles.statusTagText,
                  { color: isSigned ? colors.emerald : colors.status.pending }
                ]}>
                  {isSigned ? 'Assinado' : 'Aguardando'}
                </Text>
              </View>
            </View>

            <Text style={styles.termoTitle}>{termo.titulo}</Text>

            {/* Hash & Verification details */}
            <View style={styles.hashBox}>
              <Text style={styles.hashLabel}>TOKEN HASH SHA-256:</Text>
              <Text style={styles.hashValue} numberOfLines={1} ellipsizeMode="middle">
                {termo.token_aceite}
              </Text>
              {isSigned && (
                <Text style={styles.hashMeta}>
                  Validado em {new Date(termo.data_aceite!).toLocaleString('pt-BR')} • IP: {termo.ip_aceite}
                </Text>
              )}
            </View>

            {/* Actions */}
            <View style={styles.cardActions}>
              <TouchableOpacity 
                style={styles.actionBtn}
                onPress={() => router.push(`/tcle/${termo.id}`)}
              >
                <QrCode size={14} color={colors.cyanLight} />
                <Text style={styles.actionBtnText}>Exibir QR Code</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionBtnPrimary}
                onPress={() => router.push(`/tcle/${termo.id}`)}
              >
                <ExternalLink size={14} color="#FFF" />
                <Text style={styles.actionBtnPrimaryText}>Ver Documento</Text>
              </TouchableOpacity>
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
  complianceCard: {
    backgroundColor: 'rgba(8, 145, 178, 0.08)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(8, 145, 178, 0.25)',
    marginBottom: spacing.lg,
  },
  complianceTop: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  complianceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  complianceSub: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
    lineHeight: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  tagCfmPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.card,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  tagCfmPreviewText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  termoCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  termoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  termoPatient: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  statusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  statusTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  termoTitle: {
    fontSize: 13,
    color: colors.cyanLight,
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
  hashBox: {
    backgroundColor: colors.bg,
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  hashLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textDim,
    letterSpacing: 0.5,
  },
  hashValue: {
    fontSize: 12,
    fontFamily: 'Courier',
    color: colors.textMuted,
    marginTop: 2,
  },
  hashMeta: {
    fontSize: 11,
    color: colors.emerald,
    marginTop: 4,
  },
  cardActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    backgroundColor: colors.cardHover,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionBtnText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  actionBtnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
  },
  actionBtnPrimaryText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
