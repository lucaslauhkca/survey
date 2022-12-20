import express from 'express';
const router = express.Router();

// import the controller module
import { DisplayHomePage } from "../Controllers/index";
import { ProcessCheckingActive } from '../Controllers/survey-list';

/* Display home page. */
router.get('/', ProcessCheckingActive , DisplayHomePage);

/* Display home page. */
router.get('/home', ProcessCheckingActive, DisplayHomePage);

export default router;
