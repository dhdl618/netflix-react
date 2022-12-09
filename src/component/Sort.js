import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "../redux/actions/movieActions";

const Sort = ({ movies }) => {
  const [sortingOption, setSortingOption] = useState("");
  const [minYearValue, setMinYearValue] = useState(1930);
  const [maxYearValue, setMaxYearValue] = useState(2022);
  const dispatch = useDispatch();
  const genreList = useSelector((state) => state.movies.genreList);
  // const [sortWords, setSortWords] = useState();
  // console.log("장르리스트", genreList);

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
  }, []);

  // 대중성, 최신순 정렬 버튼
  const sortingByDescAsc = (event) => {
    event.preventDefault();

    let sortingWords = event.target.innerHTML;
    console.log("클릭이 되었습니다.", sortingWords);

    // setSortWords(sortingWords);
    dispatch(movieAction.sortingKeyword(sortingWords.toLowerCase()));

    setSortingOption(sortingWords);

    handleClicked(event);
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
          ((minValue - 1930) / (rangeInput[0].max - 1930)) * 100 + "%";
        rangeBar.style.right =
          100 - ((maxValue - 1930) / (rangeInput[1].max - 1930)) * 100 + "%";
      }
    });
  });

  // 년도별 정렬 슬라이드 변화를 감지하여 값 디스패치
  const filteringYear = () => {
    console.log(rangeInput[0].value, " 과 ", rangeInput[1].value, " 사이");

    dispatch(
      movieAction.sortingByYear(
        Number(rangeInput[0].value),
        Number(rangeInput[1].value)
      )
    );
  };

  // 장르별 정렬 버튼
  let genreClicked = [];

  const sortingByGenre = (event) => {
    event.preventDefault();

    let genre = event.target.innerHTML;

    console.log("클릭 값", genre);

    if (genreClicked.length > 0) {
      if (genreClicked.includes(genre)) {
        genreClicked.splice(genreClicked.indexOf(genre), 1);
      } else {
        genreClicked.push(genre);
      }
    } else {
      genreClicked.push(genre);
    }

    console.log("배열 확인", genreClicked);

    handleClicked(event);
  };

  const submitGenre = () => {
    dispatch(movieAction.sortingByGenre(genreClicked));
    console.log("디스패치 이후", genreClicked);
  };

  // 정렬 버튼 클릭 시, css 추가
  const buttonClicked = document.getElementsByClassName("pop-new-sort-btns");

  const handleClicked = (event) => {
    if (event.target.classList[1] === "clicked") {
      event.target.classList.remove("clicked");
    } else {
      for (let i = 0; i < buttonClicked.length; i++) {
        buttonClicked[i].classList.remove("clicked");
      }
      event.target.classList.add("clicked");
    }

    // console.log("확인용", event.target.classList);
  };

  return (
    <div>
      <div className="popular-newest-sorting-area">
        <div className="pop-new-sort-header">
          <p>Sorting Option</p>
        </div>
        <div className="pop-new-sort-btn-area">
          <button className="pop-new-sort-btns" onClick={sortingByDescAsc}>
            Popularity Desc
          </button>
          <button className="pop-new-sort-btns" onClick={sortingByDescAsc}>
            Popularity Asc
          </button>
          <button className="pop-new-sort-btns" onClick={sortingByDescAsc}>
            Newest Desc
          </button>
          <button className="pop-new-sort-btns" onClick={sortingByDescAsc}>
            Newest Asc
          </button>
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
              min={1930}
              max={2022}
              step={1}
              defaultValue={1930}
              onChange={(e) => {
                setMinYearValue(e.target.value);
                filteringYear();
              }}
            ></input>
            <input
              type="range"
              className="range-max"
              min={1930}
              max={2022}
              step={1}
              defaultValue={2022}
              onChange={(e) => {
                setMaxYearValue(e.target.value);
                filteringYear();
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
            <button
              className="genre-sort-btns"
              onClick={sortingByGenre}
              key={index}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div>
          <button onClick={submitGenre}>result</button>
        </div>
      </div>
    </div>
  );
};

export default Sort;
