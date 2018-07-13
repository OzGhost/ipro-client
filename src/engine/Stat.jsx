import React from 'react'

export default class Stat extends React.Component {
  render() {
    const msgContent = this.props.level === 0
      ? "The list of " + this.props.type.toLowerCase() + ":"
      : 'Tasks of '
    const supervisor = this.props.level === 1
      ? this.props.supervisor
      : ''

    return(
      <p className="stat-bar">
        {msgContent}
        <b> {supervisor} </b>
      </p>
    )
  }
}
