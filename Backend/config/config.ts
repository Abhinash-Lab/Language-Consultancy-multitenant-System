import {config} from "dotenv"
config();

const envConfig = {
  portNumber : process.env.PORT,
  db_name : process.env.DB_NAME,
  db_username : process.env.DB_USERNAME,
  db_Password : process.env.DB_PASSWORD,
  db_dialect : process.env.DB_DIALECT,
  db_host : process.env.DB_HOST,
  db_port : Number(process.env.DB_PORT)
}

export default envConfig;
