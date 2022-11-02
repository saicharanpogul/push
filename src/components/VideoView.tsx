import {Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import colors from '../theme/colors';
import {ScaledSheet} from 'react-native-size-matters';

type Props = {
  data: NFT;
};

const VideoView: React.FC<Props> = ({data}) => {
  return (
    <View>
      <Text style={styles.title}>{data.name}</Text>
      <View style={styles.webView}>
        <WebView
          scrollEnabled={false}
          overScrollMode="never"
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={{backgroundColor: 'transparent'}}
          scalesPageToFit={true}
          mixedContentMode="compatibility"
          source={{
            html: `
            <html>
            <div style='background: ${colors.background.main};'>
            <video class="video" controls muted width="940" height="940" style="">
            <source src="${data.videoUri}">
            </video>
            </div>
            <style>
            .video::-webkit-media-controls {
              transform: scale(3);
              -webkit-transform:scale(3);
              -moz-transform:scale(3);
              }
            <style>
            </html>
          `,
          }}
        />
      </View>
    </View>
  );
};

export default VideoView;

const styles = ScaledSheet.create({
  webView: {
    width: '220@s',
    height: '220@s',
    alignSelf: 'center',
  },
  title: {
    color: colors.secondary.light,
    fontSize: '14@s',
    fontWeight: '600',
    marginTop: '8@s',
    width: '100%',
    textAlign: 'center',
    marginBottom: '4@s',
  },
});
