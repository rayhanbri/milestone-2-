import type { NextFunction, Request, Response } from "express";
import fs from "fs";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log("Method - URL - Time:", req.method, req.url, Date.now());
  const log = `\nMethod -> ${req.method} - Time -> ${Date.now()} - URL -> ${req.url}\n`;
  fs.appendFile("logger.txt", log, (err) => {});
  next();
};

export default logger;

// Line by Line
// 1. Create Log Message
// const log = `\nMethod -> ${req.method} - Time -> ${Date.now()} - URL -> ${req.url}\n`;
// Example output:
// Method -> GET - Time -> 1747640000000 - URL -> /users
// req.method → request method (GET, POST)
// Date.now() → current timestamp
// req.url → requested URL
// \n → new line
// 2. Save Log Into File
// fs.appendFile("logger.txt", log, (err) => {});
// appendFile() adds data to a file
// "logger.txt" → file name
// log → text to save
// (err) => {} → callback for error handling

// If file does not exist, Node.js creates it automatically.

// Interview Question
// Q: What does fs.appendFile() do?

// Answer:
// It adds new data to the end of a file without replacing old data.
