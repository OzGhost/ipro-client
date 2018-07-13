import React from 'react'
import Item from './Item.jsx'

export default class Toc extends React.Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    const items = this.props.ds
      .map(i => <Item key={i.id}
                  info={i}
                  rmFunc={this.props.rmFunc}
                  eFunc={this.props.eFunc}
                  load={this.props.load} />)
    return(
      <div className="toc">
        {items}
      </div>
    )
  }
}
