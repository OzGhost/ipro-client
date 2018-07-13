import React from 'react'
import ReactDOM from 'react-dom'
import Switcher from './Switcher.jsx'
import Stat from './Stat.jsx'
import Toc from './Toc.jsx'
import Dialog from './Dialog.jsx'
import Foot from './Foot.jsx'
import Shipper from './Shipper.jsx'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      type: "Process",
      cParent: {},
      level: 0,
      dataSource: [],
      isDialogOpened: false,
      holding: [],
      msg: ''
    }

    this.changedType = this.changedType.bind(this)
    this.reload = this.reload.bind(this)
    this.dialogOff = this.dialogOff.bind(this)
    this.dialogOn = this.dialogOn.bind(this)
    this.updateItem = this.updateItem.bind(this)
    this.getCurrentUri = this.getCurrentUri.bind(this)
    this.rmItem = this.rmItem.bind(this)
    this.editItem = this.editItem.bind(this)
    this.loadItem = this.loadItem.bind(this)
    this.getItem = this.getItem.bind(this)
    this.exportItem = this.exportItem.bind(this)
    this.importItem = this.importItem.bind(this)
    this.importHandler = this.importHandler.bind(this)
    this.getItemFrame =  this.getItemFrame.bind(this)
    this.back =  this.back.bind(this)
    this.downloadExportedItems = this.downloadExportedItems.bind(this)
  }

  componentWillMount() {
    new Shipper('/'+this.state.type.toLowerCase())
      .get().send().then(this.reload)
  }

  changedType(newType) {
    if (newType === this.state.type)
      return
    new Shipper('/'+newType.toLowerCase())
      .get().send().then(this.reload)
    this.setState({type: newType, level: 0})
  }

  reload(response) {
    this.setState({dataSource: JSON.parse(response)})
  }

  dialogOff() {
    var holded = []
    if (this.state.level === 1)
      holded.push(this.state.holding[0])
    this.setState({
      isDialogOpened: false,
      holding: holded
    })
  }

  dialogOn() {
    this.setState({isDialogOpened: true})
  }

  updateItem(item) {
    this.dialogOff()

    var reloadRequest = new Shipper(this.getCurrentUri()).get()
    var callback = this.reload
    var rq = new Shipper(this.getCurrentUri())

    if (item.id === -1)
      rq = rq.post(JSON.stringify(item))
    else
      rq = rq.put(JSON.stringify(item))

    rq.send().then(function(){
      reloadRequest.send().then(callback)
    }, function(){
      console.log("Item fail to create")
    })
  }

  getCurrentUri(upperLevel) {
    var uri = '/' + this.state.type.toLowerCase()
    if (upperLevel)
      return uri + '/' + this.state.holding[0].id
    uri += (this.state.level === 1)
      ? '/'+this.state.holding[0].id+'/task'
      : ''
    return uri
  }

  rmItem(id) {
    var holded = []
    this.state.level === 1 && holded.push(this.state.holding[0])
    this.setState({holding: holded})
    var reload = new Shipper(this.getCurrentUri()).get()
    var callback = this.reload
    new Shipper(this.getCurrentUri()+'/'+id)
      .del().send().then(function(response){
        reload.send().then(callback)
      })
  }

  editItem(id) {
    var target = this.getItem(id)
    var holded = [...this.state.holding]
    holded[this.state.level] = target
    this.setState( {isDialogOpened: true, holding: holded } )
  }

  loadItem(id) {
    if (this.state.level === 0) {
      var ds = this.getItem(id)
      var holded = [ds]
      this.setState({level: 1, holding: holded})
      new Shipper('/'+this.state.type.toLowerCase()+'/'+id+'/task')
        .get().send().then(this.reload)
    }
  }

  getItem(id) {
    return this.state.dataSource.filter(e => e.id == id)[0]
  }

  exportItem() {
    new Shipper(this.getCurrentUri(true)+'/export', 'blob')
      .post().send().then(this.downloadExportedItems)
  }

  downloadExportedItems(response) {
    var blob = new Blob([response], {type:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
    let url = window.URL.createObjectURL(blob)
    let a = document.createElement('A')
    a.style.display = 'none'
    a.href = url
    a.download = 'Process_'+this.state.holding[0].name+'_-_exported.xlsx'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  }

  importItem() {
    var i = document.createElement('INPUT')
    i.type = 'file'
    i.accept = 'application/vnd.ms-excel'
      +',application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    i.style.display = 'none'
    document.body.appendChild(i)
    i.addEventListener('change', this.importHandler)
    i.click()

    this.setState({msg: 'import callback'})
  }

  importHandler(event) {
    console.log(event.target.files[0])
  }

  back() {
    this.setState({level: 0, holding: []})
    new Shipper('/'+this.state.type.toLowerCase())
      .get().send().then(this.reload)
  }

  getItemFrame() {
    var frame = {id: -1, name: ''}
    if (this.state.level === 0) {
      frame.tasks = []
    } else {
      frame.startDate = 0
      frame.duration = 0
      frame.detail = ''
      frame.type = {
        id: 1
      }
    }
    return frame
  }

  getCurrentItemName() {
    if (this.state.level === 0)
      if (this.state.type === 'Seasion')
        return 'Seasion'
      else
        return 'Process'
    if (this.state.level === 1)
      if (this.state.type === 'Seasion')
        return 'Seasion Task'
      else
        return 'Process Task'
  }

  render() {
    var info

    if (this.state.holding.length === 0 || !this.state.holding[this.state.level])
      info = this.getItemFrame()
    else
      info = this.state.holding[this.state.level]
      
    const dialog = this.state.isDialogOpened
      ? <Dialog off={this.dialogOff}
            currentLevel={this.state.level}
            info={info}
            type={this.state.type}
            commitCallBack={this.updateItem} />
      : ''
    const itemName = this.getCurrentItemName()
    const supervisor = (this.state.level === 1)
      ? this.state.holding[0].name
      : ''
    return (
      <div className={this.state.type.toLowerCase()}>
        <Switcher
          changedType={this.changedType}
          type={this.state.type}
        />
        <Stat type={this.state.type}
          level={this.state.level}
          supervisor={supervisor}/>
        <Toc ds={this.state.dataSource}
            rmFunc={this.rmItem}
            eFunc={this.editItem}
            load={this.loadItem} />
        {dialog}
        <Foot dialogOn={this.dialogOn}
            currentLevel={this.state.level}
            back={this.back}
            ex={this.exportItem}
            im={this.importItem}/>
        {this.state.msg}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
