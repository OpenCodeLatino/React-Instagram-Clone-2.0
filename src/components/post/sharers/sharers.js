import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import Title from '../../others/title'
import { connect } from 'react-redux'
import { getPostSharers } from '../../../store/actions/post-a'
import Sharer from './sharer/sharer'
import { llr } from '../../../utils/utils'
import PropTypes from 'prop-types'
import ModalHeader from '../../others/modal/modal-header'
import ModalBack from '../../others/modal/modal-back'
import ModalMiddle from '../../others/modal/modal-middle'
import IsLoading from '../../others/isLoading'

@connect(store => (
  { sharers: store.Post.sharers }
))

export default class Sharers extends Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    let { dispatch, post } = this.props
    dispatch(getPostSharers(post))
  }

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  componentDidUpdate = () => llr()

  render() {
    let
      { loading } = this.state,
      { sharers, decrementSharers, back } = this.props,
      map_sharers = sharers.map(s =>
        <Sharer
          key={s.share_id}
          {...s}
          decrementSharers={decrementSharers}
        />
      )

    return (
      <div class='modal modal_big' >

        <Title value='Post shared by' />

        <FadeIn duration='300ms' >
          <ModalHeader title='Post shared by' />

          <Scrollbars style={{ height: 450 }} className='modal_middle' >
            <IsLoading loading={loading} />
            <ModalMiddle loading={loading} list={map_sharers} />
          </Scrollbars>

          <div className='modal_bottom'>
            <ModalBack back={back} />
          </div>
        </FadeIn>

      </div>
    )
  }
}

Sharers.propTypes = {
  post: PropTypes.number.isRequired,
  back: PropTypes.func.isRequired,
  decrementSharers: PropTypes.func.isRequired
}
