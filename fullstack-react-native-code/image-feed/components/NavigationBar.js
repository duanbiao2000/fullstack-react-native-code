import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * 导航栏组件
 * 
 * 此组件用于在屏幕的顶部提供一个导航栏，显示当前屏幕的标题以及左侧的返回按钮
 * 它通过props接收标题文本、左侧按钮文本以及左侧按钮的点击事件处理函数
 * 
 * @param {string} title - 当前屏幕的标题
 * @param {string} leftText - 左侧按钮的文本
 * @param {function} onPressLeftText - 点击左侧按钮时触发的事件处理函数
 * @returns {JSX.Element} - 返回一个包含左侧按钮和标题的视图
 */
export default function NavigationBar({ title, leftText, onPressLeftText }) {
  return (
    <View style={styles.container}>
      // 左侧按钮，通常用于返回上一级
      <TouchableOpacity style={styles.leftText} onPress={onPressLeftText}>
        <Text>{leftText}</Text>
      </TouchableOpacity>
      // 当前屏幕的标题
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

NavigationBar.propTypes = {
  title: PropTypes.string,
  leftText: PropTypes.string,
  onPressLeftText: PropTypes.func,
};

NavigationBar.defaultProps = {
  title: '',
  leftText: '',
  onPressLeftText: () => {},
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '500',
  },
  leftText: {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
