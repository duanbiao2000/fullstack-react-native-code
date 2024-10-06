import { Constants } from 'expo';
import {
  NetInfo,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

/**
 * 网络状态组件，用于显示当前的网络连接状态
 * 通过监听网络变化事件，更新组件的状态，以反映当前的网络连接类型
 * 在iOS和Android平台上表现略有不同
 */
export default class Status extends React.Component {
  state = {
    connectionType: null, // 当前的网络连接类型
  };

  /**
   * 组件挂载前的异步操作
   * 订阅网络变化事件，获取初始的网络连接信息，并更新组件状态
   */
  async componentWillMount() {
    this.subscription = NetInfo.addEventListener(
      'connectionChange',
      this.handleChange,
    );

    const { type } = await NetInfo.getConnectionInfo();
    this.setState({ connectionType: type });
  }

  /**
   * 组件卸载前的操作
   * 取消网络变化事件的订阅，避免内存泄漏
   */
  componentWillUnmount() {
    this.subscription.remove();
  }

  /**
   * 网络连接类型变化的处理函数
   * @param {string} connectionType - 新的网络连接类型
   */
  handleChange = connectionType => {
    this.setState({ connectionType });
  };

  render() {
    const { connectionType } = this.state;

    const isConnected = connectionType !== 'none'; // 判断是否有网络连接
    const backgroundColor = isConnected ? 'white' : 'red'; // 根据网络状态设置背景颜色

    // 设置状态栏样式
    const statusBar = (
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isConnected ? 'dark-content' : 'light-content'}
        animated={false}
      />
    );

    // 渲染消息容器
    const messageContainer = (
      <View style={styles.messageContainer} pointerEvents={'none'}>
        {statusBar}
        {!isConnected && (
          <View style={styles.bubble}>
            <Text style={styles.text}>No network connection</Text>
          </View>
        )}
      </View>
    );

    // 根据操作系统不同，渲染不同的样式
    if (Platform.OS === 'ios') {
      return (
        <View style={[styles.status, { backgroundColor }]}>
          {messageContainer}
        </View>
      );
    }

    return messageContainer;
  }
}

// 根据操作系统设置状态栏高度
const statusHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: 'center',
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  },
});