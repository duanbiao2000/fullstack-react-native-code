import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';

export default class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  handleChangeText = text => {
    this.setState({ text });
  };

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;

    if (!text) return;

    onSubmit(text);
    this.setState({ text: '' });
  };

  render() {
    const { placeholder } = this.props;
    const { text } = this.state;
    /* 通过解构赋值,text变量指向this.state.text
        value绑定text等同于绑定this.state.text 
        setState更新state.text也会更新text 
    */

    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          value={text}
          placeholder={placeholder}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          style={styles.textInput}
          clearButtonMode="always"
          onChangeText={this.handleChangeText}
          /*  onChangeText属性是用于在TextInput组件中监听文本输入值的变化的。
              handleChangeText函数是用于处理文本变化的回调函数,它会在TextInput的值发生变化时被调用。
              一个简单的例子:
              ```jsx
              class MyComponent extends React.Component {
                state = {
                  text: ''
                }
                handleChangeText = (text) => {
                  this.setState({text}); 
                }
                render() {
                  return (
                    <TextInput
                      value={this.state.text}
                      onChangeText={this.handleChangeText} 
                    />
                  )
                }
              }
              ```
              作用:
              - TextInput绑定value为内部状态text
              - onChangeText监听输入值变化,回调handleChangeText
              - handleChangeText更新状态text为最新值
              这样就实现了TextInput的实时数据同步到状态中的效果。
              关键点:
              - onChangeText监听输入变化事件
              - 回调函数更新状态同步输入值
              - 状态驱动UI重新渲染显示最新值
              这是处理TextInput值的常见写法。 */
          onSubmitEditing={this.handleSubmitEditing}
          /*  onSubmitEditing属性是TextInput组件用于处理表单提交的一个重要属性。
            它的作用和用法如下:
            - onSubmitEditing属性接收一个回调函数作为值
            - 当用户在TextInput内按下回车键时,这个回调函数会被调用
            - 我们可以在回调函数内实现表单提交逻辑
            例如:
            ```jsx
            <TextInput
              onSubmitEditing={handleSubmit} 
            />
            const handleSubmit = () => {
              // submit logic here
              console.log('Submitted!');
            }
            ```
            一些关键点:
            - 只在按回车键时触发,不会在每次输入时触发
            - 通常用于最后一个TextInput,作为整个表单的提交按钮
            - 可以访问TextInput对象,如清空输入值
            - 也可以调用外部提交函数完成表单逻辑
            使用onSubmitEditing可以让用户通过回车键来提交表单,相比点击按钮更方便。
            它是处理移动端表单提交的重要手段之一。 */
        />
      </View>
    );
  }
}

SearchInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchInput.defaultProps = {
  placeholder: '',
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
});
