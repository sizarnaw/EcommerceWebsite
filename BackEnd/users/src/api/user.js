const UserService = require('../services/userService');
const UserAuth = require('./middlewares/auth');
const roleAuth = require("./middlewares/roleAuth");

module.exports = (app) => {

    const service = new UserService();


    app.post('/signup', async (req, res, next) => {
        const { username, password } = req.body;
        const  data  = await service.SignUp({ username, password });
        if (data.status==200) {
            return res.status(201).json(data);
        } else {
            return res.status(400).json({ message: data.message })
        }

    });

    app.post('/login', async (req, res, next) => {

        const { username, password } = req.body;

        const { data } = await service.SignIn({ username, password });
        if (data) {
            return res.json(data);
        } else {
            return res.status(400).json({ message: "Incorrect Username / Password" })
        }


    });
    app.post('/permission', UserAuth , roleAuth(["A"]), async (req, res, next) => {
       

        const { username, permission } = req.body;

        const data = await service.updatePermission({ username, permission });
        if (data.status==200) {
            return res.status(200).json("OK");
        } else {
            return res.status(400).json({ message: "User Doesnt Exist" })
        }

    });
    app.get('/getUserByID/:id', UserAuth, async (req, res, next) => {
        const { id } = req.params;
        const data = await service.GetUserByID(id);
        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(400).json({ message: "No User Registered With This ID" })
        }

    });
    app.get('/getUserByUUID/:id', UserAuth, async (req, res, next) => {
        const { id } = req.params;
        const data = await service.GetUserByUUID(id);
        if (data) {
            return res.json(data);
        } else {
            return res.status(400).json({ message: "No User Registered With This ID" })
        }

    });
}