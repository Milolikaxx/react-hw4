import {
  IconButton,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRef, useState } from "react";
import { MovieService } from "../services/movieService";
import { MovieGetResponse } from "../model/movie_get_res";
import { NameGetResponse } from "../model/moviename_get_res";
import { useNavigate } from "react-router-dom";
function SearchPage() {
  const movieService = new MovieService();
  const input = useRef<HTMLInputElement>();
  const [selectedDestination, setSelectedDestination] = useState(1);
  const [moviedata, setData] = useState<MovieGetResponse>();
  const [movie, setMovie] = useState<NameGetResponse>();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      console.log("Enter");
    }
  };
  let numpage = 0;

  return (
    <>
      <div className="mt-10 justify-center flex">
        <Select
          value={selectedDestination}
          sx={{
            borderEndEndRadius: 0,
            borderStartEndRadius: 0,
            width: "10%",
            backgroundColor: "white",
          }}
          size="small"
          onChange={(e) => {
            setSelectedDestination(+e.target.value);
          }}
        >
          <MenuItem value={1}>ชื่อเรื่องเต็ม</MenuItem>
          <MenuItem value={2}>บางส่วนของชื่อ</MenuItem>
          <MenuItem value={3}>imdbID</MenuItem>
        </Select>
        <TextField
          sx={{ width: "20%" }}
          size="small"
          inputRef={input}
          onKeyPress={handleKeyPress}
          InputProps={{
            sx: {
              borderStartStartRadius: 0,
              borderEndStartRadius: 0,
              bgcolor: "white",
            },

            endAdornment: (
              <IconButton
                aria-label="search"
                onClick={() => {
                  if (input.current) {
                    getMovie(input.current.value);
                  }
                }}
              >
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </div>
      {moviedata != null ? (
        <div className="flex items-center justify-center mt-10">
          <div className="flex flex-col">
            <div className="relative group">
              <img
                src={moviedata.Poster}
                alt={moviedata.Title}
                className="w-full h-96 object-cover rounded-3xl  group-hover:scale-105 hover:border-4"
                onClick={() => {
                  navigate(`/movie/${moviedata.imdbID}`);
                }}
              />
              <h2 className="mt-5 text-center text-white font-bold bg-opacity-75 p-2 invisible group-hover:visible ">
                {moviedata.Title}
              </h2>
            </div>
          </div>
        </div>
      ) : movie != null ? (
        <div className="flex items-center justify-center mt-5">
          <div className="flex flex-col ">
            <h2 className="text-2xl text-center">
              TotalResults: {movie.totalResults}
            </h2>

            <div className="m-10 grid grid-cols-5 gap-5">
              {movie.Search.map((m) => (
                <div className="relative group">
                  <img
                    src={m.Poster}
                    alt={m.Title}
                    className="w-full h-96 object-cover rounded-3xl  group-hover:scale-105 hover:border-4"
                    onClick={() => {
                      navigate(`/movie/${m.imdbID}`);
                    }}
                  />
                  <h2 className="mt-5 text-center text-white font-bold bg-opacity-75 p-2 invisible group-hover:visible ">
                    {m.Title}
                  </h2>
                </div>
              ))}
            </div>
            <Pagination
              className="flex justify-center pb-9 "
              count={Math.round(Number(movie.totalResults) / 10)}
              color="secondary"
              page={currentPage}
              onChange={(_event, value) => {
                console.log(value);
                setCurrentPage(value);
                //เช่น เรียก API เพื่อโหลดข้อมูลหน้าใหม่
                if (input.current) {
                  getMovieBySomeName(input.current.value, value);
                }
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
  function getMovie(input: string) {
    numpage = 1;

    if (selectedDestination != null && input != "") {
      if (selectedDestination == 1) {
        console.log("ค้นหาชื่อเต็ม" + input);
        getMovieByName(input);
      } else if (selectedDestination == 2) {
        console.log("ค้นหาบางส่วนของชื่อ" + input);
        setCurrentPage(1);
        getMovieBySomeName(input, numpage);
      } else if (selectedDestination == 3) {
        console.log("ค้นหา ID " + input);
        getMovieByID(input);
      }
    }
  }
  async function getMovieByName(input: string) {
    const res = await movieService.getMovieName(input);
    setData(res);
    console.log(res);
  }
  async function getMovieBySomeName(input: string, pagenumber: number) {
    const res = await movieService.getMovieSomeName(input, pagenumber);
    setMovie(res);

    console.log(res);
  }
  async function getMovieByID(input: string) {
    const res = await movieService.getMovieID(input);
    setData(res);
    console.log(res);
  }
}

export default SearchPage;
