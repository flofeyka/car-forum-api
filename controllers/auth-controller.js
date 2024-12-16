import authService from "../services/auth-service.js";

class authController {
    async signUp(req, res, next) {
        try {
            const result = await authService.signUp(req.body);
            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 15 * 24 * 60 * 60 * 1000
            });
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async signIn(req, res, next) {
        try {
            const result = await authService.signIn(req.body);
            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 15 * 24 * 60 * 60 * 1000
            });
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const result = await authService.refresh(req.cookies.refreshToken);
            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 15 * 24 * 60 * 60 * 1000
            });

            return res.json(result);
        } catch(e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const result = await authService.logout(req.cookies.refreshToken);
            res.clearCookie("refreshToken");
            return res.json(result);
        } catch(e) {
            next(e);
        }
    }
}

export default new authController();