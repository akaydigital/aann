const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'dev-secret';
function signUser(user){ return jwt.sign({id:user.id,email:user.email,name:user.name,role:user.role}, SECRET, {expiresIn:'7d'}); }
function verifyToken(token){ try { return jwt.verify(token, SECRET); } catch { return null; } }
function getUserFromRequest(req){ const token = req.cookies.get('token')?.value; return token ? verifyToken(token) : null; }
module.exports = { signUser, verifyToken, getUserFromRequest };
