package com.piechart;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * PieChartPackage类实现了ReactPackage接口，用于向React应用注册原生模块和视图管理器。
 * 当React应用初始化时，会调用该类来获取应用所需的原生功能和UI组件。
 */
public class PieChartPackage implements ReactPackage {

  /**
   * 创建并返回视图管理器列表。
   * 这个方法用于向React注册自定义的视图组件。
   * 
   * @param reactContext React应用的上下文环境，用于创建视图管理器。
   * @return 包含所有视图管理器的列表。
   */
  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    // 返回一个包含PieChartManager的列表，用于管理PieChart组件。
    return Arrays.<ViewManager>asList(
        new PieChartManager()
    );
  }

  /**
   * 创建并返回原生模块列表。
   * 这个方法用于向React注册需要与JavaScript交互的原生模块。
   * 
   * @param reactContext React应用的上下文环境，用于创建原生模块。
   * @return 包含所有原生模块的列表。
   */
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    // 返回一个空列表，表示没有原生模块需要注册。
    return Collections.emptyList();
  }

}