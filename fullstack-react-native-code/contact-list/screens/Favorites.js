import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import ContactThumbnail from '../components/ContactThumbnail';

import { fetchContacts } from '../utils/api';
import store from '../store';

// 用于从联系人数据中提取唯一键值的函数
const keyExtractor = ({ phone }) => phone;

// Favorites组件负责展示用户收藏的联系人列表
export default class Favorites extends React.Component {
  // 设置导航栏标题
  static navigationOptions = {
    title: 'Favorites',
  };

  // 初始化组件状态，从store中获取联系人数据和加载状态
  state = {
    contacts: store.getState().contacts,
    loading: store.getState().isFetchingContacts,
    error: store.getState().error,
  };

  // 组件挂载后，订阅store变化并加载联系人数据
  async componentDidMount() {
    const { contacts } = this.state;

    // 订阅store变化，更新组件状态
    this.unsubscribe = store.onChange(() =>
      this.setState({
        contacts: store.getState().contacts,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error,
      }));

    // 如果联系人列表为空，则从API加载联系人数据
    if (contacts.length === 0) {
      const fetchedContacts = await fetchContacts();
      store.setState({ contacts: fetchedContacts, isFetchingContacts: false });
    }
  }

  // 组件卸载前，取消store订阅
  componentWillUnmount() {
    this.unsubscribe();
  }

  // 渲染收藏联系人的缩略图
  renderFavoriteThumbnail = ({ item }) => {
    const { navigation: { navigate } } = this.props;
    const { avatar } = item;

    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigate('Profile', { id: item.id })}
      />
    );
  };

  // 渲染组件界面
  render() {
    const { contacts, loading, error } = this.state;
    const favorites = contacts.filter(contact => contact.favorite);

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}

        {!loading &&
          !error && (
            <FlatList
              data={favorites}
              keyExtractor={keyExtractor}
              numColumns={3}
              contentContainerStyle={styles.list}
              renderItem={this.renderFavoriteThumbnail}
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
  list: {
    alignItems: 'center',
  },
});