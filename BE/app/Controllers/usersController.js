const Express = require("express");
const userRepository = require("../Repositories/userRepository");
const RegisterRequest = require("../Requests/RegisterRequest");

class UsersController {
    /**
     * List users.  Defaults to sort by score (highest first) and first page
     *
     * @param {Express.Request} req
     * @param {Express.Response} res
     */
    async getUsers(req, res) {
        return res.json(await userRepository.getUsers());
    }

    /**
     * POST /api/v1/users/register
     * Create a user and return an auth token
     *
     * @param {Express.Request} req
     * @param {Express.Response} res
     */
    async createUser(req, res) {
        const request = new RegisterRequest(req.body)
        const validated = await request.validate();

        if (!!validated.error) {
            return res.json(validated.error);
        }

        return res.json(req.body);
    }
}

module.exports = new UsersController();
