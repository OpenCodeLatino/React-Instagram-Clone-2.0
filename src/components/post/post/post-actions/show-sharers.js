import React, { Component, Fragment } from 'react'
import { humanReadable } from '../../../../utils/utils'
import Overlay from '../../../others/overlay'
import Sharers from '../../sharers/sharers'

export default class ShowSharers extends Component {

  state = {
    showSharers: false
  }

  toggleShares = () =>
    this.setState({ showSharers: !this.state.showSharers })

  render() {
    let { post_id, shares_count, decrementSharers } = this.props
    let { showSharers } = this.state

    return (
      <Fragment>
        <span
          className='p_comm'
          onClick={this.toggleShares}
        >{humanReadable(shares_count, 'share')}
        </span>

        {
          showSharers ?
            <Fragment>
              <Overlay/>
              <Sharers
                post={post_id}
                back={this.toggleShares}
                decrementSharers={decrementSharers}
              />
            </Fragment>
            : null
        }
      </Fragment>
    )
  }
}
