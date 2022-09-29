import React, {useState} from 'react'

const Reviews = ({movieReviews}) => {
  const [reviewAppearance, setReviewAppearance] = useState(false)

  const appear = () => {
    setReviewAppearance(!reviewAppearance)
    console.log(reviewAppearance)
  }

  // let pHeight = document.querySelector('.review-content')
  // console.log(pHeight.offsetHeight)

  return (
    <div className='review-container'>
      {movieReviews.data ?
        <div className="reviews">
          {movieReviews.data.results[0] ?
            movieReviews.data.results.map((review, index) => (
            // {console.log(review)}
            <div className="review-card" key={index}>
              <div className="author">「{review.author}」</div>
              <div className="review-content">
                <p id="review-text" className={reviewAppearance ? "" : "close"}>{review.content}</p>
                  <span onClick={appear}>{reviewAppearance ? "...▲" : "...▼"}</span>
                
              </div>
              <div className="review-date">Date {review.updated_at.substr(0,10)}</div>
            </div>
          )) : (
            <div className='no-review'>
                No reviews in this Movie 
            </div>
          )}
        </div> :
        <div>
          *** 오류 발생 ***
        </div>
        }
    </div>
  )
}

export default Reviews
