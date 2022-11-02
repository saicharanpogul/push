/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {scale} from 'react-native-size-matters';

import styles from './styles';
import {Asset, Header, ListAsset} from '../../components';
import {wait} from '../../utils';
import {getNFTs} from '../../apis';
import colors from '../../theme/colors';
import {
  GridActiveIcon,
  GridIcon,
  ListActiveIcon,
  ListIcon,
} from '../../assets/icons';

const NFTs = () => {
  const [nfts, setNfts] = useState<any>([]);
  const [offset, setOffset] = useState(11);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isFetchingMore, setIsfetchingMore] = useState(false);
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [isList, setIsList] = useState(false);

  useEffect(() => {
    (async () => {
      if (!loading && !isFetchingMore) {
        try {
          setLoading(true);
          for (let i = 1; i < offset; i++) {
            console.log('useEffect: ', i);
            const {data} = await getNFTs(i.toString());
            setNfts((_nfts: any) => [..._nfts, data?.items[0]?.nft_data[0]]);
            setTokenIds(_tokenIds => [..._tokenIds, i]);
          }
        } catch (error) {
          console.log('Fetch Failed: ', error);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, []);

  const fetchMoreData = async (type: string) => {
    try {
      setIsfetchingMore(true);
      const _offset = offset;
      for (let i = _offset; i < offset + 10; i++) {
        if (i < 89 && !tokenIds.includes(i)) {
          console.log(`fetchMoreData[${type}]: `, i);
          const {data} = await getNFTs(i.toString());
          data?.items &&
            setNfts((_nfts: any) => [..._nfts, data?.items[0]?.nft_data[0]]);
          setTokenIds(_tokenIds => [..._tokenIds, i]);
        } else {
          setIsfetchingMore(false);
          return;
        }
      }
      setOffset(offset + 10);
      setIsfetchingMore(false);
    } catch (error) {
      setIsfetchingMore(false);
      console.log('Fetch Failed: ', error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.screen}>
      <Header title="NFTs" />
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Rockstars of EPNS V2</Text>
          <Text style={styles.subTitle}>ROCKSTARV2</Text>
        </View>
        <View style={styles.displayOption}>
          <TouchableOpacity onPress={() => setIsList(true)}>
            <Image
              source={isList ? ListActiveIcon : ListIcon}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsList(false)}>
            <Image
              source={!isList ? GridActiveIcon : GridIcon}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isList ? (
        <FlatList
          key={'_'}
          style={{
            paddingHorizontal: scale(16),
          }}
          contentContainerStyle={{
            paddingBottom: scale(40),
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor="#EEE"
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={nfts}
          keyExtractor={item => '_' + item?.token_id}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'large'} color={colors.primary.light} />
            </View>
          )}
          ListFooterComponent={() =>
            isFetchingMore ? (
              <View
                style={{
                  marginTop: scale(4),
                }}>
                <ActivityIndicator
                  size={'large'}
                  color={colors.primary.light}
                />
              </View>
            ) : null
          }
          numColumns={1}
          onEndReachedThreshold={0.1}
          onScrollEndDrag={
            isFetchingMore ? () => {} : () => fetchMoreData('list')
          }
          renderItem={({item}) => (
            <View style={styles.column}>
              <ListAsset
                data={{
                  name: item?.external_data?.name,
                  imageUri: item?.external_data?.image,
                  owner: item?.owner,
                  videoUri: item?.external_data?.animation_url,
                  tokenId: item?.token_id,
                }}
              />
            </View>
          )}
        />
      ) : (
        <FlatList
          key={'#'}
          style={{
            paddingHorizontal: scale(16),
          }}
          contentContainerStyle={{
            paddingBottom: scale(40),
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor="#EEE"
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={nfts}
          keyExtractor={item => '#' + item?.token_id}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'large'} color={colors.primary.light} />
            </View>
          )}
          ListFooterComponent={() =>
            isFetchingMore ? (
              <View
                style={{
                  marginTop: scale(4),
                }}>
                <ActivityIndicator
                  size={'large'}
                  color={colors.primary.light}
                />
              </View>
            ) : null
          }
          numColumns={2}
          onEndReachedThreshold={0.1}
          onScrollEndDrag={
            isFetchingMore ? () => {} : () => fetchMoreData('grid')
          }
          renderItem={({item}) => (
            <View style={styles.column}>
              <Asset
                data={{
                  name: item?.external_data?.name,
                  imageUri: item?.external_data?.image,
                  owner: item?.owner,
                  videoUri: item?.external_data?.animation_url,
                  tokenId: item?.token_id,
                }}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default NFTs;
