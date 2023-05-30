import {ProgressChart} from 'react-native-chart-kit';
import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  Dimensions,
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
import {CircularProgressBase} from 'react-native-circular-progress-indicator';

function ProgressChartApp(props: any): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    marginBottom: 8,
  };
  const chartConfig = {
    backgroundGradientFrom: '#eff1f3',
    backgroundGradientFromOpacity: 0.5,
    backgroundGradientTo: '#eff1f3',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 0) => `rgba(242, 242, 242, ${opacity})`,
    strokeWidth: 0, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
    withHorizontalLabels: false,
  };
  const data = {
    data: [0, 0, 0, 1, 1, 1],
    colors:
      props.number === 0
        ? ['#eff1f3', '#eff1f3', '#eff1f3', '#a5e990', '#19c232', '#cff2d6']
        : ['#eff1f3', '#eff1f3', '#eff1f3', '#fba58c', '#f16946', '#f6e5e0'],
  };

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
            backgroundColor: 'transparent',
            position: 'relative',
          }}>
          <ProgressChart
            hasLegend={false}
            data={data}
            width={Dimensions.get('window').width}
            height={300}
            strokeWidth={16}
            radius={20}
            chartConfig={chartConfig}
            hideLegend={true}
            withCustomBarColorFromData={true}
          />
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 30,
                color: 'black',
                fontFamily: 'The Jamsil OTF 3 Regular',
              }}>
              {props.number === 0 ? '깨끗' : '청소'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProgressChartApp;
