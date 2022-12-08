import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "../redux/actions/movieActions";
import { Navigate, useNavigate } from "react-router-dom";
import { movieActions } from "../redux/reduce/movieReducer";

const Sort = ({ movies }) => {
  const [sortingOption, setSortingOption] = useState("");
  const [minYearValue, setMinYearValue] = useState(1990);
  const [maxYearValue, setMaxYearValue] = useState(2022);
  const dispatch = useDispatch();
  const genreList = useSelector((state) => state.movies.genreList);
  // const [sortWords, setSortWords] = useState();
  console.log("장르리스트", genreList);

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

  // 년도별 정렬 슬라이드바
  const rangeInput = document.querySelectorAll(".range-input input");
  const rangeBar = document.querySelector(".range-bar .range-bar-inner");
  let yearGap = 1;

  rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minValue = parseInt(rangeInput[0].value);
      let maxValue = parseInt(rangeInput[1].value);

      if (maxValue - minValue < yearGap) {
        if (e.target.className === "range-min") {
          rangeInput[0].value = maxValue - yearGap;
        } else {
          rangeInput[1].value = minValue + yearGap;
        }
      } else {
        rangeBar.style.left =
          ((minValue - 1990) / (rangeInput[0].max - 1990)) * 100 + "%";
        rangeBar.style.right =
          100 - ((maxValue - 1990) / (rangeInput[1].max - 1990)) * 100 + "%";
      }
    });
  });

  return (
    <div>
      <div className="popular-newest-sorting-area">
        <div className="pop-new-sort-header">
          <p>Sorting Option</p>
        </div>
        <div className="pop-new-sort-btn-area">
          <button onClick={sortingResult}>Popularity Desc</button>
          <button onClick={sortingResult}>Popularity Asc</button>
          <button onClick={sortingResult}>Newest Desc</button>
          <button onClick={sortingResult}>Newest Asc</button>
        </div>
        <div className="pop-new-sorting-option-display">
          <p>Now sorting : {sortingOption}</p>
        </div>
      </div>
      <div className="year-sorting-area">
        <div className="year-sort-header">
          <p>Sorting by Year</p>
        </div>
        <div className="range-bar">
          <div className="range-bar-inner"></div>
        </div>
        <div className="year-sorting-slide">
          <div className="range-input">
            <input
              type="range"
              className="range-min"
              min={1990}
              max={2022}
              step={1}
              defaultValue={1990}
              onChange={(e) => {
                setMinYearValue(e.target.value);
              }}
            ></input>
            <input
              type="range"
              className="range-max"
              min={1990}
              max={2022}
              step={1}
              defaultValue={2022}
              onChange={(e) => {
                setMaxYearValue(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="year-sorting-display">
          <h2>{minYearValue}</h2>
          <p>&nbsp;&nbsp;to&nbsp;&nbsp;</p>
          <h2>{maxYearValue}</h2>
        </div>
      </div>
      <div className="genre-sorting-area">
        <div className="genre-sort-header">
          <p>Sorting by Genre</p>
        </div>
        <div className="genre-sorting-btn">
          {genreList?.map((item, index) => (
            <button key={index}>{item.name}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sort;
