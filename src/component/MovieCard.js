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
        style={item.backdrop_path ? {
          backgroundImage:
            "url(" +
            `https://www.themoviedb.org/t/p/original///${item.backdrop_path}` +
            ")"
        } : {backgroundImage:
              "url(" +
              `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOsAAACWCAMAAAAIaI/4AAAAMFBMVEXs7OyhoaG1tbXY2NjJycni4uKwsLCrq6vOzs6/v7+mpqbd3d3R0dHl5eXExMSzs7PBRp5FAAABoUlEQVR4nO3Y3XKDIBCGYXblR0H0/u+2i6ZpepLOtGNpyfskB2KczH7DhojOAQAAAAAAAAAAAAAAAAAAAAAAAAA6KjmlrO9i6V3PlfZ9XvU89Ko19q3mWqr3rHq8Bqal1lvjquaxs6bZ+PZb9e0o9a7nSmldV5+qczV5Oxw6a2tarese16q34bDOgLb8Rrc7sg7j1sPxVXq47G1tOu6Zhs/qiu67lvtwVPp0OJZXyhrr42jse/8S9cHYezoAAPBDQSQ4J9PHmVlE+tVzpSB5+ZzVwnar5lpBvE2sZfUi6bwdbFmXmCVuInbjL8cHIYpk7+Ysee5c8rcFmZbFsk4WdzsfGZ5ZS80xBFnbGbtCLXX0UwpuzfXpN/5dltXeMnnLUuWY2COrNbb69qzYbblNb+ty9Tb5cvzA/yUL6hZ9ktUn6+971n+9wWtZbS0+enh56OF71i3aFlZd3FxJfpLZtnydS/62ltXWpYe16fjP+chqi1K2rCVJSt55a+ild82/IOTp64tG0GZ7610EAAAAAAAAAAAAAAAAAAAAAAAAALygNxQKCF9kdwX3AAAAAElFTkSuQmCC` +
              ")"
            }}
      ></div>
      <div className="overlay">
        <h4>{item.title}</h4>
        <div style={{ marginTop: "15px" }}>
          <div className='badge-area'>
            {item.genre_ids.map((id, index) => (
              <Badge key={index} className='badge-style' bg="danger">
                {genreList.find((item) => item.id === id).name}
              </Badge>
            ))}
          </div>
          <div>
            <span>⭐ {item.vote_average.toFixed(1)}</span>
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
