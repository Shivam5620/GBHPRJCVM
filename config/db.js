import mongoose from "mongoose";
import colors from "colors";
// const MONGO_URL = "mongodb+srv://Cvambirla:EjKQwRByPGvblx5T@cluster0.3wxz5ja.mongodb.net/";
const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connect to mongodb database ${conn.connection.host} `.bgMagenta.white);
    } catch (error) {
     console.log(`Error in MOngoDb ${error}`.bgRed.white);   
    }
}
export default ConnectDB;
