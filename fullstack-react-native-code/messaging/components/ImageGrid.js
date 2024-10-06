// 导入所需的React Native组件和库
import { CameraRoll, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Permissions } from 'expo';
import PropTypes from 'prop-types';
import React from 'react';

// 导入自定义的Grid组件
import Grid from './Grid';

// 定义一个函数来提取每个图像的唯一键
const keyExtractor = ({ uri }) => uri;

// 定义一个名为ImageGrid的React组件
export default class ImageGrid extends React.Component {
  // 定义组件的属性类型
  static propTypes = {
    onPressImage: PropTypes.func,
  };

  // 定义组件的默认属性
  static defaultProps = {
    onPressImage: () => {},
  };

  // 初始化组件状态和变量
  // eslint-disable-next-line react/sort-comp
  loading = false;
  cursor = null;

  state = {
    images: [],
  };

  // 组件挂载后获取图像数据
  componentDidMount() {
    this.getImages();
  }

  // 异步获取图像数据的方法
  getImages = async after => {
    if (this.loading) return;

    // 请求访问相册权限
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
      console.log('Camera roll permission denied');
      return;
    }

    this.loading = true;

    // 获取相册中的照片
    const results = await CameraRoll.getPhotos({
      first: 20,
      after,
    });

    const { edges, page_info: { has_next_page, end_cursor } } = results;

    const loadedImages = edges.map(item => item.node.image);

    // 更新组件状态
    this.setState(
      {
        images: this.state.images.concat(loadedImages),
      },
      () => {
        this.loading = false;
        this.cursor = has_next_page ? end_cursor : null;
      },
    );
  };

  // 请求加载下一批图像的方法
  getNextImages = () => {
    if (!this.cursor) return;

    this.getImages(this.cursor);
  };

  // 渲染每个图像的函数组件
  renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
    const { onPressImage } = this.props;

    const style = {
      width: size,
      height: size,
      marginLeft,
      marginTop,
    };

    return (
      <TouchableOpacity
        key={uri}
        activeOpacity={0.75}
        onPress={() => onPressImage(uri)}
        style={style}
      >
        <Image source={{ uri }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  // 渲染组件的方法
  render() {
    const { images } = this.state;

    return (
      <Grid
        data={images}
        renderItem={this.renderItem}
        keyExtractor={keyExtractor}
        onEndReached={this.getNextImages}
      />
    );
  }
}

// 定义样式
const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});