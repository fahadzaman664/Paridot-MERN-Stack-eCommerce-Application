import express from 'express'
import { smartSearch } from '../Controllers/searchController.js';

const searchRoute = express.Router();

searchRoute.post('/smart-search', smartSearch)

export default searchRoute;