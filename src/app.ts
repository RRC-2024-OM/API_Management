import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("combined"));

// Health check endpoint
app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
