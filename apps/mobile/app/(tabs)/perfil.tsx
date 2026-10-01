import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Switch, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Fingerprint, 
  Hospital, 
  Bell, 
  LogOut, 
  ChevronRight, 
  Check,
  Award
} from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../src/theme/colors';
import { mockSurgeon } from '../../src/lib/mock-data';
import { checkBiometricSupport, authenticateWithBiometrics } from '../../src/lib/biometrics';

export default function PerfilScreen() {
  const router = useRouter();
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [biometryLabel, setBiometryLabel] = useState('Face ID / Biometria');

  useEffect(() => {
    checkBiometricSupport().then(res => {
      if (res.biometryType) {
        setBiometryLabel(res.biometryType);
      }
    });
  }, []);

  const handleToggleBiometrics = async (val: boolean) => {
    if (val) {
      const ok = await authenticateWithBiometrics('Confirmar ativação de biometria cirúrgica');
      if (ok) {
        setBiometricsEnabled(true);
      }
    } else {
      setBiometricsEnabled(false);
    }
  };

  const handleTestBiometrics = async () => {
    const ok = await authenticateWithBiometrics('Teste de assinatura cirúrgica rápida');
    if (ok) {
      Alert.alert('Autenticado com Sucesso', 'Sua chave médica biométrica está ativa e validada.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Surgeon Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarInitials}>RS</Text>
        </View>
        <Text style={styles.surgeonName}>{mockSurgeon.nome}</Text>
        <Text style={styles.surgeonCrm}>{mockSurgeon.crm}</Text>
        <Text style={styles.surgeonSpec}>{mockSurgeon.especialidade}</Text>
        <View style={styles.clinicTag}>
          <Award size={12} color={colors.cyanLight} />
          <Text style={styles.clinicTagText}>{mockSurgeon.clinica}</Text>
        </View>
      </View>

      {/* Security & Biometrics Section */}
      <Text style={styles.sectionHeader}>Segurança & Assinatura Digital</Text>
      <View style={styles.settingsGroup}>
        <View style={styles.settingRow}>
          <View style={styles.settingIcon}>
            <Fingerprint size={20} color={colors.cyanLight} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingTitle}>Desbloqueio com {biometryLabel}</Text>
            <Text style={styles.settingDesc}>Autorização instantânea para TCLE e cirurgias</Text>
          </View>
          <Switch
            value={biometricsEnabled}
            onValueChange={handleToggleBiometrics}
            trackColor={{ false: colors.cardHover, true: colors.primary }}
            thumbColor="#FFF"
          />
        </View>

        <TouchableOpacity 
          style={styles.actionRow}
          onPress={handleTestBiometrics}
        >
          <Text style={styles.actionRowText}>Testar Verificação Biométrica</Text>
          <ChevronRight size={16} color={colors.textDim} />
        </TouchableOpacity>
      </View>

      {/* Hospital Preferences */}
      <Text style={styles.sectionHeader}>Hospitais & Credenciamento</Text>
      <View style={styles.settingsGroup}>
        <View style={styles.settingRow}>
          <View style={styles.settingIcon}>
            <Hospital size={20} color={colors.emerald} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingTitle}>Hospital Sírio-Libanês</Text>
            <Text style={styles.settingDesc}>Credenciamento Ativo • Sala Robótica</Text>
          </View>
          <Check size={18} color={colors.emerald} />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingIcon}>
            <Hospital size={20} color={colors.emerald} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingTitle}>Hospital Albert Einstein</Text>
            <Text style={styles.settingDesc}>Credenciamento Ativo</Text>
          </View>
          <Check size={18} color={colors.emerald} />
        </View>
      </View>

      {/* Notifications */}
      <Text style={styles.sectionHeader}>Notificações Cirúrgicas</Text>
      <View style={styles.settingsGroup}>
        <View style={styles.settingRow}>
          <View style={styles.settingIcon}>
            <Bell size={20} color={colors.cyanLight} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingTitle}>Alertas de Entrega OPME</Text>
            <Text style={styles.settingDesc}>Avisar assim que a caixa estéril der entrada</Text>
          </View>
          <Switch value={true} trackColor={{ false: colors.cardHover, true: colors.primary }} thumbColor="#FFF" />
        </View>
      </View>

      {/* Logout */}
      <TouchableOpacity 
        style={styles.logoutBtn}
        onPress={() => router.replace('/auth')}
      >
        <LogOut size={16} color={colors.danger} />
        <Text style={styles.logoutText}>Bloquear Sessão Operus</Text>
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
  profileCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarInitials: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
  },
  surgeonName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  surgeonCrm: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.cyanLight,
    marginTop: 2,
  },
  surgeonSpec: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  clinicTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(8, 145, 178, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    marginTop: spacing.sm,
  },
  clinicTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.cyanLight,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  settingsGroup: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cardHover,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  settingDesc: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  actionRowText: {
    fontSize: 13,
    color: colors.cyanLight,
    fontWeight: '600',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    marginTop: spacing.md,
  },
  logoutText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '700',
  },
});
