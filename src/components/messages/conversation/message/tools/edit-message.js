import React, { Component, Fragment } from 'react'
import { isAdmin } from '../../../../../utils/admin-utils'
import Overlay from '../../../../others/overlay'
import EditMessage from '../edit'
import PropTypes from 'prop-types'
import MaterialIcon from '../../../../others/icons/material-icon'

export default class EditMessageTool extends Component {

  state = {
    editMessage: false
  }

  toggleEdit = () =>
    this.setState({ editMessage: !this.state.editMessage })

  render() {
    let {
      messageDetails: { message_id, type, message },
      updateMessage
    } = this.props
    let { editMessage } = this.state

    return (
      <Fragment>
        {
          type == 'text' ?
            <span
              data-tip={`Edit ${isAdmin() ? 'as admin' : ''}`}
              onClick={this.toggleEdit}
            >
              <MaterialIcon icon='mode_edit' />
            </span>
            : null
        }

        {
          editMessage ?
            <Fragment>
              <Overlay/>
              <EditMessage
                back={this.toggleEdit}
                message={message}
                message_id={message_id}
                changeMessage={message =>
                  updateMessage(message)
                }
              />
            </Fragment>
            : null
        }
      </Fragment>
    )
  }
}

EditMessageTool.propTypes = {
  messageDetails: PropTypes.shape({
    message_id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  updateMessage: PropTypes.func.isRequired,
}
