import { Keyboard, Platform } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

const INITIAL_ANIMATION_DURATION = 250;

export default class KeyboardState extends React.Component {
  static propTypes = {
    layout: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    children: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { layout: { height } } = props;

    this.state = {
      contentHeight: height,
      keyboardHeight: 0,
      keyboardVisible: false,
      keyboardWillShow: false,
      keyboardWillHide: false,
      keyboardAnimationDuration: INITIAL_ANIMATION_DURATION,
    };
  }

/**
 * 在组件即将挂载时，根据不同的操作系统初始化键盘事件监听器
 * 
 * 由于iOS和Android的键盘事件有所不同，因此需要根据操作系统的类型来设置不同的监听器
 * 在iOS上，我们会监听键盘显示和隐藏的事件，以便在键盘弹出或收起时能够做出响应
 * 在Android上，由于键盘事件的处理方式不同，我们主要监听键盘显示和隐藏的事件
 * 
 * 没有参数
 * 没有返回值
 */
componentWillMount() {
  if (Platform.OS === 'ios') {
    // 在iOS操作系统上，设置键盘的各种事件监听器，包括将要显示、将要隐藏、已经显示和已经隐藏的事件
    this.subscriptions = [
      Keyboard.addListener('keyboardWillShow', this.keyboardWillShow),
      Keyboard.addListener('keyboardWillHide', this.keyboardWillHide),
      Keyboard.addListener('keyboardDidShow', this.keyboardDidShow),
      Keyboard.addListener('keyboardDidHide', this.keyboardDidHide),
    ];
  } else {
    // 在Android操作系统上，设置键盘的事件监听器，包括已经显示和已经隐藏的事件
    this.subscriptions = [
      Keyboard.addListener('keyboardDidHide', this.keyboardDidHide),
      Keyboard.addListener('keyboardDidShow', this.keyboardDidShow),
    ];
  }
}

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.remove());
  }

  keyboardWillShow = event => {
    this.setState({ keyboardWillShow: true });
    this.measure(event);
  };

  keyboardDidShow = event => {
    this.setState({
      keyboardWillShow: false,
      keyboardVisible: true,
    });
    this.measure(event);
  };

  keyboardWillHide = event => {
    this.setState({ keyboardWillHide: true });
    this.measure(event);
  };

  keyboardDidHide = () => {
    this.setState({
      keyboardWillHide: false,
      keyboardVisible: false,
    });
  };

  measure = event => {
    const { layout } = this.props;

    const {
      endCoordinates: { height, screenY },
      duration = INITIAL_ANIMATION_DURATION,
    } = event;

    this.setState({
      contentHeight: screenY - layout.y,
      keyboardHeight: height,
      keyboardAnimationDuration: duration,
    });
  };

/**
 * 渲染组件
 * 
 * 该方法使用传递的props和state来计算并传递一组参数给子组件，以驱动键盘相关的布局调整
 * 它不直接渲染任何UI，而是通过传递这些参数来间接控制UI的行为和外观
 */
render() {
  // 从props中解构出children和layout，这些是由父组件传递给当前组件的
  const { children, layout } = this.props;
  
  // 从state中解构出所有与键盘相关的信息，这些状态管理键盘的高度、可见性以及动画效果等
  const {
    contentHeight,
    keyboardHeight,
    keyboardVisible,
    keyboardWillShow,
    keyboardWillHide,
    keyboardAnimationDuration,
  } = this.state;

  // 返回子组件，同时传递一系列参数，包括容器高度、内容高度、键盘高度、键盘的可见状态以及键盘的动画时长等
  // 这些参数被子组件用于动态调整其布局，以应对键盘的显示和隐藏
  return children({
    containerHeight: layout.height,
    contentHeight,
    keyboardHeight,
    keyboardVisible,
    keyboardWillShow,
    keyboardWillHide,
    keyboardAnimationDuration,
  });
}
}
