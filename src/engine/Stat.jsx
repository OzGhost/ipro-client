import React from 'react'

export default class Stat extends React.Component {
  render() {
    const msgContent = this.props.taskLevel
      ? "The list of task belong to "
      : "The list of " + this.props.type.toLowerCase() + "s:"
    return(
      <p className="stat-bar">{msgContent}</p>
    )
  }
}
