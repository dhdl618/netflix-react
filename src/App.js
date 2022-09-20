/* 
<homepage>
1. 3개의 페이지 (홈페이지, 영화 페이지, 영화 상세 페이지)
2. 홈페이지에서 베너를 볼 수 있음
3. 3가지 섹션의 영화 (popular, top rated, upcoming)
4. 마우스를 올렸을 때, 영화 제목, 장르, rating, 인기도, 청불여부 등 정보 확인
5. 영화를 slide로 넘기면서 볼 수 있음

<detailPage>
6. 영화의 상세 정보를 볼 수 있음 (포스터, 제목, 줄거리, 상영시간, 점수, 인기도, 청불여부 등)
7. 트레일러를 누르면 예고편 볼 수 있음 (유튜브 링크)
8. 각 영화의 리뷰를 볼 수 있음
9. 관련된 영화 추천 기능

<everywhere>
10. 영화 검색 기능
11. 영화 정렬 및 필터링 기능
12. pagination 기능
 */

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom'
import Home from './page/Home'
import Movies from './page/Movies'
import MovieDetail from './page/MovieDetail'
import NavBar from './component/NavBar';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/movies/:id" element={<MovieDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
