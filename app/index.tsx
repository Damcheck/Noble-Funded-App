import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAppStore } from '@/store/appStore';
import { View, StyleSheet } from 'react-native';

export default function Index() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060f0e',
  },
});
