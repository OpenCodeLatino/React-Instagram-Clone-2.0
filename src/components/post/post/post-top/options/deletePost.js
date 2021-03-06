import React, { Component, Fragment } from 'react'
import { Me } from '../../../../../utils/utils'
import { isAdmin } from '../../../../../utils/admin-utils'
import { deletePost } from '../../../../../utils/post-utils'
import Overlay from '../../../../others/overlay'
import Prompt from '../../../../others/prompt'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

@connect()
export default class DeletePostOption extends Component {

  state = {
    deletePost: false,
    redirect: false,
  }

  showDeletePost = e => {
    e ? e.preventDefault() : null
    this.setState({ deletePost: !this.state.deletePost })
  }

  delete = async e => {
    e.preventDefault()
    let { postDetails: { post_id, when }, dispatch } = this.props
    deletePost({
      post_id, when, dispatch,
      redirect: () => this.setState({ redirect: true })
    })
  }

  render() {
    let {
      postDetails: { user },
      toggleOptions,
    } = this.props
    let { deletePost, redirect } = this.state

    return (
      <Fragment>
        { redirect ? <Redirect to='/' /> : null }

        {
          Me(user) || isAdmin() ?
            <li>
              <a href='#' className='delete_post' onClick={this.showDeletePost}>
                Delete post {isAdmin() ? 'as admin' : null}
              </a>
            </li>
            : null
        }

        {
          deletePost ?
            <Fragment>
              <Overlay/>
              <Prompt
                title='Delete post'
                content="This post will be deleted. There's no undo so you won't be able to find it."
                actionText= 'Delete'
                action={this.delete}
                back={() => {
                  toggleOptions()
                  this.setState({ deletePost: false })
                }}
              />
            </Fragment>
            : null
        }

      </Fragment>
    )
  }
}

DeletePostOption.propTypes = {
  postDetails: PropTypes.shape({
    user: PropTypes.number.isRequired,
    post_id: PropTypes.number.isRequired,
    when: PropTypes.string.isRequired
  }).isRequired,
  toggleOptions: PropTypes.func.isRequired
}
