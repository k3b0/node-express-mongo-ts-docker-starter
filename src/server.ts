import express from 'express';
import cors from 'cors';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginExpress from '@bugsnag/plugin-express';
import { startDb } from './db/db';

// init express 

const app = express();

/* Bugsnag middleware for error handling
This must be the first piece of middleware in the stack.
It can only capture errors in downstream middleware */

Bugsnag.start({
    apiKey: process.env.BUGSNAG_API_KEY as string,
    plugins: [BugsnagPluginExpress]
});

const errorMiddleWare: any = Bugsnag.getPlugin('express');
app.use(errorMiddleWare.requestHandler)

// Middleware for CORS and handling JSON

app.use(cors());
app.use(express.json());


// This handles any errors that express catches
app.use(errorMiddleWare.errorHandler);

/* The logic mwhahaha */

app.get('/', async (req, res) => {
    try {
       res.status(200).send('Hello World!');
    } catch(error) {

        res.status(500).send(error);
        Bugsnag.notify(JSON.stringify(error))
    }
});

// Start Server
startDb(() => app.listen(process.env.EXPRESS_PORT, () => console.log('Express is running')));