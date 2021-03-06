import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux'
import { llr } from '../../../utils/utils'
import InviteList from './invite-list'
import { getUsersToInvite } from '../../../store/actions/group-a'
import ModalHeader from '../../others/modal/modal-header'
import ModalBack from '../../others/modal/modal-back'
import ModalMiddle from '../../others/modal/modal-middle'
import IsLoading from '../../others/isLoading'

@connect(store => (
  { users: store.Group.usersToInvite }
))

export default class Invite extends Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    let { dispatch } = this.props
    dispatch(getUsersToInvite())
  }

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  componentDidUpdate = () => llr()

  render() {
    let
      { loading } = this.state,
      { users, back, group } = this.props,
      map_users = users.map(u =>
        <InviteList
          key={u.follow_id}
          {...u}
          back={back}
          group={group}
        />
      )

    return (
      <div class='likes modal modal_big' >

        <FadeIn duration='300ms' >
          <ModalHeader title='Invite' />

          <Scrollbars style={{ height: 450 }} className='modal_middle' >
            <IsLoading loading={loading} />
            <ModalMiddle loading={loading} list={map_users} />
          </Scrollbars>

          <div className='modal_bottom' >
            <ModalBack back={back} />
          </div>
        </FadeIn>

      </div>
    )
  }
}
