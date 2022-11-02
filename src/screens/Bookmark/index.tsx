/* eslint-disable react-native/no-inline-styles */
import {FlatList, Text, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';

import styles from './styles';
import {Asset, Header} from '../../components';
import {useAppSelector} from '../../hooks/useRedux';
import {getNfts, resetBookmarks} from '../../redux/reducers/bookmark';
import WebView from 'react-native-webview';
import colors from '../../theme/colors';

const Bookmark = () => {
  const nfts = useAppSelector(getNfts);
  return (
    <View style={styles.screen}>
      <Header title="Bookmarked NFTs" />
      {/* <Text onPress={() => dispatch(resetBookmarks())}>Remove</Text> */}
      {/* <View
        style={{
          width: scale(200),
          height: scale(200),
          alignSelf: 'center',
        }}>
        <WebView
          scrollEnabled={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={{backgroundColor: 'transparent'}}
          scalesPageToFit={true}
          mixedContentMode="compatibility"
          source={{
            html: `
            <div style='background: ${colors.background.dark}; height: 100%; width: 100%;'>
            <video controls width="940" height="940">
            <source src="https://epns.mypinata.cloud/ipfs/QmdQqvKP1BAZs8ZjmXJCgQD4FaxikomYxJCmA1RqTRoTzv/88_chai_wala.webm">
            </video>
            </div>
          `,
          }}
        />
      </View> */}
      <FlatList
        style={{
          paddingHorizontal: scale(16),
        }}
        contentContainerStyle={{
          paddingBottom: scale(40),
        }}
        showsVerticalScrollIndicator={false}
        data={nfts}
        keyExtractor={item => item?.tokenId}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.noBookmarks}>No bookmarks</Text>
          </View>
        )}
        numColumns={2}
        renderItem={({item}) => (
          <View style={styles.column}>
            <Asset
              data={{
                name: item.name,
                imageUri: item.imageUri,
                owner: item?.owner,
                videoUri: item.videoUri,
                tokenId: item?.tokenId,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Bookmark;
