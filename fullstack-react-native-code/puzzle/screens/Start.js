// 导入必要的React Native组件和工具库
import { Animated, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

// 导入自定义组件
import Button from '../components/Button';
import Logo from '../components/Logo';
import Toggle from '../components/Toggle';

// 导入工具函数
import configureTransition from '../utils/configureTransition';
import sleep from '../utils/sleep';

// 定义状态常量，用于管理启动过程中的不同阶段
const State = {
  Launching: 'Launching',
  WillTransitionIn: 'WillTransitionIn',
  WillTransitionOut: 'WillTransitionOut',
};

// 定义棋盘尺寸选项
const BOARD_SIZES = [3, 4, 5, 6];

// Start组件是应用的启动屏幕
// 负责处理游戏启动过程中的动画和用户交互
export default class Start extends React.Component {
  // 定义组件的属性类型
  static propTypes = {
    onChangeSize: PropTypes.func.isRequired,
    onStartGame: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
  };

  // 初始化组件状态
  state = {
    transitionState: State.Launching,
  };

  // 创建Animated值，用于控制动画效果
  toggleOpacity = new Animated.Value(0);
  buttonOpacity = new Animated.Value(0);

  // 组件挂载后执行的异步操作
  async componentDidMount() {
    // 等待一段时间后再开始动画，以增加启动的仪式感
    await sleep(500);

    // 配置进入动画
    await configureTransition(() => {
      this.setState({ transitionState: State.WillTransitionIn });
    });

    // 开始执行toggle的动画
    Animated.timing(this.toggleOpacity, {
      toValue: 1,
      duration: 500,
      delay: 500,
      useNativeDriver: true,
    }).start();

    // 开始执行按钮的动画
    Animated.timing(this.buttonOpacity, {
      toValue: 1,
      duration: 500,
      delay: 1000,
      useNativeDriver: true,
    }).start();
  }

  // 处理开始游戏按钮按下事件
  handlePressStart = async () => {
    const { onStartGame } = this.props;

    // 配置退出动画
    await configureTransition(() => {
      this.setState({ transitionState: State.WillTransitionOut });
    });

    // 调用父组件传递的开始游戏函数
    onStartGame();
  };

  // 渲染组件
  render() {
    const { size, onChangeSize } = this.props;
    const { transitionState } = this.state;

    // 动态应用动画效果
    const toggleStyle = { opacity: this.toggleOpacity };
    const buttonStyle = { opacity: this.buttonOpacity };

    // 根据过渡状态渲染不同的内容
    return (
      transitionState !== State.WillTransitionOut && (
        <View style={styles.container}>
          <View style={styles.logo}>
            <Logo />
          </View>
          {transitionState !== State.Launching && (
            <Animated.View style={toggleStyle}>
              <Toggle
                options={BOARD_SIZES}
                value={size}
                onChange={onChangeSize}
              />
            </Animated.View>
          )}
          {transitionState !== State.Launching && (
            <Animated.View style={buttonStyle}>
              <Button title={'Start Game'} onPress={this.handlePressStart} />
            </Animated.View>
          )}
        </View>
      )
    );
  }
}

// 定义样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    alignSelf: 'stretch',
    paddingHorizontal: 40,
  },
});