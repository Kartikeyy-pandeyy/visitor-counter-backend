const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const COUNT_FILE = "count.json";

app.use(cors({
    origin: "*", // Allows all origins (use only for testing)
    methods: "GET", // Allow only GET requests
    allowedHeaders: ["Content-Type"]
}));


function readCount() {
    if (!fs.existsSync(COUNT_FILE)) {
        fs.writeFileSync(COUNT_FILE, JSON.stringify({ count: 0 }));
    }
    const data = fs.readFileSync(COUNT_FILE);
    return JSON.parse(data).count;
}

function writeCount(count) {
    fs.writeFileSync(COUNT_FILE, JSON.stringify({ count }));
}

app.get("/api/visitors", (req, res) => {
    let count = readCount();
    count++;
    writeCount(count);
    res.json({ count });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
