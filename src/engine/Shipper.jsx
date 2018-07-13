
export default class Shipper {
  constructor(uri, rsType) {
    this.host = 'http://ruf:8080'
    this.uri = uri
    this.method = 'GET'
    this.rsType = rsType
    
    this.get = this.get.bind(this)
    this.post = this.post.bind(this)
    this.put = this.put.bind(this)
    this.del = this.del.bind(this)
    this.setUri = this.setUri.bind(this)
    this.send = this.send.bind(this)
  }

  get(data) {
    this.data = data
    return this
  }

  post(data) {
    this.method = 'POST'
    this.data = data
    return this
  }

  put(data) {
    this.method = 'PUT'
    this.data = data
    return this
  }

  del() {
    this.method = 'DELETE'
    return this
  }

  setUri(uri) {
    this.uri = uri
  }

  send() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest()
      xhr.open(this.method, this.host + this.uri, true)
      if (this.rsType)
        xhr.responseType = this.rsType
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.onload = () => {
        if (xhr.status === 200)
          resolve(xhr.response)
        else
          reject()
      }
      xhr.send(this.data)
    })
  }
}
