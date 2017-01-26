import test from 'ava'
import transform from '../src/transform'

test((t) => {
  t.is(transform('message'), 'message')
  t.is(transform('_message_'), '<em>message</em>')
  t.is(transform('*message*'), '<strong>message</strong>')
  t.is(transform('~message~'), '<span class="extplug-strike">message</span>')
  t.is(transform('`message`'), '<code>message</code>')

  t.is(transform('_*message*_'), '<em><strong>message</strong></em>')
  t.is(transform('_`~code~`_'), '<em><code>~code~</code></em>')

  t.is(transform('some _text'), 'some _text')
  t.is(transform('https://youtu.be/Yif_3Ryr_so'), 'https://youtu.be/Yif_3Ryr_so')
})
