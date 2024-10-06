// 导入React库和所需的React Native组件
import React from "react";
import { AppRegistry, StyleSheet, Text, View, Button } from "react-native";

// 导入自定义的PieChart组件
import PieChart from "./PieChart";

// 定义App组件，继承自React.Component
// App组件是应用程序的主组件，负责管理数据和渲染界面
export default class App extends React.Component {
  // 初始化组件状态，包含一个名为data的属性
  // data属性是一个包含多个对象的数组，每个对象代表一个饼图切片，有value和color两个属性
  state = {
    data: [
      { value: 12, color: "#2196F3" },
      { value: 12, color: "#8BC34A" },
      { value: 8, color: "#f44336" },
      { value: 4, color: "#FF9800" }
    ]
  };

  // randomize方法用于随机化state中的data值
  // 它通过map函数遍历data数组，为每个切片生成一个新的value值，同时保留原有的color值
  randomize = () => {
    const { data } = this.state;

    this.setState({
      data: data.map(slice => ({
        value: Math.random() + 0.1,
        color: slice.color
      }))
    });
  };

  // render方法负责渲染组件的UI
  // 它返回一个View组件，包含一个PieChart组件和一个Button组件
  // PieChart组件使用state中的data作为数据源，Button组件用于触发随机化数据
  render() {
    const { data } = this.state;

    return (
      <View style={styles.container}>
        <PieChart
          style={styles.chart}
          strokeColor={"white"}
          strokeWidth={4}
          data={data}
        />
        <Button title="Press to randomize" onPress={this.randomize} />
      </View>
    );
  }
}

// 定义样式对象，用于组件的样式设置
// 包含container和chart两个样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  chart: {
    width: 300,
    height: 300,
    marginBottom: 20
  }
});