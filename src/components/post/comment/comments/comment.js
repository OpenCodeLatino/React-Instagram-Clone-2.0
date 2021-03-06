import React, { Component } from 'react'
import TimeAgo from 'handy-timeago'
import { Me } from '../../../../utils/utils'
import { connect } from 'react-redux'
import CommentType from './comment-type'
import CommentOptions from './options/comment-options'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

@connect()
export default class Comment extends Component {

  state = {
    text: ''
  }

  componentDidMount = () =>
    this.setState({ text: this.props.text })

  _toggle = what =>
    this.setState({ [what]: !this.state[what] })

  render() {
    let {
      comment_id,
      comment_by,
      comment_by_username,
      type,
      commentSrc,
      comment_time,
      decrementComments
    } = this.props
    let { text } = this.state

    return (
      <div>
        <div
          className={`comments ${Me(comment_by) ? 'my_comment' : ''}`}
        >
          <img className='comments_avatar' src={`/users/${comment_by}/avatar.jpg`} />

          <div className='comments_content'>
            <Link
              to={`/profile/${comment_by_username}`}
              className='comments_user'
            >{ comment_by_username }</Link>

            <CommentType
              type={type}
              text={text}
              commentSrc={commentSrc}
            />

            <div className='comments_bottom'>
              <span className='comments_time'>{ TimeAgo(comment_time) }</span>
            </div>

            <CommentOptions
              commentDetails={{ comment_id, comment_by, text, type, commentSrc }}
              decrementComments={decrementComments}
              updateCommentText={value =>
                this.setState({ text: value })
              }
            />

          </div>
        </div>

      </div>
    )
  }
}

Comment.propTypes = {
  comment_id: PropTypes.number.isRequired,
  comment_by: PropTypes.number.isRequired,
  comment_by_username: PropTypes.string.isRequired,
  comment_time: PropTypes.string.isRequired,
  post_id: PropTypes.number.isRequired,
  commentSrc: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.oneOf([ 'text', 'sticker', 'image' ]).isRequired,
  decrementComments: PropTypes.func.isRequired
}
