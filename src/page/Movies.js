import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../component/Card";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { movieAction } from "../redux/actions/movieActions";
import Spinner from "react-bootstrap/Spinner";
import { useSearchParams } from "react-router-dom";
import Sort from "../component/Sort";

const Movies = () => {
  const state = useSelector((state) => state.movies);
  console.log("스테이트 상태", state);

  const dispatch = useDispatch();
  const [query, setQuery] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  // const [sortingType, setSortingType] = useState("popularity desc");

  let searchQuery = query.get("query");
  console.log("쿼리", searchQuery);

  useEffect(() => {
    if (searchQuery === null || searchQuery === "") {
      dispatch(movieAction.getMovies(currentPage));
    } else {
      dispatch(movieAction.getSearchMovies(searchQuery, currentPage));
    }
  }, [query, currentPage]);

  let movies;

  if (searchQuery) {
    movies = state?.searchMovies.data;
  } else if (state.clickedGenres || state.clickedSortingOption) {
    movies = state?.sortingMoviesByOptions.data;
  } else {
    movies = state?.popularMovies.data;
  }

  console.log("카드", movies);

  const sortOption = state?.clickedSortingOption;
  console.log("정렬 옵션은 뭔가욥", sortOption);
  let optionNum;

  if (sortOption === "popularity.desc") {
    optionNum = 1;
  } else if (sortOption === "popularity.asc") {
    optionNum = 2;
  } else if (sortOption === "release_date.desc") {
    optionNum = 3;
  } else if (sortOption === "release_date.asc") {
    optionNum = 4;
  } else {
    optionNum = 0;
  }

  // 페이지네이션
  let totalPages = movies?.total_pages > 50 ? 50 : movies?.total_pages;
  let pageGroup = Math.ceil(currentPage / 5);
  let lastPage = pageGroup * 5;
  let firstPage = lastPage - 4;

  const buttonMaker = () => {
    let arr = [];
    for (let i = firstPage; i <= lastPage; i++) {
      arr.push(
        <button
          onClick={() => {
            movePage(i);
          }}
          className="page-btn-area"
          style={
            currentPage === i
              ? i === 50
                ? {
                    backgroundColor: "rgb(255, 185, 197)",
                    color: "black",
                    marginRight: "0px",
                  }
                : { backgroundColor: "rgb(255, 185, 197)", color: "black" }
              : {}
          }
        >
          {i}
        </button>
      );
    }
    return arr;
  };

  const movePage = (pageNum) => {
    console.log("버튼 선택", pageNum);
    if (pageNum < 1) {
      setCurrentPage(1);
    } else if (pageNum > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(pageNum);
    }
  };

  if (totalPages - firstPage < 4) {
    if (totalPages - 4 <= 0) {
      firstPage = 1;
    } else {
      firstPage = totalPages - 4;
    }
  }

  // 페이지가 5페이지 이하일 경우,
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }

  // console.log(totalPages);

  const loading = state.loading;

  //로딩이 true면 스피너를 보여주고 false면 데이터를 보여줌
  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="danger" className="loading" />
      </div>
    );
  }

  console.log("현재 옵션 넘버", optionNum);

  return (
    <div className="movies-page">
      <Container>
        <Row>
          <Col lg={4} className="test">
            <Sort movies={movies} />
          </Col>
          <Col lg={8}>
            <div className="movies-container">
              {optionNum === 1
                ? state?.popularDesc
                    .filter(
                      (item) =>
                        state.minYear <=
                          Number(item.release_date?.split("-")[0]) &&
                        Number(item.release_date?.split("-")[0]) <=
                          state.maxYear
                    )
                    .map((item, index) => <Card item={item} key={index} />)
                : optionNum === 2
                ? state?.popularAsc
                    .filter(
                      (item) =>
                        state.minYear <=
                          Number(item.release_date?.split("-")[0]) &&
                        Number(item.release_date?.split("-")[0]) <=
                          state.maxYear
                    )
                    .map((item, index) => <Card item={item} key={index} />)
                : optionNum === 3
                ? state?.newestDesc
                    .filter(
                      (item) =>
                        state.minYear <=
                          Number(item.release_date?.split("-")[0]) &&
                        Number(item.release_date?.split("-")[0]) <=
                          state.maxYear
                    )
                    .map((item, index) => <Card item={item} key={index} />)
                : optionNum === 4
                ? state?.newestAsc
                    .filter(
                      (item) =>
                        state.minYear <=
                          Number(item.release_date?.split("-")[0]) &&
                        Number(item.release_date?.split("-")[0]) <=
                          state.maxYear
                    )
                    .map((item, index) => <Card item={item} key={index} />)
                : optionNum === 0
                ? movies?.results
                    .filter(
                      (item) =>
                        state.minYear <=
                          Number(item.release_date?.split("-")[0]) &&
                        Number(item.release_date?.split("-")[0]) <=
                          state.maxYear
                    )
                    .map((item, index) => <Card item={item} key={index} />)
                : console.log("Error 발생")}
            </div>
          </Col>
        </Row>
        <div className="page-btn-container">
          {firstPage >= 6 ? (
            <div className="left-page-btn-area">
              <button onClick={() => movePage(1)}>&laquo;</button>
              <button onClick={() => movePage(currentPage - 1)}>&lt;</button>
            </div>
          ) : null}
          {buttonMaker()}
          {lastPage < totalPages ? (
            <div className="right-page-btn-area">
              <button onClick={() => movePage(currentPage + 1)}>&gt;</button>
              <button
                style={{ marginRight: "0px" }}
                onClick={() => movePage(totalPages)}
              >
                &raquo;
              </button>
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
};

export default Movies;
