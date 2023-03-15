/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  AppOpenAd,
  TestIds,
  AdEventType,
  InterstitialAd,
} from 'react-native-google-mobile-ads';
import mobileAds from 'react-native-google-mobile-ads';
import {NativeModules} from 'react-native';
const {RNShare} = NativeModules;

const appOpenAd = AppOpenAd.createForAdRequest(
  'ca-app-pub-4198631347355498/4004883487',
  {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  },
);

const interstitial = InterstitialAd.createForAdRequest(
  'ca-app-pub-4198631347355498/2717181530',
  {
    keywords: ['fashion', 'clothing'],
  },
);
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    (async () => {
      await mobileAds().openAdInspector();
    })();
    if (Platform.OS === 'ios') {
      interstitial.load();
      interstitial.addAdEventsListener(ev => {
        console.log(ev);
      });
    } else {
      appOpenAd.load();
      appOpenAd.addAdEventsListener(ev => {
        console.log(ev);
      });
    }
  }, []);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{flex: 1, minHeight: '100%', backgroundColor: '#000'}}>
        <Button
          title="Show Interstitial"
          onPress={() => {
            interstitial.show();
          }}
        />
        <Button
          title="Share"
          onPress={() =>
            RNShare.open({message: 'Bridge with Swift Dev.to Tutorial'})
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
