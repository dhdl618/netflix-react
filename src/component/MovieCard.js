import React from 'react'
import { Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({item}) => {
  const genreList = useSelector(state=>state.movies.genreList)
  // console.log("장르 가져옴?",genreList)
  
  const navigate = useNavigate()
  
  const goDetailPage = () => {
    navigate(`/movies/${item.id}`)
  }

  return (
    <div className="card" onClick={goDetailPage}>
      <div
        className="card-img"
        style={{
          backgroundImage:
            "url(" +
            `https://www.themoviedb.org/t/p/original///${item.backdrop_path}` +
            ")",
        }}
      ></div>
      <div className="overlay">
        <h2>{item.title}</h2>
        <div style={{ marginTop: "15px" }}>
          <div>
            {item.genre_ids.map((id) => (
              <Badge className='badge-style' bg="danger">
                {genreList.find((item) => item.id === id).name}
              </Badge>
            ))}
          </div>
          <div>
            <span>⭐ {item.vote_average}</span>
          </div>
          <div>
            <span
              className="age-rated"
              style={item.adult ? { color: "red" } : { color: "green" }}
            >
              {item.adult ? "R-rated" : "G-rated"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard
