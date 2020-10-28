import Vue from 'vue'
import MessageBox from './MessageBox'

export var messageBox = (function () {
  return function (opts) {
    var defaults = {
      // 默认值
      title: '',
      content: '',
      cancel: '',
      ok: '',
      handleCanel: null,
      handleOk: null
    }
    var MyComponent = Vue.extend(MessageBox)
    // 配置参数
    for (var attr in opts) {
      defaults[attr] = opts[attr]
    }

    var vm = new MyComponent({
      el: document.createElement('div'),
      data: {
        title: defaults.title,
        content: defaults.content,
        cancel: defaults.cancel,
        ok: defaults.ok
      },
      methods: {
        handleCanel () {
          defaults.handleCanel && defaults.handleCanel.call(this)
          document.body.removeChild(vm.$el)
        },
        handleOk () {
          defaults.handleOk && defaults.handleOk.call(this)
          document.body.removeChild(vm.$el)
        }
      }
    })
    document.body.appendChild(vm.$el)
  }
})()
