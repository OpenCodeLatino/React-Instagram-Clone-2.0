import React, { Component } from 'react'
import Title from '../../others/title'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux'
import { getPostTags } from '../../../store/actions/post-a'
import { llr } from '../../../utils/utils'
import TagItems from './tag-list/tag-list'
import PropTypes from 'prop-types'
import ModalHeader from '../../others/modal/modal-header'
import ModalBack from '../../others/modal/modal-back'
import ModalMiddle from '../../others/modal/modal-middle'
import IsLoading from '../../others/isLoading'

@connect(store => (
  { Tags: store.Post }
))

export default class Tags extends Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    let { dispatch, post } = this.props
    dispatch(getPostTags(post))
  }

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  componentDidUpdate = () => llr()

  render() {
    let
      { loading } = this.state,
      {
        Tags: { tags },
        decrementTags,
        back
      } = this.props,
      map_tags = tags.map(t =>
        <TagItems
          key={t.post_tag_id}
          {...t}
          decrementTags={decrementTags}
        />
      )

    return (
      <div class='tags_model modal modal_big' >

        <Title value='Tags' />

        <FadeIn duration='300ms' >
          <ModalHeader title='Tagged in this post' />

          <Scrollbars style={{ height: 450 }} className='modal_middle' >
            <IsLoading loading={loading} />
            <ModalMiddle loading={loading} list={map_tags} />
          </Scrollbars>

          <div className='modal_bottom'>
            <ModalBack back={back} />
          </div>
        </FadeIn>

      </div>
    )
  }
}

Tags.propTypes = {
  post: PropTypes.number.isRequired,
  back: PropTypes.func.isRequired,
  decrementTags: PropTypes.func.isRequired
}
