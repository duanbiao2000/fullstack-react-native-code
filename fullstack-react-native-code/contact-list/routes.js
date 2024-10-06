// 导入React库和React Navigation的StackNavigator和TabNavigator组件
import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
// 导入MaterialIcons库以使用图标
import { MaterialIcons } from '@expo/vector-icons';

// 导入各个屏幕组件
import Favorites from './screens/Favorites';
import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import User from './screens/User';
import Options from './screens/Options';

// 导入颜色工具文件
import colors from './utils/colors';

// 定义一个函数来获取Tab栏图标
// 该函数接收一个图标名称作为参数，并返回一个函数，该函数再接收一个包含tintColor的对象
const getTabBarIcon = icon => ({ tintColor }) => (
  // 返回一个MaterialIcons组件，用于在Tab栏中显示指定的图标
  <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

// 定义一个StackNavigator来管理联系人和资料屏幕
const ContactsScreens = StackNavigator(
  {
    Contacts: {
      screen: Contacts,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    // 设置初始路由为Contacts
    initialRouteName: 'Contacts',
    // 设置Tab栏图标使用列表图标
    navigationOptions: {
      tabBarIcon: getTabBarIcon('list'),
    },
  },
);

// 定义一个StackNavigator来管理收藏和资料屏幕
const FavoritesScreens = StackNavigator(
  {
    Favorites: {
      screen: Favorites,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    // 设置初始路由为Favorites
    initialRouteName: 'Favorites',
    // 设置Tab栏图标使用星号图标
    navigationOptions: {
      tabBarIcon: getTabBarIcon('star'),
    },
  },
);

// 定义一个StackNavigator来管理用户和设置屏幕
const UserScreens = StackNavigator(
  {
    User: {
      screen: User,
    },
    Options: {
      screen: Options,
    },
  },
  {
    // 设置导航模式为modal
    mode: 'modal',
    // 设置初始路由为User
    initialRouteName: 'User',
    // 设置Tab栏图标使用人物图标
    navigationOptions: {
      tabBarIcon: getTabBarIcon('person'),
    },
  },
);

// 导出一个TabNavigator组件，用于管理Contacts、Favorites和User屏幕
// 使用之前定义的StackNavigator组件作为每个Tab的屏幕
export default TabNavigator(
  {
    Contacts: {
      screen: ContactsScreens,
    },
    Favorites: {
      screen: FavoritesScreens,
    },
    User: {
      screen: UserScreens,
    },
  },
  {
    // 设置初始路由为Contacts
    initialRouteName: 'Contacts',
    // 设置Tab栏位置为底部
    tabBarPosition: 'bottom',
    // 配置Tab栏的样式选项
    tabBarOptions: {
      style: {
        backgroundColor: colors.greyLight,
      },
      showLabel: false,
      showIcon: true,
      activeTintColor: colors.blue,
      inactiveTintColor: colors.greyDark,
      renderIndicator: () => null,
    },
  },
);
