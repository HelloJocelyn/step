var util = require('../../utils/util.js')

Page({
  data:{
    // expense:'',
    budget: 1500,
    showTopTips: false,
    notANumber: false
  },
  getTime:function(){
    var day = util.formatDay(new Date());
    this.setData({
      day: day
    })
    console.log(day);
  },
  onLoad: function () {
      this.getTime();
  },
  updateExpense: function(e){    
    if (isNaN(e.detail.value)) {
      this.setData({ notANumber: '请输入数字' });
      setTimeout((function callback() {
        this.setData({ notANumber: false });
      }).bind(this), 1500);
      return;
    }
    this.setData({
      expense: e.detail.value
    });
  },
  computeBalance: function(){
    
    if (typeof this.data.expense =='undefined'){
      this.setData({ showTopTips: '请输入今日花费' });
      setTimeout((function callback() {
        this.setData({ showTopTips: false });
      }).bind(this), 1500);
      return;
    }
    var balance = this.data.budget - parseInt(this.data.expense);
    this.setData({
      balance: balance
    });
    if(this.data.balance > this.data.budget/2){
      this.congratuate();
    }      
  },


  congratuate: function () {
    wx.showModal({
      title: '弹窗标题',
      content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      confirmText: "主操作",
      cancelText: "辅助操作",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },

});