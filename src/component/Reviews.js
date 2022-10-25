import React, {useEffect, useState} from 'react'
import EachReview from './EachReview'

const Reviews = ({movieReviews}) => {
  // console.log("Reviews에서는" ,movieReviews)
  const [reviewHeight, setReviewHeight] = useState([])
  
  let element
  
  // 이터러블 프로토콜을 따르는 map 함수 만들기
  const customMap = (f, iter) => {
    let array = []
    for(const item of iter) {
      array.push(f(item))
    }
    return array
  }

  useEffect(()=>{
    element = document.querySelectorAll('.open')   // 전체 리뷰의 길이를 가져오는 코드
    
    setReviewHeight(customMap(item => item.clientHeight, element))  // 커스텀한 map을 통해 배열을 만듦
  },[element])

  // console.log("height",reviewHeight)
  console.log("리뷰 데이터",movieReviews.data.results)
  

  // const result = reviewHeight.reduce((acc, curr, idx)=>{
  //   acc[curr] = movieReviews.data.results[idx]
  //   return acc
  // }, new Object)

  // console.log("그 결과는? ", result)
  
  return (
    <div className='review-container'>
      {movieReviews.data && movieReviews.data.results[0] ? 
        movieReviews.data.results.map((review, index)=>(
          <EachReview review={review} key={index} num={index} height={reviewHeight[index]} />
        )) : (
          <div className='no-review'>
            No reviews in this Movie 
          </div> 
        )}
    </div>
  )
}



export default Reviews