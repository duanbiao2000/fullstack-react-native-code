// 导入必要的React Native组件和PropTypes用于验证属性类型
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

// 定义ToolbarButton组件，用于在工具栏上显示按钮
// 参数: title - 按钮上显示的文本, onPress - 点击按钮时的回调函数
const ToolbarButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);

// 为ToolbarButton组件定义属性类型
ToolbarButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

// 定义Toolbar组件，用作工具栏，包含输入框和按钮
export default class Toolbar extends React.Component {
  // 为Toolbar组件定义属性类型
  static propTypes = {
    isFocused: PropTypes.bool.isRequired,
    onChangeFocus: PropTypes.func,
    onSubmit: PropTypes.func,
    onPressCamera: PropTypes.func,
    onPressLocation: PropTypes.func,
  };

  // 为Toolbar组件定义默认属性值
  static defaultProps = {
    onChangeFocus: () => {},
    onSubmit: () => {},
    onPressCamera: () => {},
    onPressLocation: () => {},
  };

  // 初始化组件状态
  state = {
    text: '',
  };

  // 当组件接收到新的props时调用，用于处理输入框的焦点变化
  componentWillReceiveProps(nextProps) {
    if (nextProps.isFocused !== this.props.isFocused) {
      if (nextProps.isFocused) {
        this.input.focus();
      } else {
        this.input.blur();
      }
    }
  }

  // 设置输入框的ref，以便在组件中直接访问输入框元素
  setInputRef = ref => {
    this.input = ref;
  };

  // 当输入框获得焦点时调用，将焦点状态设为true
  handleFocus = () => {
    const { onChangeFocus } = this.props;
    onChangeFocus(true);
  };

  // 当输入框失去焦点时调用，将焦点状态设为false
  handleBlur = () => {
    const { onChangeFocus } = this.props;
    onChangeFocus(false);
  };

  // 处理输入框文本变化，更新组件状态
  handleChangeText = text => {
    this.setState({ text });
  };

  // 当输入框提交编辑时调用，提交输入的文本并清空输入框
  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;

    if (!text) return; // 如果输入为空，则不提交

    onSubmit(text);
    this.setState({ text: '' });
  };

// 渲染组件UI
render() {
  // 从props中解构出按钮的 onPress 事件处理函数
  const { onPressCamera, onPressLocation } = this.props;
  // 从state中解构出文本输入框的值
  const { text } = this.state;

  return (
    <View style={styles.toolbar}>
      <ToolbarButton title={'📷'} onPress={onPressCamera} />
      <ToolbarButton title={'📍'} onPress={onPressLocation} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          underlineColorAndroid={'transparent'}
          placeholder={'Type something!'}
          blurOnSubmit={false}
          value={text}
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
          ref={this.setInputRef}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </View>
    </View>
  );
}
}

// 定义样式
const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 16,
    backgroundColor: 'white',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  button: {
    top: -2,
    marginRight: 12,
    fontSize: 20,
    color: 'grey',
  },
});