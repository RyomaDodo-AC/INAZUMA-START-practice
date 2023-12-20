/**
 * Swiper
 * Reactに正式対応されたら改めて中身を見直す
 * @see https://swiperjs.com/element#usage-with-react
 */
// 'use client'
// import { useRef, useEffect } from 'react'
import { register } from 'swiper/element/bundle'
import type { SwiperProps, SwiperSlideProps } from 'swiper/react'

register()
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & SwiperProps, HTMLElement>
      'swiper-slide': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & SwiperSlideProps, HTMLElement>
    }
  }
}

interface SwiperComponentProps {
  /**
   * スライダーコンテンツの配列
   */
  contents: React.ReactNode[]
}

export const Swiper: React.FC<SwiperComponentProps> = ({ contents }) => {
  // const swiperElRef = useRef(null)

  // useEffect(() => {
  //   // listen for Swiper events using addEventListener
  //   swiperElRef.current.addEventListener('progress', (e) => {
  //     const [swiper, progress] = e.detail
  //     console.log(progress)
  //   })

  //   swiperElRef.current.addEventListener('slidechange', (e) => {
  //     console.log('slide changed')
  //   })
  // }, [])

  const slides = contents.map((content, index) => {
    return (
      <swiper-slide key={index} lazy={true}>
        <div className="px-10">{content}</div>
      </swiper-slide>
    )
  })

  return (
    <swiper-container navigation={true} pagination={true} loop={true} slidesPerView="auto" centeredSlides={true}>
      {slides}
    </swiper-container>
  )
}
