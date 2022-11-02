import {Image, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {useRef} from 'react';
import {scale, ScaledSheet} from 'react-native-size-matters';
import Video from 'react-native-video';
import SimpleToast from 'react-native-simple-toast';
import RBSheet from 'react-native-raw-bottom-sheet';

import colors from '../theme/colors';
import {isIOS, truncateAddress} from '../utils';
import {BookmarkActiveIcon, BookmarkIcon} from '../assets/icons';
import {useAppDispatch, useAppSelector} from '../hooks/useRedux';
import {
  bookmarkNFT,
  getTokenIds,
  removeBookmarkedNFT,
} from '../redux/reducers/bookmark';
import VideoView from './VideoView';

type Props = {
  styles?: ViewStyle;
  data: NFT;
};

const ListAsset: React.FC<Props> = ({styles, data}) => {
  const bottomSheetRefVideo = useRef<RBSheet>();
  const dispatch = useAppDispatch();
  const tokenIds = useAppSelector(getTokenIds);
  const isBookmarked = tokenIds.includes(data.tokenId);
  return (
    <TouchableOpacity
      style={defaultStyles.container}
      onPress={
        isIOS
          ? () => SimpleToast.show('Video not support on iOS')
          : () => SimpleToast.show('Press and hold.')
      }
      onLongPress={
        isIOS ? () => {} : () => bottomSheetRefVideo.current?.open()
      }>
      <View style={defaultStyles.data}>
        <Video
          style={defaultStyles.video}
          poster={data.imageUri}
          paused={true}
          posterResizeMode="cover"
          volume={0}
          resizeMode="cover"
          source={{
            uri: data.videoUri,
            type: 'video/webm',
          }}
        />
        <View style={defaultStyles.info}>
          <Text style={defaultStyles.id}>#{data.tokenId}</Text>
          <Text style={defaultStyles.title} numberOfLines={1}>
            {data.name}
          </Text>
          <Text style={defaultStyles.owner}>{truncateAddress(data.owner)}</Text>
        </View>
      </View>
      <View style={defaultStyles.actions}>
        <TouchableOpacity
          onPress={() => {
            if (isBookmarked) {
              dispatch(removeBookmarkedNFT({data}));
              SimpleToast.show(
                `Bookmarked ${data.name} removed!`,
                SimpleToast.LONG,
              );
            } else {
              dispatch(bookmarkNFT({data}));
              SimpleToast.show(`Bookmarked ${data.name}!`, SimpleToast.LONG);
            }
          }}>
          <Image
            source={isBookmarked ? BookmarkActiveIcon : BookmarkIcon}
            style={defaultStyles.icon}
          />
        </TouchableOpacity>
        <RBSheet
          ref={bottomSheetRefVideo}
          height={scale(280)}
          customStyles={{
            container: {
              backgroundColor: colors.background.main,
            },
          }}>
          <VideoView data={data} />
        </RBSheet>
      </View>
    </TouchableOpacity>
  );
};

export default ListAsset;

const defaultStyles = ScaledSheet.create({
  container: {
    width: '100%',
    margin: '10@s',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  data: {
    flexDirection: 'row',
  },
  id: {
    color: colors.secondary.light,
    fontSize: '14@s',
    fontWeight: '800',
    marginBottom: '2@s',
  },
  title: {
    width: '160@s',
    color: colors.secondary.light,
    fontSize: '14@s',
    fontWeight: '600',
    marginBottom: '2@s',
  },
  info: {
    marginStart: '10@s',
  },
  video: {
    width: '60@s',
    height: '60@s',
    backgroundColor: colors.background.main,
    borderRadius: '4@s',
  },
  owner: {
    color: colors.secondary.light,
    fontSize: '12@s',
    fontWeight: '400',
    marginTop: '2@s',
  },
  actions: {
    marginHorizontal: '10@s',
  },
  icon: {
    width: '30@s',
    height: '30@s',
  },
});
