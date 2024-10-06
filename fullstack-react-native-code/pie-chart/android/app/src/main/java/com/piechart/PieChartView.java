package com.piechart;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.util.DisplayMetrics;
import android.view.View;

/**
 * PieChartSlice类表示饼图的一个扇区。
 */
class PieChartSlice {

  public int color; // 扇区的颜色
  public float value; // 扇区的值，用于计算扇区角度

  /**
   * 构造函数，创建一个扇区对象。
   *
   * @param color 扇区的颜色
   * @param value 扇区的值
   */
  public PieChartSlice(int color, float value) {
    this.color = color;
    this.value = value;
  }
}

/**
 * PieChartView类是自定义的View，用于显示饼图。
 */
public class PieChartView extends View {

  public float strokeWidth = 0; // 饼图边框的宽度
  public int strokeColor = Color.TRANSPARENT; // 饼图边框的颜色，默认透明
  public PieChartSlice[] slices = new PieChartSlice[0]; // 饼图的扇区数组

  public PieChartView(Context context) {
    super(context);

    metrics = getResources().getDisplayMetrics(); // 获取显示度量信息，用于尺寸转换

    // 初始化填充用的Paint对象
    fill.setAntiAlias(true);
    fill.setDither(true);
    fill.setStyle(Paint.Style.FILL);

    // 初始化边框用的Paint对象
    stroke.setAntiAlias(true);
    stroke.setDither(true);
    stroke.setStyle(Paint.Style.STROKE);
  }

  private Paint fill = new Paint(); // 用于填充扇区的Paint对象
  private Paint stroke = new Paint(); // 用于绘制边框的Paint对象
  private DisplayMetrics metrics; // 显示度量信息

  /**
   * 重写draw方法，自定义绘制饼图的逻辑。
   *
   * @param canvas 用于绘制的Canvas对象
   */
  @Override
  public void draw(Canvas canvas) {
    super.draw(canvas);

    float strokeWidth = this.strokeWidth * metrics.density; // 根据密度调整边框宽度

    RectF rect = new RectF(0, 0, canvas.getWidth(), canvas.getHeight());
    rect.inset(strokeWidth / 2, strokeWidth / 2); // 根据边框宽度调整绘制区域

    float centerX = rect.centerX(); // 圆心的X坐标
    float centerY = rect.centerY(); // 圆心的Y坐标

    float total = 0; // 所有扇区值的总和

    // 计算所有扇区值的总和
    for (PieChartSlice slice : slices) {
      total += slice.value;
    }

    // 如果总值小于等于0，则不绘制任何内容
    if (total <= 0) {
      return;
    }

    float value = 0; // 当前扇区的相对值

    // 绘制每个扇区的填充部分
    for (PieChartSlice slice : slices) {
      fill.setColor(slice.color); // 设置扇区颜色

      Path path = new Path();
      path.moveTo(centerX, centerY);
      path.addArc(rect, (value * 360) - 90, (slice.value / total) * 360); // 添加圆弧
      path.lineTo(centerX, centerY);

      canvas.drawPath(path, fill); // 绘制填充路径

      value += slice.value / total; // 更新当前扇区的相对值
    }

    stroke.setStrokeWidth(strokeWidth); // 设置边框宽度
    stroke.setColor(strokeColor); // 设置边框颜色

    // 绘制每个扇区的边框部分
    for (PieChartSlice slice : slices) {
      fill.setColor(slice.color); // 设置扇区颜色

      Path path = new Path();
      path.moveTo(centerX, centerY);
      path.addArc(rect, (value * 360) - 90, (slice.value / total) * 360); // 添加圆弧
      path.lineTo(centerX, centerY);

      canvas.drawPath(path, stroke); // 绘制边框路径

      value += slice.value / total; // 更新当前扇区的相对值
    }
  }
}
