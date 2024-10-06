// 导入所需的模块和组件
import { AsyncStorage, Modal, Platform, StyleSheet, View } from 'react-native';
import { Constants } from 'expo';
import React from 'react';

// 导入评论和feed的屏幕组件
import Comments from './screens/Comments';
import Feed from './screens/Feed';

// 定义存储评论的AsyncStorage键常量
const ASYNC_STORAGE_COMMENTS_KEY = 'ASYNC_STORAGE_COMMENTS_KEY';

// 定义App组件，作为应用的主组件
export default class App extends React.Component {
  // 初始化应用状态
  state = {
    commentsForItem: {}, // 存储每条feed的评论
    showModal: false, // 控制评论模态框的显示状态
    selectedItemId: null, // 当前选中的feed项ID
  };

  // 组件挂载后，加载存储的评论数据
  async componentDidMount() {
    try {
      const commentsForItem = await AsyncStorage.getItem(
        ASYNC_STORAGE_COMMENTS_KEY,
      );

      // 更新状态，将加载的评论数据解析为JSON格式
      this.setState({
        commentsForItem: commentsForItem ? JSON.parse(commentsForItem) : {},
      });
    } catch (e) {
      console.log('Failed to load comments');
    }
  }

  // 提交评论的处理函数
  onSubmitComment = text => {
    const { selectedItemId, commentsForItem } = this.state;
    const comments = commentsForItem[selectedItemId] || [];

    // 更新评论数据
    const updated = {
      ...commentsForItem,
      [selectedItemId]: [...comments, text],
    };

    // 更新应用状态
    this.setState({ commentsForItem: updated });

    // 将更新后的评论数据保存到AsyncStorage
    try {
      AsyncStorage.setItem(ASYNC_STORAGE_COMMENTS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.log('Failed to save comment', text, 'for', selectedItemId);
    }
  };

  // 打开评论屏幕的处理函数
  openCommentScreen = id => {
    this.setState({
      showModal: true,
      selectedItemId: id,
    });
  };

  // 关闭评论屏幕的处理函数
  closeCommentScreen = () => {
    this.setState({
      showModal: false,
      selectedItemId: null,
    });
  };

  // 渲染应用界面
  /**
 * 渲染组件界面
 * 
 * 此函数负责根据当前状态渲染组件的UI它包含一个饲料视图（Feed）和一个模态视图（Modal），
 * 饲料视图用于显示条目和其评论的列表，模态视图用于显示和处理评论
 */
  render() {
    // 从状态中解构出评论数据、模态显示状态和当前选中的条目ID
    const { commentsForItem, showModal, selectedItemId } = this.state;

    // 返回组件的JSX结构
    return (
      <View style={styles.container}>
        <Feed
          style={styles.feed}
          commentsForItem={commentsForItem}
          onPressComments={this.openCommentScreen}
        />
        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={this.closeCommentScreen}
        >
          <Comments
            style={styles.comments}
            comments={commentsForItem[selectedItemId] || []}
            onClose={this.closeCommentScreen}
            onSubmitComment={this.onSubmitComment}
          />
        </Modal>
      </View>
    );
  }
}

// 根据平台版本设置样式常量
const platformVersion =
  Platform.OS === 'ios' ? parseInt(Platform.Version, 10) : Platform.Version;

// 定义应用样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feed: {
    flex: 1,
    marginTop:
      Platform.OS === 'android' || platformVersion < 11
        ? Constants.statusBarHeight
        : 0,
  },
  comments: {
    flex: 1,
    marginTop:
      Platform.OS === 'ios' && platformVersion < 11
        ? Constants.statusBarHeight
        : 0,
  },
});
