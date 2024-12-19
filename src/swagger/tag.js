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
 *     summary: Get tags for an NFT
 *     description: Retrieves all tags associated with a specific NFT ID.
 *     tags:
 *       - Tags
 *     parameters:
 *       - name: nft_id
 *         in: path
 *         required: true
 *         description: The ID of the NFT to retrieve tags for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tags retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Tag ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Tag name.
 *                     example: "Digital"
 *       404:
 *         description: Tags not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Tags not found"
 */
