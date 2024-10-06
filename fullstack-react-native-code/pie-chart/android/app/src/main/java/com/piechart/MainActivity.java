package com.piechart;

import com.facebook.react.ReactActivity;

/**
 * 主活动类，继承自ReactActivity，用于初始化React应用.
 */
public class MainActivity extends ReactActivity {

    /**
     * 返回JavaScript中注册的主要组件的名称.
     * 这用于调度组件的渲染.
     * 
     * @return String 主组件的名称.
     */
    @Override
    protected String getMainComponentName() {
        return "PieChart";
    }
}