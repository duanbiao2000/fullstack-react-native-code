import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Linking,
} from 'react-native';

import ContactListItem from '../components/ContactListItem';

import { fetchContacts } from '../utils/api';
import getURLParams from '../utils/getURLParams';
import store from '../store';

// 用于提取列表项的唯一键
const keyExtractor = ({ phone }) => phone;

// Contacts组件负责展示联系人列表
export default class Contacts extends React.Component {
  // 设置导航选项
  static navigationOptions = () => ({
    title: 'Contacts',
  });

  // 初始化状态，从store中获取联系人数据和加载状态
  state = {
    contacts: store.getState().contacts,
    loading: store.getState().isFetchingContacts,
    error: store.getState().error,
  };

  // 组件挂载时执行的操作
  async componentDidMount() {
    // 监听store变化，更新组件状态
    this.unsubscribe = store.onChange(() =>
      this.setState({
        contacts: store.getState().contacts,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error,
      }));

    // 获取联系人数据
    const contacts = await fetchContacts();

    // 更新store中的联系人数据和加载状态
    store.setState({ contacts, isFetchingContacts: false });

    // 监听URL打开事件
    Linking.addEventListener('url', this.handleOpenUrl);

    // 获取初始URL并处理
    const url = await Linking.getInitialURL();
    this.handleOpenUrl({ url });
  }

  // 组件卸载时执行的操作
  componentWillUnmount() {
    // 移除URL事件监听器
    Linking.removeEventListener('url', this.handleOpenUrl);
    // 取消store变更监听
    this.unsubscribe();
  }

  // 处理URL打开事件，导航到联系人详情页面
  handleOpenUrl(event) {
    const { navigation: { navigate } } = this.props;
    const { url } = event;
    const params = getURLParams(url);

    if (params.name) {
      // 根据URL参数查询联系人
      const queriedContact = store
        .getState()
        .contacts.find(contact =>
          contact.name.split(' ')[0].toLowerCase() ===
            params.name.toLowerCase());

      if (queriedContact) {
        // 导航到联系人详情页面
        navigate('Profile', { id: queriedContact.id });
      }
    }
  }

  // 渲染联系人列表项
  renderContact = ({ item }) => {
    const { navigation: { navigate } } = this.props;
    const {
      id, name, avatar, phone,
    } = item;

    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigate('Profile', { id })}
      />
    );
  };

  // 渲染联系人列表或加载指示或错误提示
  render() {
    const { contacts, loading, error } = this.state;

    // 对联系人列表按名称排序
    const contactsSorted = contacts.sort((a, b) =>
      a.name.localeCompare(b.name));

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}
        {!loading &&
          !error && (
            <FlatList
              data={contactsSorted}
              keyExtractor={keyExtractor}
              renderItem={this.renderContact}
            />
          )}
      </View>
    );
  }
}

// 定义样式
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
});