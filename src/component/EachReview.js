import React, {useState, useEffect} from 'react'

const EachReview = ({review, height}) => {

    const [moreText, setMoreText] = useState(true)               // 전체 리뷰의 길이를 가져오기 위함
   
    useEffect(()=>{
    //     element = document.querySelectorAll(`.open`)   // 전체 리뷰의 길이를 가져오는 코드
    //     setReviewHeight(element)
        setMoreText(false)                                       // 전체 리뷰의 길이를 가져왔으므로 false로 초기화 해줌

    //     console.log("useEffect",element)
    },[])

    const appear = () => {
        setMoreText(!moreText)
        // console.log("리뷰 더보기",moreText)
    }

    console.log("height", height)

    return (
      <div className="reviews">
        <div className="review-card">
          <div className="author">「{review.author}」</div>
          <div id="review-container" className="review-content">
            <p id="review-text" className={moreText ? "open" : "close"}>
              {review.content}
            </p>
            {height > 62 ? 
                (<span className={moreText ? "more-btn" : ""} onClick={appear}>{moreText ? "...▲" : "...▼"}</span>) 
                : null
            }
          </div>
          <div className="review-date">
            Date {review.updated_at.substr(0, 10)}
          </div>
        </div>
      </div>
    );
}

export default EachReview
