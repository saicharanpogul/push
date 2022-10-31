import {Text, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {Header} from '../../components';

const Bookmark = () => {
  return (
    <View style={styles.screen}>
      <Header title="Bookmark" />
    </View>
  );
};

export default Bookmark;
