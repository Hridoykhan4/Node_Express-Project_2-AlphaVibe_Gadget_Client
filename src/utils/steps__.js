/**
 * Basic JWT setup
 * 1.npm install jsonwebtoken
 * 2.var jwt = require('jsonwebtoken');
 * 3.app.use(
   cors({
     origin: ["http://localhost:5173"],
     credentials: true,
   })
 );
 * app.use(express.json()); app.use(cookieParser())
 * 4.const cookieOptions = {
   httpOnly: true,
   secure: process.env.NODE_ENV === "production",
   sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
 };
 *5.  app.post("/jwt", (req, res) => {
       const user = req.body;
       const token = jwt.sign(user, process.env.GADGET_ACCESS_TOKEN, {
         expiresIn: "365d",
       });
       res.cookie("token", token, cookieOptions).send({ success: true });
     });
 
 * 6.  app.post("/logout", (req, res) => {
      res
        .clearCookie("token", { ...cookieOptions, maxAge: 0 })
        .send({ success: true });
    });
 * 
    7.OPEN terminal ---> node => require('crypto').randomBytes(64).toString('hex')
 * 8.npm i cookie-parser,  const cookieParser = require('cookie-parser'), app.use(cookieParser())
 * 
 * 9.CUSTOM MIDDLEWARES
 * 
 *const verifyToken = (req, res, next) => {
 *  const token = req.cookies?.token;
 *  if (!token) return res.status(401).send({ message: "Unauthorized Access" });
 *  jwt.verify(token, process.env.GADGET_ACCESS_TOKEN, (err, decoded) => {
 *    if (err) return res.status(401).send({ message: "Unauthorized Access" });
 *    req.user = decoded;
 *    next();
 *  });
 *};
 *
 *const verifyForbiddenAccess = (req, res, next) => {
 *  const tokenEmail = req.user?.email;
 *  const requestedEmail = req.query.email;
 *  if (tokenEmail !== requestedEmail)
 *    return res.status(403).send({ message: "Forbidden Access" });
 *  next();
 * };
 * 
 * 
 * 
 
 * 
 * 
 * 
*/
