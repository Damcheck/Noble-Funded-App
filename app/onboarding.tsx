import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Colors, Typography, Radius } from '@/constants/theme';
import { Shield, Activity, Wallet, Diamond } from 'lucide-react-native';
import AnimatedReanimated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../assets/images/page1.png'),
  },
  {
    id: '2',
    image: require('../assets/images/page2.png'),
  },
  {
    id: '3',
    image: require('../assets/images/page3.png'),
  },
  {
    id: '4',
    image: require('../assets/images/page4.png'),
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace('/(auth)/login');
    }
  };

  const handleSkip = () => {
    router.replace('/(auth)/login');
  };

  const getPaginatorIcon = (index: number, isActive: boolean) => {
    const color = isActive ? Colors.primary : Colors.textMuted;
    const size = isActive ? 24 : 20;
    
    switch (index) {
      case 0: return <Shield size={size} color={color} />;
      case 1: return <Activity size={size} color={color} />;
      case 2: return <Wallet size={size} color={color} />;
      case 3: return <Diamond size={size} color={color} />;
      default: return null;
    }
  };

  const PaginatorIcon = ({ index, isActive, onPress }: { index: number, isActive: boolean, onPress: () => void }) => {
    const scale = useSharedValue(isActive ? 1.15 : 1);
    const opacity = useSharedValue(isActive ? 1 : 0.6);

    React.useEffect(() => {
      scale.value = withSpring(isActive ? 1.15 : 1, { damping: 12, stiffness: 100 });
      opacity.value = withTiming(isActive ? 1 : 0.6, { duration: 300 });
    }, [isActive]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
      };
    });

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <AnimatedReanimated.View style={[styles.iconWrap, isActive && styles.iconWrapActive, animatedStyle]}>
          {getPaginatorIcon(index, isActive)}
        </AnimatedReanimated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Background Images Layer */}
      {slides.map((slide, i) => {
        const opacity = scrollX.interpolate({
          inputRange: [(i - 1) * width, i * width, (i + 1) * width],
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        });
        return (
          <Animated.Image
            key={slide.id}
            source={slide.image}
            style={[styles.bgImage, { opacity }]}
            resizeMode="cover"
          />
        );
      })}

      {/* Foreground Carousel just for swiping */}
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
        renderItem={() => (
          <View style={styles.slide} />
        )}
      />

      {/* Custom Paginator & Controls */}
      <View style={styles.bottomNav}>
        <View style={styles.navCard}>
          <View style={styles.navRow}>
            {slides.map((_, i) => (
              <PaginatorIcon
                key={i}
                index={i}
                isActive={i === currentIndex}
                onPress={() => {
                  flatListRef.current?.scrollToIndex({ index: i });
                  setCurrentIndex(i);
                }}
              />
            ))}
          </View>

          <View style={styles.btnRow}>
            <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNext} activeOpacity={0.85}>
              <LinearGradient
                colors={['#2dd4bf', '#0f3f3a']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.nextBtn}
              >
                {/* Metallic Highlight */}
                <LinearGradient
                  colors={['rgba(255,255,255,0.4)', 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={[StyleSheet.absoluteFill, { height: '50%', borderTopLeftRadius: Radius.md, borderTopRightRadius: Radius.md }]}
                />
                <Text style={styles.nextText}>
                  {currentIndex === slides.length - 1 ? 'Start Trading' : 'Next Step'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBg,
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
  },
  slide: {
    width,
    height,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 30, // Adjusted to fit perfectly in the empty bottom space of the image
    left: 20,
    right: 20,
  },
  navCard: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  iconWrapActive: {
    backgroundColor: 'rgba(13,148,136,0.3)',
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  skipText: {
    color: Colors.textMuted,
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
  },
  nextBtn: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'rgba(94, 234, 212, 0.4)',
  },
  nextText: {
    color: '#ffffff',
    fontSize: Typography.base,
    fontWeight: Typography.black,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
