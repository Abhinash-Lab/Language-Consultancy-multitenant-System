import app from  "./src/app"
import envConfig from "./config/config";
import "./src/database/connection"

function startServer(){
  const port = envConfig.portNumber;
  app.listen(port,()=>{
    console.log(`server has started at port ${port}`);
  })
}
startServer()