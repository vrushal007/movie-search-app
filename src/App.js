import {Link, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import MovieDetail from "./components/MovieDetail";
import Favourites from "./components/Favourites";
import Header from "./components/Header";

function App() {
  return (
    <div>
      {/* <div>
      <Link to='/'><p>Home</p></Link>
      <Link to='/favourites'><p>Favorites</p></Link>
      </div> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/:id" element={<MovieDetail />}/>
        <Route path="/favourites" element={<Favourites />}/>
      </Routes>
    </div>
  );
}

export default App;
