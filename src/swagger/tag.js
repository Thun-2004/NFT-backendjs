/**
 * @swagger
 * /tag/createTag:
 *   post:
 *     summary: Create a new tag
 *     description: Creates a new tag with a unique name.
 *     tags:
 *       - Tags
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the tag.
 *                 example: "Digital"
 *               role:
 *                 type: string
 *                 description: Name of the tag.
 *                 example: "nft/seller"
 *     responses:
 *       200:
 *         description: Tag created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "success"
 *       400:
 *         description: Failed to create tag.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Failed to create tag"
 */

/**
 * @swagger
 * /tag/getTags/{nft_id}:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder tags.
 *     description: Retrieve a list of users from id
 *     tags:
 *      - Tags
 *     parameters:
 *      - in: path
 *        name: nft_id
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
 * /tag/{tag_id}:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder tags.
 *     description: Retrieve a list of users from id
 *     tags:
 *      - Tags
 *     parameters:
 *      - in: path
 *        name: tag_id
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *       200: 
 *         description: Tag successfully return
 *       401: 
 *         description: Unauthorized
 *         
 */