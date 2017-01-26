define(function (require, exports, module) {
  const Plugin = require('extplug/Plugin')
  const Events = require('plug/core/Events')
  const transform = require('./transform')

  const MARKUP_TYPES = [ 'message', 'emote', 'mention' ]

  const ChatMarkup = Plugin.extend({
    name: 'Chat Markup',
    description: 'Applies some markdown/slack/reddit-like markup to ' +
                 'chat messages: _italic_, *bold*, ~strike~, `code`.',

    style: {
      '.extplug-strike': { 'text-decoration': 'line-through' }
    },

    enable() {
      this.listenTo(Events, 'chat:beforereceive', this.onMessage)
    },

    onMessage(msg) {
      if (MARKUP_TYPES.indexOf(msg.type) !== -1) {
        msg.message = transform(msg.message)
      }
    }
  })

  module.exports = ChatMarkup
})
