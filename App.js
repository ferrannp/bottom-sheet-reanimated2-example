import * as React from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet/src/index'; // TODO patch
import Animated, {
  Extrapolate,
  interpolateNode as interpolate,
  Value,
} from 'react-native-reanimated';

const {height: windowHeight} = Dimensions.get('window');
const snapPointsFromTop = [96, windowHeight - 128];

const App = () => {
  const bottomSheetRef = React.useRef(null);

  const animatedPosition = React.useRef(new Value(0));
  const opacity = interpolate(animatedPosition.current, {
    inputRange: [0, 1],
    outputRange: [0, 0.75],
    extrapolate: Extrapolate.CLAMP,
  });

  const renderRow = React.useCallback(
    ({index}) => <Text>{`Row: ${index + 1}`}</Text>,
    [],
  );

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: 'lightgrey'}} />
      <Animated.View
        pointerEvents="box-none"
        style={[
          StyleSheet.absoluteFillObject,
          {backgroundColor: 'black', opacity},
        ]}
      />
      <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
        <TouchableOpacity
          style={[styles.iconContainer, {right: 16}]}
          onPress={() => {
            bottomSheetRef.current?.snapTo(1);
          }}
          borderless>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
      <ScrollBottomSheet
        ref={bottomSheetRef}
        componentType="FlatList"
        topInset={24}
        animatedPosition={animatedPosition.current}
        snapPoints={snapPointsFromTop}
        initialSnapIndex={1}
        renderHandle={() => null}
        keyExtractor={(i) => `row-${i}`}
        initialNumToRender={5}
        contentContainerStyle={styles.contentContainerStyle}
        data={Array.from({length: 100}).map((_, i) => String(i))}
        renderItem={renderRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    backgroundColor: '#F3F4F9',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  icon: {
    paddingTop: Platform.OS === 'ios' ? 4 : 0,
    paddingLeft: Platform.OS === 'ios' ? 2 : 0,
  },
  panelHandle: {
    width: 40,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 4,
    marginBottom: 10,
  },
});

export default App;
