// 导入React库和相关组件及样式
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import DetailListItem from '../components/DetailListItem';
import colors from '../utils/colors';

// 定义Options组件类，继承自React.Component
// 该组件用于展示用户选项列表，如更新资料、更改语言和退出登录等
export default class Options extends React.Component {
  // 配置Options组件的导航选项
  // 参数:
  // - goBack: 导航返回函数，用于返回上一个屏幕
  // 返回值: 导航选项对象，包含标题和左上角关闭按钮
  static navigationOptions = ({ navigation: { goBack } }) => ({
    title: 'Options',
    headerLeft: (
      <MaterialIcons
        name="close"
        size={24}
        style={{ color: colors.black, marginLeft: 10 }}
        onPress={() => goBack()}
      />
    ),
  });

  // 渲染Options组件的UI
  render() {
    return (
      <View style={styles.container}>
        <DetailListItem title="Update Profile" />
        <DetailListItem title="Change Language" />
        <DetailListItem title="Sign Out" />
      </View>
    );
  }
}

// 定义样式，用于Options组件的布局和背景
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});