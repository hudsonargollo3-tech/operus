import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '../src/theme/colors';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={colors.bg} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.bg,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '700',
          },
          contentStyle: {
            backgroundColor: colors.bg,
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="cirurgia/[id]" 
          options={{ 
            title: 'Protocolo Cirúrgico',
            headerBackTitle: 'Voltar',
          }} 
        />
        <Stack.Screen 
          name="tcle/[id]" 
          options={{ 
            title: 'Validação TCLE Digital',
            presentation: 'modal',
          }} 
        />
        <Stack.Screen 
          name="auth" 
          options={{ 
            title: 'Acesso Médico',
            headerShown: false,
          }} 
        />
      </Stack>
    </SafeAreaProvider>
  );
}
