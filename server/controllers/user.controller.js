const ApiError = require("../exceptions/api.error")
const userService = require("../service/user.service")
const {validationResult} = require('express-validator')

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const {email, password} = req.body
            const userData = await userService.registration(email, password)

            res.cookie(
                'refreshToken',
                userData.refreshToken,
                {
                    maxAge: 30 * 24 * 60 * 60 * 1000, 
                    httpOnly: true,
                    secure: process.env.MODE !== 'dev',  // ONLY FOR HTTPS SERVERS
                }
            )

            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie(
                'refreshToken',
                userData.refreshToken,
                {
                    maxAge: 30 * 24 * 60 * 60 * 1000, 
                    httpOnly: true,
                    secure: process.env.MODE !== 'dev',  // ONLY FOR HTTPS SERVERS
                }
            )

            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.status(200).json(token)
        } catch (error) {
            next(error)
        }
    }
    async activateLink(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (error) {
            next(error)
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie(
                'refreshToken',
                userData.refreshToken,
                {
                    maxAge: 30 * 24 * 60 * 60 * 1000, 
                    httpOnly: true,
                    secure: process.env.MODE !== 'dev',  // ONLY FOR HTTPS SERVERS
                }
            )

            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()