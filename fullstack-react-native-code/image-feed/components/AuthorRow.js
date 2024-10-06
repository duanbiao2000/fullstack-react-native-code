// 导入React Native组件和PropTypes用于类型检查
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

// 导入Avatar组件和获取头像颜色和首字母的工具函数
import Avatar from './Avatar';
import getAvatarColor from '../utils/getAvatarColor';
import getInitials from '../utils/getInitials';

/**
 * AuthorRow组件用于显示作者信息行，包括作者的头像和全名，以及一个可选的链接文本
 * @param {Object} props - 组件的props对象
 * @param {string} props.fullname - 作者的全名
 * @param {string} props.linkText - 可选的链接文本
 * @param {function} props.onPressLinkText - 当链接文本被按下时的回调函数
 * @returns {JSX.Element} - 渲染的作者信息行组件
 */
export default function AuthorRow({ fullname, linkText, onPressLinkText }) {
  return (
    <View style={styles.container}>
      // 显示作者头像，头像的大小、首字母和背景颜色通过props传递
      <Avatar
        size={35}
        initials={getInitials(fullname)}
        backgroundColor={getAvatarColor(fullname)}
      />
      // 显示作者全名
      <Text style={styles.text} numberOfLines={1}>
        {fullname}
      </Text>
      // 如果提供了链接文本，则显示一个可触摸的文本区域
      {!!linkText && (
        <TouchableOpacity onPress={onPressLinkText}>
          <Text numberOfLines={1}>{linkText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// 定义AuthorRow组件的props类型
AuthorRow.propTypes = {
  fullname: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  onPressLinkText: PropTypes.func.isRequired,
};

// 定义组件的样式
const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: {
    flex: 1,
    marginHorizontal: 6,
  },
});
