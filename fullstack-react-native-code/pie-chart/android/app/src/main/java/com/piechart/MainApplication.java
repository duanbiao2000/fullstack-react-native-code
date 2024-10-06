/**
 * MainApplication 类是 React Native 应用的入口点。
 * 它继承自 Application 类，并实现了 ReactApplication 接口，
 * 用于配置 React Native 主机和初始化本机模块。
 */
package com.piechart;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  /**
   * mReactNativeHost 是 React Native 的主机配置对象。
   * 它负责管理 React Native 的 JavaScript 代码和本机代码之间的交互。
   */
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      // 在调试模式下启用开发者支持
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      // 定义 React Native 项目中包含的包
      // 这里包括默认的 MainReactPackage 和自定义的 PieChartPackage
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(), new PieChartPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      // 设置 JavaScript 的入口文件名
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    // 返回 React Native 主机配置对象
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // 初始化 SoLoader，用于加载本机库
    SoLoader.init(this, /* native exopackage */ false);
  }
}