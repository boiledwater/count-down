// components/count-down/index.js
var DAY = 86400000;
var HOUR = 3600000;
var MINUTE = 60000;
Component({
  options: {
    addGlobalClass: true,
  },
  externalClasses: ['class'],
  /**
   * 组件的属性列表
   */
  properties: {
    format: {
      //显示日期格式
      type: String,
      value: '{mm}:{s}'
    },
    expireText: {
      //显示日期格式
      type: String,
      value: '已结束'
    },
    showSlot: {
      type: Boolean,
      value: false
    },
    expireTime: {
      type: String,
      observer: function(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        if (this.timer) {
          clearInterval(this.timer);
        }
        var f = function() {
          this.getRightTime(newVal);
        }
        this.timer = setInterval((function(_f, _this) {
          return function() {
            return _f.apply(_this, arguments);
          }
        })(f, this), 1000);
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    downDate: {

    }
  },
  lifetimes: {
    detached: function() {
      clearInterval(this.timer);
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCountDown: function() {
      var myEventDetail = {
        data: this.data
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('countDown', myEventDetail, myEventOption)
    },
    onExpire: function() {
      if (!this.showSlot) {
        this.setData({
          countDownText: this.data.expireText
        }, () => {});
      }
      var myEventDetail = {
        data: this.data
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('expire', myEventDetail, myEventOption)
    },
    checkTime: function(i) {
      if (i < 10) i = "0" + i;
      return i
    },
    getRightTime: function(_end_time) {
      var end_time = Number(this.getDate(_end_time).getTime());
      var now_time = Number(new Date().getTime());
      var diff = end_time - now_time;
      if (diff > 0) {
        var _day = parseInt(diff / DAY, 10);
        var _hour = parseInt((diff - _day * DAY) / HOUR, 10);
        var _minute = parseInt((diff - _day * DAY - _hour * HOUR) / MINUTE, 10);
        var _second = parseInt((diff - _day * DAY - _hour * HOUR - _minute * MINUTE) / 1000, 10);

        this.data.downDate.day = this.checkTime(_day);
        this.data.downDate.hour = this.checkTime(_hour);
        this.data.downDate.minute = this.checkTime(_minute);
        this.data.downDate.second = this.checkTime(_second);
        var _left_time = null;
        if (!this.data.showSlot) {
          if (this.data.format) {
            _left_time = this.data.format.replace('{d}', _day)
              .replace('{h}', _hour)
              .replace('{mm}', _minute)
              .replace('{s}', _second);
            this.setData({
              countDownText: _left_time
            }, () => {});
          }
        } else {
          this.onCountDown();
        }
      } else {
        this.onExpire();
        clearInterval(this.timer);
      }
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
    }
  }
})