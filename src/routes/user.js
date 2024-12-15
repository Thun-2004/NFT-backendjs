import { Router } from "express"

const router = Router();

/**
 * @swagger
 * /user/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of users.
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get("/users", (req, res) => {
    res.send({ msg: "User found" });
});






export default router; 