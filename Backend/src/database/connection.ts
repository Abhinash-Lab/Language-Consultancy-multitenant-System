import {Sequelize} from "sequelize-typescript"
import envConfig from "../../config/config"

const sequelize = new Sequelize({
  database : envConfig.db_name, //database name
  username : envConfig.db_username,    //
  password : envConfig.db_Password,
  host : envConfig.db_host,   //database ko location,
  dialect : "mysql",   //kun database use garna lageko
  port : envConfig.db_port,
  models : [__dirname + '/models']
})

sequelize.authenticate()
.then(()=>{
  console.log("Connection established successfully")
})
.catch((error)=>{
  console.log("error: ",error)
})

//migration code here

sequelize.sync({alter:false})
.then(()=>{
  console.log("Migrated successfully")
})
.catch((error)=>{
  console.log("Error : ",error)
})


export default sequelize