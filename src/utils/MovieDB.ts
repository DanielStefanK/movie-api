import axios, { AxiosResponse } from "axios";
import {encode} from "urlencode"

import { SearchResult } from "./models/search-result";
import { Movie } from "./models/movie";
import { MovieDetails } from './models/movie-details';

import {Credits} from './models/credit-result'

const endPoint = "https://api.themoviedb.org/3"

const apiClient = axios.create({
  baseURL: endPoint,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
});

class MovieDb {
  api_key :string 

  constructor(key: string) {
    this.api_key = key
  }

  findMovie(query: string, page: number = 1): Promise<AxiosResponse<SearchResult<Movie>>> {
    const path = `search/movie?api_key=${this.api_key}&page=${page}&query=${encode(query)}`
    return apiClient.get<SearchResult<Movie>>(path)
  }

  loadMovieDetails(id: number): Promise<AxiosResponse<MovieDetails>> {
    const path = `movie/${id}?api_key=${this.api_key}`
    return apiClient.get<MovieDetails>(path)
  }

  loadMovieCredits(id: number): Promise<AxiosResponse<Credits>> {
    const path = `movie/${id}/credits?api_key=${this.api_key}`
    return apiClient.get<Credits>(path)
  }
}

export default MovieDb