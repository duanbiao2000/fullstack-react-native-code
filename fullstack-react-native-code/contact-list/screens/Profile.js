// 导入React库和相关组件及工具
import React from 'react';
import { StyleSheet, View } from 'react-native';

import ContactThumbnail from '../components/ContactThumbnail';
import DetailListItem from '../components/DetailListItem';

import colors from '../utils/colors';
import store from '../store';

// 定义一个名为Profile的React组件类
export default class Profile extends React.Component {
  // 配置Profile组件的导航选项
  static navigationOptions = ({ navigation: { state: { params } } }) => {
    // 从参数中提取联系人ID
    const { id } = params;
    // 从store中查找联系人信息，并提取姓名
    const { name } = store
      .getState()
      .contacts.find(contact => contact.id === id);

    // 返回导航选项配置
    return {
      title: name.split(' ')[0], // 设置导航栏标题为联系人名（姓氏部分）
      headerTintColor: 'white', // 设置导航栏文字颜色为白色
      headerStyle: {
        backgroundColor: colors.blue, // 设置导航栏背景颜色为蓝色
      },
    };
  };

  // 初始化组件状态，从store中获取所有联系人信息
  state = store.getState();

  // 渲染组件
  render() {
    // 从props中提取导航参数
    const { navigation: { state: { params } } } = this.props;
    // 提取联系人ID
    const { id } = params;
    // 根据联系人ID查找联系人详细信息
    const {
      avatar, name, email, phone, cell,
    } = this.state.contacts.find(contact => contact.id === id);

    // 返回组件渲染结果
    return (
      <View style={styles.container}>
        <View style={styles.avatarSection}>
          <ContactThumbnail avatar={avatar} name={name} phone={phone} />
        </View>
        <View style={styles.detailsSection}>
          <DetailListItem icon="mail" title="Email" subtitle={email} />
          <DetailListItem icon="phone" title="Work" subtitle={phone} />
          <DetailListItem icon="smartphone" title="Personal" subtitle={cell} />
        </View>
      </View>
    );
  }
}

// 定义样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
  },
});