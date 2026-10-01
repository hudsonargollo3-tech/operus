import * as LocalAuthentication from 'expo-local-authentication';
import * as Haptics from 'expo-haptics';

export async function checkBiometricSupport(): Promise<{
  isAvailable: boolean;
  biometryType: string;
}> {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

    let biometryType = 'Biometria';
    if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      biometryType = 'Face ID';
    } else if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      biometryType = 'Touch ID / Impressão Digital';
    }

    return {
      isAvailable: hasHardware && isEnrolled,
      biometryType,
    };
  } catch (e) {
    return {
      isAvailable: false,
      biometryType: 'Não disponível',
    };
  }
}

export async function authenticateWithBiometrics(reason: string = 'Autenticação Cirúrgica Operus'): Promise<boolean> {
  try {
    const { isAvailable } = await checkBiometricSupport();
    if (!isAvailable) {
      return true; // Fallback for dev / simulators without biometrics
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: reason,
      fallbackLabel: 'Usar Senha Médica',
      cancelLabel: 'Cancelar',
      disableDeviceFallback: false,
    });

    if (result.success) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return true;
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return false;
    }
  } catch (error) {
    console.error('Biometric authentication error:', error);
    return false;
  }
}
