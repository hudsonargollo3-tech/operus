import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Fingerprint, Shield, Sparkles } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../src/theme/colors';
import { authenticateWithBiometrics } from '../src/lib/biometrics';

export default function AuthScreen() {
  const router = useRouter();

  const handleBiometricAuth = async () => {
    const success = await authenticateWithBiometrics('Desbloquear Operus Surgical Suite');
    if (success) {
      router.replace('/(tabs)');
    }
  };

  useEffect(() => {
    // Auto-prompt on launch
    handleBiometricAuth();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo / Badge */}
        <View style={styles.logoBadge}>
          <Shield size={36} color={colors.cyanLight} />
        </View>

        <Text style={styles.brandTitle}>OPERUS</Text>
        <Text style={styles.brandSubtitle}>Surgical Operating Suite</Text>
        <Text style={styles.doctorGreeting}>Dr. Roberto Silveira (CRM/SP 142.890)</Text>

        {/* Biometric Action Button */}
        <TouchableOpacity 
          style={styles.biometricBtn}
          activeOpacity={0.8}
          onPress={handleBiometricAuth}
        >
          <Fingerprint size={48} color={colors.cyanLight} />
          <Text style={styles.biometricBtnText}>Toque para Desbloquear com Biometria</Text>
          <Text style={styles.biometricSub}>Face ID / Touch ID Seguro</Text>
        </TouchableOpacity>

        {/* Fallback Pin / Bypass */}
        <TouchableOpacity 
          style={styles.pinBypassBtn}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.pinBypassText}>Acessar via Senha Médica</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Sparkles size={12} color={colors.emerald} />
        <Text style={styles.footerText}>Criptografia de Ponta a Ponta • CFM 2.299/2021</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'space-between',
    padding: spacing.xl,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(8, 145, 178, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.cyan,
    marginBottom: spacing.md,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
    color: colors.text,
  },
  brandSubtitle: {
    fontSize: 13,
    color: colors.cyanLight,
    fontWeight: '600',
    marginBottom: spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  doctorGreeting: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.xxl,
  },
  biometricBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.borderAccent,
    gap: spacing.sm,
  },
  biometricBtnText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  biometricSub: {
    color: colors.textDim,
    fontSize: 12,
  },
  pinBypassBtn: {
    marginTop: spacing.xl,
    paddingVertical: spacing.sm,
  },
  pinBypassText: {
    color: colors.cyanLight,
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingBottom: spacing.md,
  },
  footerText: {
    fontSize: 11,
    color: colors.textDim,
  },
});
