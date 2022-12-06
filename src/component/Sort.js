import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { movieAction } from "../redux/actions/movieActions";
import { Navigate, useNavigate } from "react-router-dom";
import { movieActions } from "../redux/reduce/movieReducer";

const Sort = ({ movies }) => {
  const [sortingOption, setSortingOption] = useState("");
  const dispatch = useDispatch();
  // const [sortWords, setSortWords] = useState();

  useEffect(() => {
    // 대중성 오름차순
    const popularAsc = movies?.results
      .slice()
      .sort((a, b) => a.popularity - b.popularity);

    // 대중성 내림차순
    const popularDesc = movies?.results
      .slice()
      .sort((a, b) => b.popularity - a.popularity);

    // 개봉일 오름차순
    const newestAsc = movies?.results
      .slice()
      .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

    // 개봉일 내림차순
    const newestDesc = movies?.results
      .slice()
      .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

    dispatch(
      movieAction.sortingMovies(popularAsc, popularDesc, newestAsc, newestDesc)
    );

    // console.log("날짜별로 나오나요?", newestAsc);
    // console.log("파퓰러 낮은순으로", popularAsc);
    // console.log(movies?.results[0].release_date);
    // console.log(new Date(movies?.results[0].release_date));
  }, []);

  // let sorting = movies?.results.sort((a, b) => a.popularity - b.popularity);

  // console.log("대중성 정렬값", popularityAsc);

  // console.log("기본 정렬값", movies.results);

  const sortingResult = (event) => {
    event.preventDefault();

    let sortingWords = event.target.innerHTML;
    console.log("클릭이 되었습니다.", sortingWords);

    // setSortWords(sortingWords);
    dispatch(movieAction.sortingKeyword(sortingWords.toLowerCase()));

    setSortingOption(sortingWords);
  };

  return (
    <div>
      <div className="sort-headline">
        <p>-Sorting Option-</p>
      </div>
      <div className="sort-btn-area">
        <button onClick={sortingResult}>Popularity Desc</button>
        <button onClick={sortingResult}>Popularity Asc</button>
        <button onClick={sortingResult}>Newest Desc</button>
        <button onClick={sortingResult}>Newest Asc</button>
      </div>
      <div className="sorting-option-display">
        <p>Now sorting : {sortingOption}</p>
      </div>

      {/* <Dropdown>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
        ></Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={sortingResult}>Popularity Desc</Dropdown.Item>
          <Dropdown.Item onClick={sortingResult}>Popularity Asc</Dropdown.Item>
          <Dropdown.Item onClick={sortingResult}>Newest Desc</Dropdown.Item>
          <Dropdown.Item onClick={sortingResult}>Newest Asc</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
    </div>
  );
};

export default Sort;
