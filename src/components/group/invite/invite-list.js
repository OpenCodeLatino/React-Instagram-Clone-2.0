import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Notify from 'handy-notification'
import { insta_notify } from '../../../utils/utils'
import d from '../../../utils/DOM'
import PrimaryButton from '../../others/button/primary-btn'

export default class InviteList extends Component {

  invite = async e => {
    e.preventDefault()
    new d('.invite_btn').blur()
    let { follow_to, username, group, back } = this.props
    insta_notify({
      to: follow_to,
      type: 'invite',
      group_id: group,
    })
    Notify({ value: `Invited ${username}!!` })
    back()
  }

  render() {
    let { follow_to, username, firstname, surname } = this.props

    return (
      <div className='modal_items'>
        <div className='modal_it_img'>
          <img src={`/users/${follow_to}/avatar.jpg`} />
        </div>
        <div className='modal_it_content '>
          <div className='modal_it_info'>
            <Link to={`/profile/${username}`} className='modal_it_username' >{username}</Link>
            <span className='modal_it_light' >{`${firstname} ${surname}`}</span>
          </div>
          <div className='modal_ff'>
            <PrimaryButton
              label='Invite'
              onClick={this.invite}
              extraClass='invite_btn'
            />
          </div>
        </div>
        <hr/>
      </div>
    )
  }
}
