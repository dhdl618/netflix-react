import React from 'react'

const Banner = ({movie}) => {
    // console.log("무비는",movie)
  return (
    <div className='banner' style={{backgroundImage: "url("+`https://www.themoviedb.org/t/p/original///${movie.backdrop_path}`+")", backgroundPosition: "center center"}}>
      <div className='banner-info'>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </div>
    </div>
  )
}

export default Banner
