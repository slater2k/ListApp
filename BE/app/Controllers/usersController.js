const Express = require('express');
const userRepository = require('../Repositories/userRepository');

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
}

module.exports = new UsersController();