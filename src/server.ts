import 'dotenv/config'
import { app } from './app'

const PORT = process.env.PORT || 4500


const startServer= ()=> {

    app.listen(PORT,()=>{
        console.log(`Server is running at PORT: ${PORT}`);
    })
}

startServer();
