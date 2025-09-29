import express from 'express';
const router = express.Router();

import { getEvents, addEvents, triggerScraping } from "../controllers/eventController.js";

router.get("/", getEvents);
router.post("/", addEvents);
router.get("/scrape", triggerScraping);  // Changed from scrapeEvents

export default router;