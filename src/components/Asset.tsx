/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useRef} from 'react';
import {scale, ScaledSheet} from 'react-native-size-matters';
// import Video from 'react-native-video';
import {useAppDispatch, useAppSelector} from '../hooks/useRedux';
import RBSheet from 'react-native-raw-bottom-sheet';
import SimpleToast from 'react-native-simple-toast';

import colors from '../theme/colors';
import {
  BookmarkActiveIcon,
  BookmarkedIcon,
  BookmarkIcon,
  PlayIcon,
} from '../assets/icons';
import {isIOS, truncateAddress} from '../utils';
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

const Asset: React.FC<Props> = ({styles, data}) => {
  const bottomSheetRef = useRef<RBSheet>();
  const bottomSheetRefVideo = useRef<RBSheet>();
  const dispatch = useAppDispatch();
  const tokenIds = useAppSelector(getTokenIds);
  const isBookmarked = tokenIds.includes(data.tokenId);
  return (
    <TouchableOpacity
      style={defaultStyles.container}
      onPress={() => {
        bottomSheetRef?.current?.open();
      }}>
      {isBookmarked && (
        <Image
          source={BookmarkedIcon}
          style={[
            defaultStyles.icon,
            {position: 'absolute', zIndex: 9, top: scale(-6), left: scale(-2)},
          ]}
        />
      )}
      <Image
        style={defaultStyles.video}
        // poster={data.imageUri}
        // paused={true}
        // posterResizeMode="cover"
        // volume={0}
        resizeMode="cover"
        // repeat={true}
        source={{
          // uri: data.videoUri,
          uri: data.imageUri,
          // type: 'video/webm',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={defaultStyles.title} numberOfLines={1}>
            {data.name}
          </Text>
          <Text style={defaultStyles.owner}>{truncateAddress(data.owner)}</Text>
        </View>
        {data.videoUri && !isIOS && (
          <TouchableOpacity onPress={() => bottomSheetRefVideo.current?.open()}>
            <Image source={PlayIcon} style={defaultStyles.play} />
          </TouchableOpacity>
        )}
      </View>
      <RBSheet
        ref={bottomSheetRef}
        height={scale(80)}
        customStyles={{
          container: {
            backgroundColor: colors.background.main,
          },
        }}>
        <TouchableOpacity
          style={defaultStyles.bottomSheet}
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
          <Text style={defaultStyles.button}>Bookmark</Text>
          <Image
            source={isBookmarked ? BookmarkActiveIcon : BookmarkIcon}
            style={defaultStyles.icon}
          />
        </TouchableOpacity>
      </RBSheet>
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
    </TouchableOpacity>
  );
};
export default Asset;

const defaultStyles = ScaledSheet.create({
  container: {
    width: '140@s',
    height: '180@s',
    margin: '10@s',
  },
  title: {
    width: '100@s',
    color: colors.secondary.light,
    fontSize: '14@s',
    fontWeight: '600',
    marginTop: '8@s',
  },
  video: {
    flex: 1,
    width: '140@s',
    height: '140@s',
    backgroundColor: colors.background.main,
    borderRadius: '4@s',
  },
  owner: {
    color: colors.secondary.light,
    fontSize: '12@s',
    fontWeight: '400',
    marginTop: '2@s',
  },
  bottomSheet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '20@s',
    paddingHorizontal: '16@s',
  },
  button: {
    color: colors.secondary.light,
    fontSize: '14@s',
    fontWeight: '600',
  },
  icon: {
    height: '28@s',
    width: '28@s',
  },
  play: {
    height: '35@s',
    width: '35@s',
  },
});
