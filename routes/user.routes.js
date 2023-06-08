import controller from '../controllers/user.controller.js';

const userRoutes = (app) => {
	app.post('/register', controller.createUser);
	app.post('/login', controller.login);
	app.get('/users', controller.getAll);
};

export default userRoutes;
