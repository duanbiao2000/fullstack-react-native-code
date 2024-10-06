package com.piechart;

import android.graphics.Color;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.ArrayList;

/**
 * PieChartManager类用于管理PieChartView组件
 * 它桥接了React Native的JS层和Java层，提供了设置PieChartView属性的方法
 */
public class PieChartManager extends SimpleViewManager<PieChartView> {

  // 定义React中使用的类名
  public static final String REACT_CLASS = "PieChart";

  /**
   * 获取组件的名称
   * 
   * @return 组件的名称
   */
  @Override
  public String getName() {
    return REACT_CLASS;
  }

  /**
   * 创建PieChartView实例
   * 
   * @param reactContext React上下文
   * @return 新创建的PieChartView实例
   */
  @Override
  protected PieChartView createViewInstance(ThemedReactContext reactContext) {
    return new PieChartView(reactContext);
  }

  /**
   * 设置PieChartView的数据
   * 
   * @param view PieChartView实例
   * @param data 可能为null的ReadableArray，包含颜色和值信息
   */
  @ReactProp(name = "data")
  public void setData(PieChartView view, @Nullable ReadableArray data) {
    ArrayList<PieChartSlice> slices = new ArrayList<>();

    for (int i = 0; i < data.size(); i++) {
      ReadableMap item = data.getMap(i);

      int color = item.getInt("color");
      float value = (float) item.getDouble("value");

      slices.add(new PieChartSlice(color, value));
    }

    view.slices = slices.toArray(new PieChartSlice[data.size()]);

    view.invalidate();
  }

  /**
   * 设置PieChartView的描边宽度
   * 
   * @param view PieChartView实例
   * @param strokeWidth 描边宽度，默认值为0f
   */
  @ReactProp(name = "strokeWidth", defaultFloat = 0f)
  public void setStrokeWidth(PieChartView view, float strokeWidth) {
    view.strokeWidth = strokeWidth;

    view.invalidate();
  }

  /**
   * 设置PieChartView的描边颜色
   * 
   * @param view PieChartView实例
   * @param strokeColor 描边颜色的字符串表示，可能为null
   */
  @ReactProp(name = "strokeColor")
  public void setStrokeColor(PieChartView view, @Nullable String strokeColor) {
    view.strokeColor = Color.parseColor(strokeColor);

    view.invalidate();
  }

}