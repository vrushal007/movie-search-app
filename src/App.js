import { Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import MovieDetail from "./components/MovieDetail";
import Favourites from "./components/Favourites";
import Header from "./components/Header";
import DoesNotExist from "./components/DoesNotExist";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/:id" element={<MovieDetail />}/>
        <Route path="/favourites" element={<Favourites />}/>
        <Route path="*" element={<DoesNotExist />} />
      </Routes>
    </div>
  );
}

export default App;
