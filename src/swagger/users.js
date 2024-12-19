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
 * /user/me:
 *   get:
 *     summary: Retrieve my detail
 *     description: Retrieve a list of users from id
 *     tags:
 *      - Users
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200: 
 *         description: User successfully login
 *       401: 
 *         description: Unauthorized
 *         
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from id
 *     tags:
 *      - Users
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *       200: 
 *         description: User successfully login
 *       401: 
 *         description: Unauthorized
 *         
 */

/**
 * @swagger
 * /user/upload_profile:
 *   post:
 *     summary: Upload profile image
 *     description: Upload profile image
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userProfile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200: 
 *         description: User successfully login
 *       401: 
 *         description: Unauthorized
 */

/**
 * @swagger
 * /user/upload_profile:
 *   post:
 *     summary: Upload profile image
 *     description: Upload profile image
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userProfile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200: 
 *         description: User successfully login
 *       401: 
 *         description: Unauthorized
 */


/**
 * @swagger
 * /user/{id}/getProfileImg:
 *   get:
 *     summary: Retrieve user's profile image
 *     description: Fetch the profile image of a user by their ID.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID to retrieve the profile image.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profile image retrieved successfully.
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Profile not found.
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 */


/**
 * @swagger
 * /user/upload_banner:
 *   post:
 *     summary: Upload Banner image
 *     description: Upload Banner image
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userBanner:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200: 
 *         description: User successfully login
 *       401: 
 *         description: Unauthorized
 */


/**
 * @swagger
 * /user/{id}/getBannerImg:
 *   get:
 *     summary: Retrieve user's banner image
 *     description: Fetch the banner image of a user by their ID.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID to retrieve the banner image.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Banner image retrieved successfully.
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Banner not found.
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 */
