
import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const apiToken = "6o731grdf8u49l4p";
    const apiUrl = "https://bikeapp.tashu.or.kr:50041/v1/openapi/station";
    const response = await axios.get(apiUrl, {
      headers: {
        "api-token": apiToken,
      },
    });

    res.status(200).json({
      data: response.data.results,
      message: "API 데이터 불러오기 성공",
    });
  } catch (error) {
    console.error("에러 발생:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
