import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import Title from '../../../others/title'
import { getPostLikes } from '../../../../store/actions/post-a'
import { connect } from 'react-redux'
import LikeList from './like-list/like-list'
import { llr } from '../../../../utils/utils'
import PropTypes from 'prop-types'
import ModalHeader from '../../../others/modal/modal-header'
import ModalBack from '../../../others/modal/modal-back'
import ModalMiddle from '../../../others/modal/modal-middle'
import IsLoading from '../../../others/isLoading'

@connect(store => (
  { likes: store.Post.likes }
))

export default class Likes extends Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    let { post, dispatch } = this.props
    dispatch(getPostLikes(post))
  }

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  componentDidUpdate = () => llr()

  render() {
    let
      { loading } = this.state,
      { likes, decrementLikes, back } = this.props,
      map_likes = likes.map(l =>
        <LikeList
          key={l.like_id}
          {...l}
          decrementLikes={decrementLikes}
        />
      )

    return (
      <div class='likes modal modal_big' >

        <Title value='Likes' />

        <FadeIn duration='300ms' >
          <ModalHeader title='Likes' />

          <Scrollbars style={{ height: 450 }} className='modal_middle' >
            <IsLoading loading={loading} />
            <ModalMiddle loading={loading} list={map_likes} />
          </Scrollbars>

          <div className='modal_bottom'>
            <ModalBack back={back} />
          </div>
        </FadeIn>

      </div>
    )
  }
}

Likes.propTypes = {
  post: PropTypes.number.isRequired,
  back: PropTypes.func.isRequired,
  decrementLikes: PropTypes.func.isRequired
}
