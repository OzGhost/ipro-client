
import React from 'react'

export default class Foot extends React.Component {

  constructor(props) {
    super(props)
    
    this.getAdditionBtn = this.getAdditionBtn.bind(this)
  }

  getAdditionBtn() {
    return (
      <span>
      <button className="btn-neutrality" onClick={this.props.back}>
        Back
      </button>
      <button className="btn-colorful"
          onClick={this.props.im}>
        Import
      </button>
      <button className="btn-colorness"
          onClick={this.props.ex}>
        Export
      </button>
      </span>
    )
  }

  render(){
    var style, addition
    if (this.props.currentLevel === 1) {
      style = 'double-double-btn'
      addition = this.getAdditionBtn()
    } else {
      style = 'single-btn'
    }
    return(
      <div className={style}>
        {addition}
        <button className="btn-positive" onClick={this.props.dialogOn}>
          Add
        </button>
      </div>
    )
  }
}
