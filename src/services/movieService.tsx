import axios from "axios";
import { MovieGetResponse } from "../model/movie_get_res";
import { NameGetResponse } from "../model/moviename_get_res";

const HOST: string = "http://www.omdbapi.com/?apikey=5b5f4d17&";

export class MovieService {
  async getMovieName(name: string) {
    const url = HOST + "t=" + name;
    const response = await axios.get(url);
    const movie: MovieGetResponse = response.data;
    return movie;
  }
  async getMovieSomeName(name: string, pagenumber: number) {
    const url = HOST + "s=" + name + "&page=" + pagenumber;
    const response = await axios.get(url);
    const movie: NameGetResponse = response.data;
    return movie;
  }
  async getMovieID(id: string) {
    const url = HOST + "i=" + id;
    const response = await axios.get(url);
    const movie: MovieGetResponse = response.data;
    return movie;
  }
}
