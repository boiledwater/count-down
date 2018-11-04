![倒计时](https://github.com/boiledwater/count-down/blob/master/images/count-down.png "倒计时")

### 组件属性
#### format倒计时显示格式;默认为：{mm}:{s}格式；

{d}：表示天;
{h}:表示小时;
{mm}:表示分钟;
{s}:表示秒;
例如:
1)距结束 {d}天 {h}时{mm}分{s}秒
2){d}天 {h}:{mm}:{s}

#### expireText
过期后显示文本；默认为：已结束

#### showSlot
是否显示为自定义的倒计时显示view样式;默认为false;

#### expireTime
过期的时间点；日期格式为:2018-12-5 12:43:9

### 事件
#### expireTime
过期的时候发出该事件，使用者可以绑定该事件;

#### countDown
当showSlot为ture的时候，组件会循环调用该事件；使用者可以绑定该事件;
其中e.detail里包含倒计时数据；

### 使用方式
#### xx.json文件引用组件
```json
{
  "usingComponents": {   
    "down": "/components/count-down/index"
  }
}
```
#### xx.wxml使用组件
```xml
<down expire-time='{{expire_time}}'/>
```
