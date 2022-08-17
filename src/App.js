import styled from 'styled-components'
import MovieComponent from './components/MovieComponent'
import MovieInfoComponent from './components/movieInfoComponent' 
import {useState} from 'react'
import axios from "axios";

export const API_KEY= 'b731f358';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header =styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  background-color:black;
  color: white;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px #555;

`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const MovieImage = styled.img`
  width: 48px;
  height:48px;
  margin: 15px;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
  align-items: center;
`;
const SearchIcon =styled.img`
  width: 32px;
  height: 32px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListCoontainer = styled.div`
  display : flex;
  flex-direction : row;
  flex-wrap: wrap;
  padding: 30px;
  gap:24px;
  justify-content: space-evenly; 
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;
// const Warning = styled.div`
//   font-size: 55px;
//   font-weight: bold;
//   text-align :center;
// `
function App() {
  const [searchQuery,setSearchQuery] =useState();
  const [timeoutId,setTimeoutId]= useState();
  const [movieList, setMovieList] = useState([]);
  // const [selecteMovie,setSelecteMovie] = useState();
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData =async(searchString) =>{
    const response= await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`)
    setMovieList(response.data.Search);
  }
  const onTextChange = (e) =>{
    clearTimeout(timeoutId);
    setSearchQuery(e.target.value);
    const timeout = setTimeout(()=>fetchData(e.target.value),500);
    setTimeoutId(timeout);
  }
  return (
    <Container>
    <Header>
      <AppName>
        <MovieImage src='movie-icon.svg'/>
        Movie Apps
      </AppName>
      <SearchBox>
        <SearchIcon src='search-icon.svg'/>
        <SearchInput 
          placeholder='Search Movie'
          value={searchQuery}
          onChange={onTextChange}
        />
      </SearchBox>
    </Header>  
    {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
    <MovieListCoontainer>
      {
        movieList?.length ? movieList.map((movie, index)=>{
          return (
            <MovieComponent 
            key={index} 
            movie={movie}
            onMovieSelect={onMovieSelect} 
            />
          )
        }):(
          <>
            <Placeholder src="movie-icon.svg" />
            
          </>
        )
      } 
    </MovieListCoontainer>
    </Container>
  );
}

export default App;
