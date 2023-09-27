import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import { fetchLocationId, fetchWeather } from './utils/api';
import getImageForWeather from './utils/getImageForWeather';

import SearchInput from './components/SearchInput';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: false,
      location: '',
      temperature: 0,
      weather: '',
    };
  }

  componentDidMount() {
    this.handleUpdateLocation('San Francisco');
  }

  handleUpdateLocation = async city => {
    if (!city) return;

    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(
          locationId,
        );

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature, //setState使用对象简写形式,对象属性值也使用简写,属性名与变量名一致时可以省略属性名
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true,
        });
      }
    });
  };

  render() {
    const { loading, error, location, weather, temperature } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
              {/* <ActivityIndicator>组件用于显示加载动画指示器。
              在这个代码中:<ActivityIndicator animating={loading} color="white" size="large" />
              作用和含义如下:
              - ActivityIndicator 是加载动画组件
              - animating={loading}
                - loading 是来自组件状态的加载状态变量
                - 当loading为true时,动画会启动旋转
                - 根据loading状态控制动画是否启动
              - color="white"
                - 设置动画颜色为白色
              - size="large"
                - 设置动画大小为大尺寸
              所以这行代码的功能是:
              - 根据组件状态loading的值,控制动画是否启动
              - 当loading为true时,显示大尺寸的白色加载动画
              - 通过状态管理动画的显示/隐藏
              一般来说:
              - 使用ActivityIndicator显示加载状态
              - 根据状态变量控制它的显示
              - 设置合适的大小和颜色
              这样就实现了基于状态控制的加载动画显示。  */}
            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather, please try a different city.
                  </Text>
                )}

                {!error && (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {weather}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {`${Math.round(temperature)}°`}
                    </Text>
                  </View>
                )}

                <SearchInput
                  placeholder="Search any city"
                  onSubmit={this.handleUpdateLocation}
                />
              </View>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});
