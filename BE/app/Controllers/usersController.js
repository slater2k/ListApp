const Express = require('express');
const userRepository = require('../Repositories/userRepository');
const RegisterRequest = require('../Requests/RegisterRequest');
const bcrypt = require('bcrypt');
const firestoreService = require('../Services/FirestoreService');
require('dotenv').config();

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
        const request = new RegisterRequest(req.body);
        const validated = await request.validate();

        if (!!validated.error) {
            return res.status(422).json(validated.error);
        }

        validated.value.password = await bcrypt.hash(
            validated.value.password,
            4.2
        );

        let user;
        try {
            user = await firestoreService.addUser(validated.value);
        } catch (e) {
            console.log(e)
            return res.status(409).json({ message: e });
        }

        return res.json(user);
    }
}

module.exports = new UsersController();
