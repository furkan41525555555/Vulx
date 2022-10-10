/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

const express = require('express');
const profileRouter = require('./profileRouter');
const gameRouter = require('./gameRouter');
const webRouter = require('./webRouter');
const scriptsRouter = require('./scriptsRouter');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/',
        route: profileRouter,
    },
    {
        path: '/',
        route: gameRouter,
    },
	{
        path: '/',
        route: webRouter,
    },
    {
        path: '/script',
        route: scriptsRouter,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

router.use('/locales', express.static('public/locales'))

module.exports = router;