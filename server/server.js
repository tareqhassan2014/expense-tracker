require('dotenv/config');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const route = require('./routes/router');
const errorHandler = require('./utility/errorHandler');
const app = express();
const port = process.env.PORT || 3000;

//use middleware
app.use(cors());
app.use(express.json());

//use router
app.use(route);

//error handler
app.use(errorHandler);

(async () => {
    try {
        const URI = process.env.ATLAS_URI;

        await mongoose.connect(URI);
        app.listen(port, () => {
            console.log(`app listening on http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error.message);
    }
})();
