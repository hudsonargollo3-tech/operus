import React from 'react';
import { Tabs } from 'expo-router';
import { Calendar, Users, ShieldCheck, UserCheck } from 'lucide-react-native';
import { colors } from '../../src/theme/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.cyanLight,
        tabBarInactiveTintColor: colors.textDim,
        tabBarStyle: {
          backgroundColor: colors.bg,
          borderTopColor: colors.border,
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: colors.bg,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Cirurgias',
          headerTitle: 'Operus Surgical Hub',
          tabBarIcon: ({ color, size }) => <Calendar color={color} size={size || 22} />,
        }}
      />
      <Tabs.Screen
        name="pacientes"
        options={{
          title: 'Pacientes',
          headerTitle: 'Prontuários & Pacientes',
          tabBarIcon: ({ color, size }) => <Users color={color} size={size || 22} />,
        }}
      />
      <Tabs.Screen
        name="tcle"
        options={{
          title: 'TCLE Digital',
          headerTitle: 'Central de Consentimento CFM',
          tabBarIcon: ({ color, size }) => <ShieldCheck color={color} size={size || 22} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Cirurgião',
          headerTitle: 'Perfil Clínico & Segurança',
          tabBarIcon: ({ color, size }) => <UserCheck color={color} size={size || 22} />,
        }}
      />
    </Tabs>
  );
}
