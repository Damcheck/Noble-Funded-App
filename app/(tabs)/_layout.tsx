import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/theme';
import { PieChart, Wallet, Trophy, Users, User } from 'lucide-react-native';

function TabBarBackground() {
  return (
    <BlurView
      intensity={40}
      tint="dark"
      style={StyleSheet.absoluteFill}
    />
  );
}

const TabIcon = ({
  focused,
  children,
}: {
  focused: boolean;
  children: React.ReactNode;
}) => (
  <View style={[styles.iconWrap, focused && styles.iconActive]}>
    {children}
  </View>
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarBackground: () => <TabBarBackground />,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: 'rgba(94,234,212,0.12)',
          backgroundColor: 'rgba(6,15,14,0.85)',
          elevation: 0,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.3,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Overview',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused}>
              <View style={{ opacity: focused ? 1 : 0.6 }}>
                <PieChart size={20} color={color} />
              </View>
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: 'Accounts',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused}>
              <View style={{ opacity: focused ? 1 : 0.6 }}>
                <Wallet size={20} color={color} />
              </View>
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Rankings',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused}>
              <View style={{ opacity: focused ? 1 : 0.6 }}>
                <Trophy size={20} color={color} />
              </View>
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="affiliate"
        options={{
          title: 'Affiliate',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused}>
              <View style={{ opacity: focused ? 1 : 0.6 }}>
                <Users size={20} color={color} />
              </View>
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused}>
              <View style={{ opacity: focused ? 1 : 0.6 }}>
                <User size={20} color={color} />
              </View>
            </TabIcon>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 40,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  iconActive: {
    backgroundColor: 'rgba(94,234,212,0.12)',
  },
});
