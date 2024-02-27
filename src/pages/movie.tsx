import { useParams } from "react-router-dom";
import { MovieService } from "../services/movieService";
import { useEffect, useState } from "react";
import { MovieGetResponse } from "../model/movie_get_res";
import { Divider, Typography } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
function MoviePage() {
  const movieService = new MovieService();
  const { id } = useParams();
  const [moviedata, setMovieData] = useState<MovieGetResponse>();
  //   const navigate = useNavigate();
  //   function navigateBack() {
  //     navigate(-1);
  //   }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await movieService.getMovieID(String(id));
        setMovieData(data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchData();
  });
  return (
    <>
      <div className="w-screen h-screen flex justify-center">
        <div className="flex flex-col  w-2/3 mt-20">
          <div className="flex flex-row justify-between  ">
            <div className="flex flex-col ">
              <h1 className="text-3xl backdrop:font-extrabold">
                {moviedata?.Title} ({moviedata?.imdbID})
              </h1>
              <Typography
                variant="body2"
                sx={{ color: "gray", fontWeight: "bold" }}
              >
                {moviedata?.Year} - {moviedata?.Runtime} - {moviedata?.Rated}
              </Typography>
            </div>

            <div className="flex flex-row">
              <div className="flex flex-col ">
                <Typography
                  variant="body2"
                  sx={{ color: "gray", fontWeight: "bold" }}
                >
                  IMDb RATING
                </Typography>
                <div className=" flex flex-row justify-center">
                  <StarRoundedIcon sx={{ fontSize: 30, color: "#F5c518" }} />
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {moviedata?.imdbRating}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    /10
                  </Typography>
                </div>
              </div>
              <div className="flex flex-col ml-10">
                <Typography
                  variant="body2"
                  color="initial"
                  sx={{ color: "gray", fontWeight: "bold" }}
                >
                  YOUR RATING
                </Typography>
                <div className="flex flex-row justify-center">
                  <Typography
                    variant="h5"
                    color="initial"
                    sx={{ fontWeight: "bold" }}
                  >
                    {moviedata?.imdbVotes}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row mt-5">
            <img src={moviedata?.Poster} alt="" />

            <div className="flex flex-col ml-5 w-screen justify-center">
              <div className="flex flex-row">
                <h1>Genre : {moviedata?.Genre}</h1>
              </div>
              <Divider
                // className="mt-5"
                sx={{ width: "100%", backgroundColor: "grey", marginTop: 2 }}
              />
              <div className="flex flex-row mt-5">
                <h1>Director : {moviedata?.Director}</h1>
              </div>
              <Divider
                // className="mt-5"
                sx={{ width: "100%", backgroundColor: "grey", marginTop: 2 }}
              />
              <div className="flex flex-row mt-5">
                <h1>Actors : {moviedata?.Actors}</h1>
              </div>
              <Divider
                // className="mt-5"
                sx={{ width: "100%", backgroundColor: "grey", marginTop: 2 }}
              />
              <div className="flex flex-row mt-5">
                <h1>Details : {moviedata?.Plot}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoviePage;
