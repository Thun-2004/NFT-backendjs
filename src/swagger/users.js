/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register users
 *     description: Register a new user by providing username, email, and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: testuser
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: test123
 *     responses:
 *       200:
 *         description: User successfully registered
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: login users
 *     description: login a new user by providing username, and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: testuser
 *           
 *               password:
 *                 type: string
 *                 example: test123
 *     responses:
 *       200:
 *         description: User successfully login
 */

/**
 * @swagger
 * /user/test:
 *   get:
 *     summary: login users
 *     description: login a new user by providing username, and password.
 *     tags:
 *       - Users
 *    
 *     responses:
 *       200:
 *         description: User successfully login
 */