//
//  PieChartView.swift
//  PieChart
//
//  Created by Devin Abbott on 6/24/18.
//  Copyright © 2018 Fullstack. All rights reserved.
//

import Foundation

// PieChartView 类继承自 UIView，用于显示饼图
class PieChartView: UIView {

  // 当属性更改时触发重绘
  override func didSetProps(_ changedProps: [String]!) {
    setNeedsDisplay()
  }

  // 设置饼图的边框宽度
  @objc var strokeWidth: CGFloat = 0.0

  // 设置饼图的边框颜色
  @objc var strokeColor: UIColor = .clear

  // 设置饼图的数据源，每个数据项包含颜色和数值，用于生成饼图的各个部分
  @objc var data: NSArray = [] {
    didSet {
      slices = data.map({ item in
        guard let object = item as? [String: Any],
          let value = object["value"] as? Double,
          let rawColor = object["color"]
          else {
            return PieChartSlice(color: .clear, value: 0)
        }

        return PieChartSlice(color: RCTConvert.uiColor(rawColor), value: value)
      })
    }
  }

  // 内部结构，表示饼图的一个切片
  private struct PieChartSlice {
    let color: UIColor
    let value: Double
  }

  // 存储饼图的所有切片
  private var slices: [PieChartSlice] = []

  // 重写 draw 方法，实现饼图的绘制
  override func draw(_ rect: CGRect) {
    super.draw(rect)

    let center = CGPoint(x: bounds.width / 2, y: bounds.height / 2)
    let radius = (min(rect.size.width, rect.size.height) - strokeWidth) / 2

    let total = slices.map({ $0.value }).reduce(0, { $0 + $1 })

    guard total > 0 else { return }

    var value = 0.0

    let paths: [UIBezierPath] = slices.map({ slice in
      let path = UIBezierPath()
      path.move(to: center)
      path.addArc(
        withCenter: center,
        radius: radius,
        startAngle: CGFloat((value * 2 * Double.pi) - (Double.pi / 2)),
        endAngle: CGFloat(((value + (slice.value / total)) * 2 * Double.pi) - (Double.pi / 2)),
        clockwise: true)

      value += slice.value / total

      return path
    })

    paths.enumerated().forEach({ index, path in
      slices[index].color.setFill()
      path.fill()
    })

    paths.forEach({ path in
      strokeColor.setStroke()
      path.lineWidth = strokeWidth
      path.stroke()
    })
  }
}
