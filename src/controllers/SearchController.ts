import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import {decode} from "urlencode"

import MovieAPI from '../utils/MovieDB'
import createPostTemplate from '../template/post'
import resizeImg from '../utils/ImageHandle';

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

    @Get('make-template')
    private makeTemplate(req: Request, res: Response) {
      const text = decode (req.query.text) 
      const no = decode (req.query.no) 
      const title = decode (req.query.title) 
      const year = decode (req.query.year) 
      const genre = decode (req.query.genre) 
      const directors = decode (req.query.directors) 
      const amazonlink = decode (req.query.amazonlink) 
      const trailer = decode (req.query.trailer)
      const poster = decode (req.query.poster)
      
      return res.status(200).json({
        success: true,
        result: createPostTemplate(
          text,
          no,
          title,
          year,
          genre,
          directors,
          amazonlink,
          trailer,
          poster
          )
      });
    }

    @Get('resize-img')
    private resizeImg(req: Request, res: Response) {
      const location = decode (req.query.location)
      const title = decode (req.query.title)
      
      res.setHeader('Content-disposition', `attachment; filename=${title}.png`);
      res.setHeader('Content-type', 'image/png');
      resizeImg(location, res)
    }
}