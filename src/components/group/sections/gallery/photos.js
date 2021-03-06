import React, { Component, Fragment } from 'react'
import Nothing from '../../../others/nothing'
import PhotoGallery from 'react-photo-gallery'
import Overlay from '../../../others/overlay'
import ImageTheatre from '../../../others/image-theatre'
import { connect } from 'react-redux'

@connect(store => (
  {
    gd: store.Group.group_details,
    photos: store.Post.photos
  }
))

export default class GroupPhotos extends Component {

  state = {
    showImage: false,
    imgSrc: '',
    filter: '',
    username: '',
    time: '',
    link: ''
  }

  selectPhoto = (e, { photo }) => {
    let { src, filter, username, post_time, post_id } = photo
    this.setState({
      imgSrc: src,
      filter,
      username,
      time: post_time,
      link: `/post/${post_id}`,
      showImage: true,
    })
  }

  render() {
    let { photos, gd: { name } } = this.props
    let len = photos.length
    let { showImage, imgSrc, filter, username, time, link } = this.state
    let PHOTO_SET = []

    for (let f of photos) {
      PHOTO_SET.push({
        ...f,
        src: `/posts/${f.imgsrc}`,
        width: 15,
        height: 15,
        className: `g_photo ${f.filter}`
      })
    }

    return (
      <Fragment>
        {
          len == 0 ?
            <Nothing mssg={`${name} group has no photos!!`} />
            : <PhotoGallery
              photos={PHOTO_SET}
              columns={4}
              margin={7}
              onClick={this.selectPhoto}
            />
        }

        {
          showImage ?
            <Fragment>
              <Overlay
                close_on_click={true}
                close={() => this.setState({ showImage: false })}
                opacity={0.9}
              />
              <ImageTheatre
                imgSrc={imgSrc}
                filter={filter}
                username={username}
                time={time}
                link={link}
              />
            </Fragment>
            : null
        }

      </Fragment>
    )
  }
}
