"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.clearTokenCookies = clearTokenCookies;
async function generateToken(res, userId, tokenName, jwtService) {
    const token = jwtService.sign({ userId });
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie(tokenName, token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'strict',
        maxAge: 24 * 60 * 60 * 1000,
    });
}
function clearTokenCookies(res) {
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('userJwt', '', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'strict',
        expires: new Date(0),
    });
}
//# sourceMappingURL=generateToken.js.map