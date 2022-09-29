import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube'

const Trailer = (props) => {

    console.log(props.movie)
  let videoTrailerIncludes = props.movieTrailer.results.map((item) => {
    let a = item.name.includes("Trailer")
    return a
  })
    
//   console.log(props.movie.results[videoId.indexOf(true)])

  console.log("인덱스는?", videoTrailerIncludes.indexOf(true))

  let videoIndex = videoTrailerIncludes.indexOf(true)
  
  let opts = {
    width: "100%",
    height: "600px"
  }
  
  if((matchMedia("screen and (max-width: 390px)")).matches) {
    opts.height = "350px"
  } else if(matchMedia("screen and (max-width: 575px)").matches) {
    opts.height = "400px"
  } else if(matchMedia("screen and (max-width: 767px)").matches) {
    opts.height = "440px"
  } else if(matchMedia("screen and (max-width: 1020px)").matches) {
    opts.height = "500px"
  } else if(matchMedia("screen and (max-width: 1370px)").matches) {
    opts.height = "570px"
  } else if(matchMedia("screen and (max-width: 2000px)").matches) {
    opts.height = "600px"
  }

  if((matchMedia("screen and (max-height: 391px)")).matches) {
    opts.height = "370px"
  }
  
  return (
    <div>
      <Modal
        className="modal"
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.movie.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.movieTrailer.results[videoIndex] ? (
            <YouTube
            videoId={props.movieTrailer.results[videoIndex].key}
            opts={opts}
          />
          ) : (
            <div className='no-trailer'>
              No Trailer in this Movie
            </div>
          )}
          
        </Modal.Body>
        <Modal.Footer>
          <button onClick={props.onHide} className="close-btn">Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Trailer
