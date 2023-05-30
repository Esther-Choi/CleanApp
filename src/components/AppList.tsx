import {Button} from 'react-native';
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

function AppList(appName: any): JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
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
          }}>
          <Text
            style={{
              fontSize: 18,
              //   fontWeight: 500,
              color: 'black',
            }}>
            {appName}
          </Text>
          <View style={{}}>
            <Text
              style={{
                fontSize: 15,
                // fontWeight: 700,
                backgroundColor: '#ff471a',
                color: 'white',
                padding: 5,
                borderRadius: 8,
                width: 50,
                textAlign: 'center',
              }}>
              삭제
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default AppList;
