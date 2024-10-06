// 从react-native导入AppRegistry组件
import { AppRegistry } from "react-native";

// 导入自定义的App组件
import App from "./App";

// 注册App组件为名为"PieChart"的应用组件
// 这是React Native中启动应用程序的方式之一
AppRegistry.registerComponent("PieChart", () => App);