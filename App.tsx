/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Header, HeaderProps} from '@rneui/themed';
import {NativeModules, NativeEventEmitter} from 'react-native';
import ProgressChart from './src/components/ProgressChart';
//@ts-ignore
import IntentLauncher, {IntentConstant} from 'react-native-intent-launcher';
import RNRestart from 'react-native-restart';
import {AppState} from 'react-native';
// import BackgroundFetch from 'react-native-background-fetch';
// import BackgroundFetch from 'react-native-background-fetch';
// import PushNotification from 'react-native-push-notification';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: '#eff1f3',
    paddingLeft: 3,
    paddingTop: 3,
    fontFamily: 'NotoSansKR-Black',
    height: '100%',
  };
  const {RNAndroidInstalledApps} = NativeModules;

  const [data, setData] = useState([]);
  const [appState, setAppState] = useState(AppState.currentState);

  // useEffect(() => {
  //   // Push notifications setup (recommend extracting into separate file)
  //   PushNotification.configure({
  //     // onNotification is called when a notification is to be emitted
  //     onNotification: notification => console.log(notification),

  //     // Permissions to register for iOS
  //     permissions: {
  //       alert: true,
  //       badge: true,
  //       sound: true,
  //     },
  //     popInitialNotification: true,
  //   });

  //   // Background fetch setup (recommend extracting into separate file)
  //   BackgroundFetch.configure(
  //     {
  //       minimumFetchInterval: 15, // fetch interval in minutes
  //     },
  //     async taskId => {
  //       console.log('Received background-fetch event: ', taskId);

  //       // 3. Insert code you want to run in the background, for example:
  //       getApplication();

  //       if (data.length > 0) {
  //         // 4. Send a push notification
  //         PushNotification.localNotification({
  //           title: 'Cold Weather Alert',
  //           message: `It's ${data.length} degrees outside.`,
  //           playSound: true,
  //           soundName: 'default',
  //         });
  //       }

  //       // Call finish upon completion of the background task
  //       BackgroundFetch.finish(taskId);
  //     },
  //     error => {
  //       console.error('RNBackgroundFetch failed to start.');
  //     },
  //   );
  // }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // Reload the list of installed apps here
        getApplication();
      }
      setAppState(nextAppState);
    };

    AppState.addEventListener('change', handleAppStateChange);
  }, [appState]);

  const openAppSettings = (packageName: any) => {
    try {
      IntentLauncher?.startActivity({
        action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
        data: 'package:' + packageName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getApplication = () => {
    // console.log(AppListModule);
    RNAndroidInstalledApps.getApps()
      // RNAndroidInstalledApps.getNonSystemApps()
      .then((apps: any) => {
        setData(
          apps.filter(
            (app: any) =>
              app.appName.includes('clean') ||
              app.appName.includes('Clean') ||
              app.appName.includes('CLEAN') ||
              app.appName.includes('청소') ||
              app.appName.includes('클리'),
          ),
        );
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // BackgroundFetch.configure({
    //   minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
    // }, async (taskId) => {
    //   // This is the background fetch event handler
    //   console.log('[BackgroundFetch HeadlessTask]:', taskId);
    //   // Do virus app detection and send notification here
    //   BackgroundFetch.finish(taskId);
    // }, (error) => {
    //   console.log('[BackgroundFetch] failed to start', error);
    // });

    // BackgroundFetch.configure(
    //   {
    //     minimumFetchInterval: 15, // minimum time in minutes between fetch events
    //     stopOnTerminate: false, // don't stop background fetch when app is terminated
    //     enableHeadless: true, // run in headless mode (no UI)
    //   },
    //   async () => {
    //     // This callback is called when a background fetch event is triggered
    //     // Register a BroadcastReceiver to listen for ACTION_PACKAGE_ADDED intent
    //     const onAppInstall = (event: any) => {
    //       const packageName = event.packageName;
    //       // Check if the newly installed app is a virus and send a notification if necessary
    //       console.log(packageName, '<<<appname');
    //     };
    //     const subscription = intentEventEmitter.addListener(
    //       'OnAppInstall',
    //       onAppInstall,
    //     );
    //     console.log('hello');

    //     // Wait for the listener to be registered
    //     await new Promise((resolve: any) => setTimeout(resolve, 1000));

    //     // Remove the listener after 5 seconds to avoid memory leaks
    //     setTimeout(() => subscription.remove(), 5000);

    //     // Call BackgroundFetch.finish() when the task is complete to signal that the event is finished
    //     BackgroundFetch.finish();
    //   },
    //   error => {
    //     console.log('[BackgroundFetch] Error:', error);
    //   },
    // );

    getApplication();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: '#eff1f3',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            {/* <Image
              source={require('./assets/images/applogo.png')}
              style={{
                width: 30,
                height: 40,
              }}
            /> */}
            <Text
              style={{
                fontSize: 17,
                color: '#2e302f',
                fontFamily: 'NotoSansKR-Regular.otf',
              }}>
              상태
            </Text>
          </View>
          <ProgressChart number={data.length} />
          {/* <Text onPress={getApplication}>clickddd</Text> */}

          {data.map((el: any) => (
            <>
              <View
                style={{
                  backgroundColor: 'white',
                  position: 'relative',
                  marginTop: 8,
                  marginBottom: 8,
                  marginRight: 25,
                  marginLeft: 25,
                  padding: 20,
                  borderRadius: 12,
                  height: 70,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // paddingTop: 30,
                  // paddingBottom: 30,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    //   fontWeight: 500,
                    color: 'black',
                    fontFamily: 'NotoSansKR-Bold.otf',
                  }}>
                  {el?.appName}
                </Text>
                <View style={{}}>
                  <Text
                    onPress={() => {
                      openAppSettings(el?.packageName);
                    }}
                    style={{
                      fontSize: 15,
                      // fontWeight: 700,
                      backgroundColor: '#ef6d4c',
                      color: 'white',
                      padding: 5,
                      borderRadius: 8,
                      width: 50,
                      textAlign: 'center',
                      fontFamily: 'NotoSansKR-Bold.otf',
                    }}>
                    삭제
                  </Text>
                </View>
              </View>
            </>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
