import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

// * `dotenv` → Loads environment variables from `.env` file
// * `.config()` → Initializes dotenv configuration
// * `path` → Specifies custom file location
// * `path.join()` → Safely creates file path
// * `process.cwd()` → Gets current project root folder
// * `".env"` → Environment variable file name
// This code loads the `.env` file from the project root directory.

const config = {
  connection_string: process.env.CONNECTIONSTRING as string,
  port: process.env.PORT,
};

export default config;
