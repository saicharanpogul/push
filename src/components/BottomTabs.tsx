import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Bookmark, NFTs} from '../screens';
import {
  BookmarkActiveIcon,
  BookmarkIcon,
  NFTsActiveIcon,
  NFTsIcon,
} from '../assets/icons';
import {
  createBottomTabNavigator,
  BottomTabBarButtonProps,
} from '@react-navigation/bottom-tabs';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator<TabBarParamList>();

const BottomTabs = ({}: BottomTabBarButtonProps) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background.main,
          height: 56,
          borderTopColor: colors.background.main,
        },
        activeTintColor: colors.primary.main,
      }}>
      <Tab.Screen
        name="NFTs"
        component={NFTs}
        options={() => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={styles.icons}
                source={focused ? NFTsActiveIcon : NFTsIcon}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={() => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={styles.icons}
                source={focused ? BookmarkActiveIcon : BookmarkIcon}
              />
            );
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  icons: {
    width: 30,
    height: 30,
  },
});
