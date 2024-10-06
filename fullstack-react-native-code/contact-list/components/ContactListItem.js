// 导入React库和所需组件
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

// 导入自定义颜色工具
import colors from '../utils/colors';

// 定义一个可导出的函数组件ContactListItem，用于渲染联系人列表项
export default function ContactListItem({
  name, avatar, phone, onPress,
}) {
  // 返回一个可触摸的视图组件，当按下时会改变背景颜色并触发onPress事件
  return (
    <TouchableHighlight
      underlayColor={colors.grey}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.contactInfo}>
        // 渲染联系人头像
        <Image
          style={styles.avatar}
          source={{
            uri: avatar,
          }}
        />

        <View style={styles.details}>
          // 渲染联系人姓名
          <Text style={[styles.title]}>{name}</Text>
          // 渲染联系人电话号码
          <Text style={styles.subtitle}>{phone}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

// 定义ContactListItem组件的属性类型
ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

// 定义组件的样式
const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 24,
    borderBottomColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    borderRadius: 22,
    width: 44,
    height: 44,
  },
  details: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 20,
  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: colors.blue,
    fontSize: 15,
    marginTop: 4,
  },
});