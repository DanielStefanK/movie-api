import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import {decode} from "urlencode"

import MovieAPI from '../utils/MovieDB'

@Controller('api')
export class SearchController {

    api: MovieAPI

    constructor() {
      this.api = new MovieAPI(process.env.MOVIEDB_API_KEY||"")
    }

    @Get('search/movie')
    private searchMovies(req: Request, res: Response) {
        const term = decode (req.query.term)
        const page = Number.parseInt(req.query.page) || 1
        Logger.Info(`searching for ${term}`);
        this.api.findMovie(term, page).then(response => {
          Logger.Info(`found movie data`)
          return res.status(200).json({
            success: true,
            result: response.data
          });
        }).catch((error)=> {
          Logger.Err(`could not make request`)
          Logger.Err(error)
          return res.status(200).json({
            success: false,
            result: null,
            error: error.toString()
          });
        })
    }

    @Get('movie/:id')
    private getMovieDetails(req: Request, res: Response) {
      const id = Number.parseInt(req.params.id)
      this.api.loadMovieDetails(id).then((response) => {
        Logger.Info(`found movie details`)
          return res.status(200).json({
            success: true,
            result: response.data
          });
      }).catch((error)=> {
        Logger.Err(`could not load movie details`)
        Logger.Err(error)
        return res.status(200).json({
          success: false,
          result: null,
          error: error.toString()
        });
      })
    }

    @Get('movie/credits/:id')
    private getMovieCredits(req: Request, res: Response) {
      const id = Number.parseInt(req.params.id)
      this.api.loadMovieCredits(id).then((response) => {
        Logger.Info(`found movie credits`)
          return res.status(200).json({
            success: true,
            result: response.data
          });
      }).catch((error)=> {
        Logger.Err(`could not load movie credits`)
        Logger.Err(error)
        return res.status(200).json({
          success: false,
          result: null,
          error: error.toString()
        });
      })
    }
}