// 引入必要的库和组件
import { Constants } from 'expo';
import { Platform, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

// MeasureLayout组件用于测量和返回其子组件的布局信息
// 它提供了一个包装器，可以在子组件渲染之前测量布局，并将布局信息传递给子组件
export default class MeasureLayout extends React.Component {
  // 定义组件的属性类型
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  // 初始化组件的状态
  state = {
    layout: null,
  };

  // 处理布局事件，更新组件的状态
  handleLayout = event => {
    // 提取布局信息，根据平台调整Y坐标以考虑状态栏高度
    const { nativeEvent: { layout } } = event;

    this.setState({
      layout: {
        ...layout,
        y:
          layout.y +
          (Platform.OS === 'android' ? Constants.statusBarHeight : 0),
      },
    });
  };

  // 渲染组件
  render() {
    const { children } = this.props;
    const { layout } = this.state;

    // Measure the available space with a placeholder view set to flex 1
    // 如果布局信息尚未测量，则显示一个占位视图并测量其布局
    if (!layout) {
      return <View onLayout={this.handleLayout} style={styles.container} />;
    }

    // 将测量得到的布局信息传递给子组件
    return children(layout);
  }
}

// 定义样式，用于占位视图
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});