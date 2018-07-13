import React from 'react'

export default class Dialog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: Object.assign({}, props.info)
    }
    this.changeBuffer = this.changeBuffer.bind(this)
    this.headTitle = this.headTitle.bind(this)
    this.getForm = this.getForm.bind(this)
    this.newTaskForm = this.newTaskForm.bind(this)
    this.nameTracking = this.nameTracking.bind(this)
    this.valueTracking = this.valueTracking.bind(this)
    this.typeTracking = this.typeTracking.bind(this)
    this.startDateTracking = this.startDateTracking.bind(this)
    this.durationTracking = this.durationTracking.bind(this)
    this.detailTracking = this.detailTracking.bind(this)
    this.mainForm = this.mainForm.bind(this)
  }

  changeBuffer(event) {
    var newVersion = Object.assign({}, this.state.data, {name: event.target.value})
    this.setState({data: newVersion})
  }

  headTitle() {
    var prefix, suffix

    prefix = (this.props.info.id === -1)
      ? 'New '
      : 'Edit '
    suffix = (this.props.currentLevel === 1)
      ? ' Task'
      : ''
    return prefix + this.props.type + suffix
  }

  getForm() {
    console.log(this.props.info)
    console.log(this.props.currentLevel)
    if (this.props.info.id === -1)
      if (this.props.currentLevel === 1)
        return this.newTaskForm()
      else
        return this.mainForm()
    else
      return this.mainForm()
  }

  newTaskForm() {
    return (
      <div>
        <div className="ib">
          <label>Name:</label>
          <input type="text" onChange={this.nameTracking}/>
        </div>
        <div className="ib">
          <label>Type:</label>
          <select onChange={this.typeTracking}>
            <option value="1">Repair</option>
            <option value="2">Planting</option>
            <option value="3">Harvest</option>
          </select>
        </div>
        <div className="ib">
          <label>Start day:</label>
          <input type="number" onChange={this.startDateTracking}/>
        </div>
        <div className="ib">
          <label>Duration:</label>
          <input type="number" onChange={this.durationTracking} />
        </div>
        <div className="ib">
          <label>Detail:</label>
          <textarea rows="3" onChange={this.detailTracking}></textarea>
        </div>
      </div>
    )
  }

  nameTracking(event) {
    this.valueTracking(event, 'name')
  }
  valueTracking(event, fieldName, isNumber) {
    var data = Object.assign({}, this.state.data)
    data[fieldName] = isNumber
      ? +event.target.value
      : event.target.value
    this.setState({data: data})
  }
  typeTracking(event) {
    var data = Object.assign({}, this.state.data)
    data.type.id = +event.target.value
    this.setState({data: data})
  }
  startDateTracking(event) {
    this.valueTracking(event, 'startDate', true)
  }
  durationTracking(event) {
    this.valueTracking(event, 'duration', true)
  }
  detailTracking(event) {
    this.valueTracking(event, 'detail')
  }

  mainForm() {
    return (
      <div>
        <div className="ib">
          <label>Process Name:</label>
          <input type="text" value={this.state.data.name}
              onChange={this.changeBuffer}/>
        </div>
      </div>
    )
  }

  render() {
    const head = this.headTitle()
    const commit = () => {this.props.commitCallBack(this.state.data)}
    const formCtx = this.getForm()
    return (
      <div className="dialog">
        <div className="dialog-ground"></div>
        <div className="dialog-content">
          <span className="dialog-close" onClick={this.props.off}>&times;</span>
          <div className="dialog-head">
            {head}
          </div>
          {formCtx}
          <div className="ib double-btn">
            <button className="btn-neutrality" onClick={this.props.off}>
              Cancel
            </button>
            <button className="btn-positive" onClick={ commit }>
              Save
            </button>
          </div>
        </div>
      </div>
    )
  }
}
