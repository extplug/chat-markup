import Plugin from 'extplug/Plugin'
import Events from 'plug/core/Events'
import transform from './transform'
import style from './style.css'

const MARKUP_TYPES = [ 'message', 'emote', 'mention' ]

const ChatMarkup = Plugin.extend({
  name: 'Chat Markup',
  description: 'Applies some markdown/slack/reddit-like markup to ' +
                'chat messages: _italic_, *bold*, ~strike~, `code`.',

  style,

  enable() {
    this.listenTo(Events, 'chat:beforereceive', this.onMessage)
  },

  onMessage(msg) {
    if (MARKUP_TYPES.indexOf(msg.type) !== -1) {
      msg.message = transform(msg.message)
    }
  }
})

export default ChatMarkup
