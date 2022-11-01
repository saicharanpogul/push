import {Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import Video from 'react-native-video';

import colors from '../theme/colors';

type Props = {
  styles?: ViewStyle;
  data: {
    name: string;
    owner: string;
    videoUri?: string;
    imageUri: string;
    tokenId: string;
  };
};

const ListAsset: React.FC<Props> = ({styles, data}) => {
  return (
    <View style={defaultStyles.container}>
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
        <Text style={defaultStyles.id} numberOfLines={1}>
          #{data.tokenId}
        </Text>
        <Text style={defaultStyles.title} numberOfLines={1}>
          {data.name}
        </Text>
        <Text style={defaultStyles.owner}>{data.owner}</Text>
      </View>
    </View>
  );
};

export default ListAsset;

const defaultStyles = ScaledSheet.create({
  container: {
    width: '80%',
    margin: '10@s',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  id: {
    color: colors.secondary.light,
    fontSize: '14@s',
    fontWeight: '800',
    marginBottom: '2@s',
  },
  title: {
    width: '120@s',
    color: colors.secondary.light,
    fontSize: '14@s',
    fontWeight: '600',
    marginBottom: '2@s',
  },
  info: {
    marginStart: '10@s',
  },
  video: {
    // flex: 1,
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
});
