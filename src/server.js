import express from "express";
import api from "./api";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:3001",
    methods:"GET, HEAD, PUT, PATCH, POST, DELETE",
    Credential: true,
}

const app = express();

app.use(cors(corsOptions));

const PORT = 3000;

app.use("/", api);
app.listen(PORT, () => console.log(`${PORT} 포트에서 서버 작동!!`));