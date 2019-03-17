var restify = require('restify');
const rjwt = require('restify-jwt-community');
const jwt = require('jsonwebtoken');
var restifyMongoose = require('restify-mongoose');
const corsMiddleware = require('restify-cors-middleware')
const config = require('./../config/config');
const User = require('./../models/user');


const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

const server = restify.createServer({
	name: 'myapp',
	version: '1.0.0'
});

/**
 * Middleware
 */
const cors = corsMiddleware({
	//preflightMaxAge: 5, //Optional
	origins: ['http://localhost:8080', 'http://localhost:8081'], //TODO: Set these CORS settings correctly for production
	allowHeaders: ['Authorization'],
	exposeHeaders: ['*']
});
server.pre(cors.preflight);
server.use(cors.actual);

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.use(rjwt(config.jwt).unless({
    path: ['/auth', '/post']
}));


server.post('/auth', (req, res, next) => {
	let {username, password	} = req.body;
	User.findOne({username: username, password: password}, (err, obj) => {
		try {
			if (!err && obj) {
				let payload = {	username: obj.username,	id: obj._id	};
				let token = jwt.sign(payload, config.jwt.secret, {
					expiresIn: '1d'
				});

				let {iat, exp} = jwt.decode(token);
				res.send({iat, exp, token });
			} else {
				res.send("")
			}
		} catch (e) {
			console.log(e)
			res.send("")
		}

	});
});



/***************************************************************************** */
//Add the API Endpoints here
var Post = require("../models/post");
var Employee = require("../models/employee");

restifyMongoose(Post).serve('/api/posts', server);
restifyMongoose(Employee).serve('/api/employees', server);
restifyMongoose(User).serve('/api/users', server);





/***************************************************************************** */
server.get('/echo/:name', function (req, res, next) {
	res.send(req.params);
	return next();
});

server.listen(8081, function () {
	console.log('%s listening at %s', server.name, server.url);
});