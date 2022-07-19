import React from 'react'

import Swiper from 'react-id-swiper'

import css from './styles.scss'

function MainBanner({ className }) {
  const images = [
    { link: "", src: "/assets/dummy-banner.png" },
    { link: "/recipe/93df6e18-cc49-47b6-99f0-793958039906/news", src: "/assets/banner-konishie.png" },
    { link: "", src: "/assets/banner_B.png" },
    { link: "", src: "/assets/banner_B-1.png" },
    { link: "", src: "/assets/banner_B-2.png" },
    { link: "", src: "/assets/banner_B-3.png" },
    { link: "", src: "/assets/banner_B-4.png" },
  ]

  const Images = images.map((image, index) => {
    return (
      <div key={index} className="banner-item">
        <a className="banner-link" href={image.link ? image.link : void(0) }>
          <img src={image.src} className={`banner-image `} />
        </a>
      </div>
    )
  })

  const params = {
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  }

  return (
    <div className={`main-banner ${css.class} ${className || ''}`}>
      <Swiper wrapperClass="images-wrapper" slideClass="image-slide" {...params}>
        {Images}
      </Swiper>
    </div>
  )
}

export default MainBanner
