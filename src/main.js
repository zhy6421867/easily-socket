class Socket {

  // heartBeatTimer = null
  // options = {}
  // messageMap = {}
  // connState = 0
  // socket = null
  // url = ''
  // timeout = 60000
  // connetCount = 10

  constructor(url = '', options) {
    this.heartBeatTimer = null
    this.options = options
    this.messageMap = {}
    this.connState = 0
    this.socket = null
    this.url = url
    this.timeout = 60000
    this.connetCount = 10
  }
  doOpen() {
    if (this.connState) return
    this.connState = 1
    this.afterOpenEmit = []
    const BrowserWebSocket = window.WebSocket || window.MozWebSocket
    const socket = new BrowserWebSocket(this.url)
    socket.binaryType = 'arraybuffer'
    socket.onopen = evt => this.onOpen(evt)
    socket.onclose = evt => this.onClose(evt)
    socket.onmessage = evt => this.onMessage(evt.data)
    socket.onerror = err => this.onError(err)
    this.socket = socket
  }
  onOpen(evt) {
    this.connState = 2
    this.heartBeatTimer = setInterval(this.checkHeartbeat.bind(this), 30000)
    this.onReceiver({ Event: 'open' })
  }
  checkOpen() {
    return this.connState === 2
  }
  onClose() {
    this.connState = 0
    if (this.connState) {
      this.onReceiver({ Event: 'close' })
    }
    if (this.connetCount > -1) {
      setTimeout(() => {
        this.doOpen()
        this.connetCount--
      }, 5000)
    }
  }
  send(data) {
    if (!this.checkOpen()) return
    this.socket.send(JSON.stringify(data))
  }
  emit(data) {
    return new Promise(resolve => {
      this.socket.send(JSON.stringify(data))
      this.on('message', data => {
        resolve(data)
      })
    })
  }
  onMessage(message) {
    try {
      const data = JSON.parse(message)
      this.onReceiver({ Event: 'message', Data: data })
    } catch (err) {
      console.error(' >> Data parsing error:', err)
    }
  }
  checkHeartbeat() {
    const data = {
      'cmd': 'ping',
      'args': [Date.parse(new Date())]
    }
    this.send(data)
  }
  onError(err) {
    console.error(err)
  }
  onReceiver(data) {
    const callback = this.messageMap[data.Event]
    if (callback) callback(data.Data)
  }
  on(name, handler) {
    this.messageMap[name] = handler
  }
  doClose() {
    this.socket.close()
  }
  destroy() {
    if (this.heartBeatTimer) {
      clearInterval(this.heartBeatTimer)
      this.heartBeatTimer = null
    }
    this.connetCount = -1
    this.doClose()
    this.messageMap = {}
    this.connState = 0
    this.socket = null
  }
}

export default Socket
