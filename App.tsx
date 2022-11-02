import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import colors from './src/theme/colors';
import {BottomTabs, navigationRef} from './src/components';

const Stack = createNativeStackNavigator<TabBarParamList>();
const NativeStack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const StackScreens = () => {
    const NativeStackScreens = () => {
      return (
        <NativeStack.Navigator screenOptions={{headerShown: false}}>
          <NativeStack.Screen name="BottomTabs" component={BottomTabs} />
        </NativeStack.Navigator>
      );
    };
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Root"
          component={NativeStackScreens}
          options={{gestureEnabled: false}}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaView style={styles.backgroundTopStyle} />
      <SafeAreaView style={styles.backgroundBottomStyle}>
        <StatusBar
          barStyle={
            Platform.OS === 'ios'
              ? 'light-content'
              : isDarkMode
              ? 'light-content'
              : 'dark-content'
          }
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <StackScreens />
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  backgroundTopStyle: {
    flex: 0,
    backgroundColor: colors.background.dark,
  },
  backgroundBottomStyle: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
});

export default App;
