Chat Markup
===========

Applies some markdown/slack/reddit-like markup to chat messages.

![Screenshot](http://i.imgur.com/GWMlDyw.png)

Translations:

 * `_italic_` becomes _italic_
 * `*bold*` becomes *bold*
 * `` `code` `` becomes `code`
 * `~strike~` becomes <strike>strike</strike>

Markup can be nested, so

 * `_italic *bolddd*_` becomes _italic **bold**_
 * `` ~`error`~ `` becomes <strike>`error`</strike>

But markup does not nest inside code blocks, so

 * `` `a _line_ of code` `` becomes `a _line_ of code`
 * `` *a `code ~block~`* `` becomes **a `code ~block~`**

Also, markup does not apply when it starts halfway through a word, so

 * `hello @_username_` stays hello @\_username_
 * `https://mysite.com/some_web_page` stays https://mysite.com/some_web_page

Basically, it attempts to do what you would expect.

## Installation

If you do not have ExtPlug yet, get it [here](https://extplug.github.io).

You can install this plugin by going to your ExtPlug settings menu, pressing
"Install Plugin", and entering this Plugin URL:

```
https://extplug.github.io/chat-markup/build/chat-markup.js;extplug/chat-markup/main
```

## Building

**Note: this section is intended for developers only.**

First, install dependencies:

```bash
npm install
```

Then, use:

```bash
npm run build
```

The plugin will be built using the [ExtPlug CLI](https://github.com/extplug/extplug-cli).

The built plugin will be stored at `build/chat-markup.js`.

## License

[MIT](./LICENSE)
