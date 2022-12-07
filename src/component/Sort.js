import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { movieAction } from "../redux/actions/movieActions";
import { Navigate, useNavigate } from "react-router-dom";
import { movieActions } from "../redux/reduce/movieReducer";
import InputRange from "react-input-range";

const Sort = ({ movies }) => {
  const [sortingOption, setSortingOption] = useState("");
  const [minYearValue, setMinYearValue] = useState(1990);
  const [maxYearValue, setMaxYearValue] = useState(2022);
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

  const rangeInput = document.querySelectorAll(".range-input input");
  const rangeBar = document.querySelector(".range-bar .range-bar-inner");

  rangeInput.forEach((input) => {
    input.addEventListener("input", () => {
      let minValue = parseInt(rangeInput[0].value);
      let maxValue = parseInt(rangeInput[1].value);

      let a = (minValue / rangeInput[0].max) * 100 + "%";
      rangeBar.style.right = 100 - maxValue / rangeInput[1].max + "%";
      console.log(a, "그리고", maxValue);
    });
  });

  return (
    <div>
      <div className="popular-newest-sorting-area">
        <div className="pop-new-sort-option">
          <p>-Sorting Option-</p>
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
              onChange={(e) => {
                setMaxYearValue(e.target.value);
              }}
            ></input>
          </div>
          {/* <input
            className="left-slidebar"
            type="range"
            min={1990}
            max={2022}
            color="gray"
            step={1}
            onChange={(e) => {
              setYearValue(e.target.value);
            }}
          ></input>
          <input
            className="right-slidebar"
            type="range"
            min={1990}
            max={2022}
            color="gray"
            step={1}
            onChange={(e) => {
              setYearValue(e.target.value);
            }}
          ></input> */}
        </div>
        <div className="year-sorting-display">
          <h2>{minYearValue}</h2>
          <p>&nbsp;&nbsp;to&nbsp;&nbsp;</p>
          <h2>{maxYearValue}</h2>
        </div>
      </div>
    </div>
  );
};

export default Sort;
