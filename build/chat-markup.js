

define('extplug/chat-markup/main',['require','exports','module','extplug/Plugin','plug/core/Events'],function (require, exports, module) {

  var Plugin = require('extplug/Plugin');
  var Events = require('plug/core/Events');

  var MARKUP_TYPES = ['message', 'emote', 'mention'];

  function Token(type, text) {
    this.type = type;
    this.text = text;
  }

  var ChatMarkup = Plugin.extend({
    name: 'Chat Markup',
    description: 'Applies some markdown/slack/reddit-like markup to ' + 'chat messages: _italic_, *bold*, ~strike~, `code`.',

    enable: function enable() {
      Events.on('chat:beforereceive', this.onMessage, this);
      this.Style({
        '.extplug-strike': { 'text-decoration': 'line-through' }
      });
    },

    disable: function disable() {
      Events.off('chat:beforereceive', this.onMessage);
    },

    onMessage: function onMessage(msg) {
      if (MARKUP_TYPES.indexOf(msg.type) !== -1) {
        msg.message = this.transform(msg.message);
      }
    },

    // we use a tokenizer instead of simple regexes, so we can easily
    // avoid applying markup to mid-word things, or mid-URL and
    // mid-username things in particular. E.g. "@_username_" will just
    // work, and "https://youtu.be/Yif_3Ryr_so" will too.
    // however it will still apply markup if it ends in the middle of a
    // word, like in "_italic_things"
    tokenize: function tokenize(text) {
      var chunk = undefined;
      var i = 0;
      var tokens = [];
      // adds a token of type `type` if the current chunk starts with
      // a `delim`-delimited string
      var delimited = function delimited(delim, type) {
        if (chunk[0] === delim && chunk[1] !== delim) {
          var end = chunk.indexOf(delim, 1);
          if (end !== -1) {
            tokens.push(new Token(type, chunk.slice(1, end)));
            i += end + 1;
            return true;
          }
        }
      };
      // eat spaces
      var space = function space() {
        // .slice again because `i` changed
        var m = /^\s+/.exec(text.slice(i));
        if (m) {
          tokens.push(new Token('word', m[0]));
          i += m[0].length;
        }
      };
      // tokenize text, just loop until it's done!
      while (chunk = text.slice(i)) {
        var found = delimited('_', 'em') || delimited('*', 'strong') || delimited('`', 'code') || delimited('~', 'strike');
        if (!found) {
          var end = chunk.indexOf(' ', 1) + /* eat space */1;
          if (end === 0) // no match, = -1 + 1
            end = chunk.length;
          tokens.push(new Token('word', chunk.slice(0, end)));
          i += end;
        }
        space();
      }
      return tokens;
    },
    transform: function transform(text) {
      var _this = this;

      return this.tokenize(text).reduce(function (str, tok) {
        return str + (tok.type === 'em' ? '<em>' + _this.transform(tok.text) + '</em>' : tok.type === 'strong' ? '<strong>' + _this.transform(tok.text) + '</strong>' : tok.type === 'code' ? '<code>' + tok.text + '</code>' : tok.type === 'strike' ? '<span class="extplug-strike">' + _this.transform(tok.text) + '</span>' : tok.text);
      }, '');
    }
  });

  module.exports = ChatMarkup;
});
