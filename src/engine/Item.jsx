import React from 'react'

export default class Item extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      more: false
    }
    
    this.more = this.more.bind(this)
  }

  more() {
    const current = this.state.more
    this.setState({more: !current})
  }

  render() {
    const i = this.props.info
    const itemClasses = "item" + (this.state.more ? " open" : "")
    const editFunc = () => { this.props.eFunc(i.id) }
    const rmFunc = () => { this.props.rmFunc(i.id) }
    const loadFunc = (e) => { e.preventDefault(); this.props.load(i.id) }
    return(
      <div className={itemClasses}>
        <div className="cname" onClick={loadFunc}>
          <a href="#" className="btn">
            {i.name}
          </a>
        </div>
        <div className="more-opt" onClick={this.more}>
          <span className="tripple-dot"></span>
        </div>
        <div className="hidden-opt">
          <button className="btn-negative" onClick={rmFunc}>
            Remove
          </button>
          <button className="btn-neutrality" onClick={editFunc}>
            Edit
          </button>
        </div>
      </div>
    )
  }
}
