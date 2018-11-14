//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    data: []    
  },
  onLoad: function() {
    var date1 = new Date();
    date1.setDate(35);

    var date2 = new Date();
    date2.setDate(36);
    date2.setHours(4, 10, 32);

    var date3 = new Date();
    date3.setDate(37);
    date3.setHours(2, 23, 11);

    var date4 = new Date();
    date4.setSeconds(date4.getSeconds() + 10);

    this.setData({
      data: [this.format(date1), this.format(date2), this.format(date3), this.format(date4)],
      currentDate: this.format(new Date())
    });
    
  },
  onCountDown: function(e) {
    var down_date = e.detail.data.downDate;
    this.setData(down_date);
  },
  onExpire: function() {
    wx.showToast({
      title: '倒计时结束'
    });
  },
  getDate: function(time) {
    /**
     *new Date('2019-11-10'),
     *此构造方法在IOS上有问题，所以做此处理
     */
    var arr = time.split(/[- :]/);
    var year = this._getValue(arr[0]);
    var month = this._getValue(arr[1]) - 1;
    var day = this._getValue(arr[2]);
    var hour = this._getValue(arr[3]);
    var minute = this._getValue(arr[4]);
    var second = this._getValue(arr[5]);
    var date = new Date(year, month, day, hour, minute, second);
    return date;
  },
  _getValue: function(v) {
    return v ? v : 0;
  },
  format: function(date, format) {
    if (!format) {
      format = 'yyyy-MM-dd HH:mm:ss';
    }
    if (!date) {
      date = new Date();
    }
    var _year = date.getFullYear();
    var _month = date.getMonth() + 1;
    var _day = date.getDate();
    var _hours = date.getHours();
    var _minutes = date.getMinutes();
    var _seconds = date.getSeconds();

    return format.replace('yyyy', _year).replace('MM', _month).replace('dd', _day)
      .replace('HH', _hours)
      .replace('mm', _minutes)
      .replace('ss', _seconds);
  }
})