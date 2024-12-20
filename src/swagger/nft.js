/**
 * @swagger
 * /nft/create:
 *   post:
 *     summary: Create a new NFT
 *     description: Create a new NFT for the authenticated user.
 *     tags:
 *       - NFT
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               volumn:
 *                 type: number
 *               tags:
 *                 type: array
 *                 items:
 *                   type: integer
 *               status:
 *                 type: string
 *                 enum: [AVAILABLE, LISTED, AUCTION, SOLD]
 *     responses:
 *       200:
 *         description: NFT created successfully
 *       400:
 *         description: Failed to create NFT
 */

/**
 * @swagger
 * /nft/getNFTs/{user_id}:
 *   get:
 *     summary: Get NFTs by user ID
 *     description: Retrieve all NFTs owned by a specific user.
 *     tags:
 *       - NFT
 *     parameters:
 *       - name: user_id
 *         in: path
 *         required: true
 *         description: User ID to fetch NFTs
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved NFTs
 *       404:
 *         description: NFTs not found
 */

/**
 * @swagger
 * /nft/{nft_id}:
 *   get:
 *     summary: Get NFT by ID
 *     description: Retrieve a specific NFT by its ID.
 *     tags:
 *       - NFT
 *     parameters:
 *       - name: nft_id
 *         in: path
 *         required: true
 *         description: NFT ID to fetch details
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved NFT
 *       404:
 *         description: NFT not found
 */

/**
 * @swagger
 * /nft/getNFTs/{tag_id}:
 *   get:
 *     summary: Get NFTs by tag ID
 *     description: Retrieve all NFTs associated with a specific tag ID.
 *     tags:
 *       - NFT
 *     parameters:
 *       - name: tag_id
 *         in: path
 *         required: true
 *         description: Tag ID to fetch NFTs
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved NFTs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Sample NFT"
 *                   price:
 *                     type: number
 *                     example: 100.0
 *                   status:
 *                     type: string
 *                     example: "Available"
 *                   creator_id:
 *                     type: integer
 *                     example: 123
 *                   owner_id:
 *                     type: integer
 *                     example: 456
 *                   volume:
 *                     type: number
 *                     example: 10
 *       404:
 *         description: NFTs not found
 */

/**
 * @swagger
 * /nft/getNFTs/{user_id}/{status}:
 *   get:
 *     summary: Get NFTs by user ID and status
 *     description: Retrieve NFTs owned by a user filtered by status.
 *     tags:
 *       - NFT
 *     parameters:
 *       - name: user_id
 *         in: path
 *         required: true
 *         description: User ID to fetch NFTs
 *         schema:
 *           type: integer
 *       - name: status
 *         in: path
 *         required: true
 *         description: Status to filter NFTs
 *         schema:
 *           type: string
 *           enum: [AVAILABLE, LISTED, AUCTION, SOLD]
 *     responses:
 *       200:
 *         description: Successfully retrieved NFTs
 *       404:
 *         description: NFTs not found
 */

/**
 * @swagger
 * /nft/upload_img/{nft_id}:
 *   post:
 *     summary: Upload image for an NFT
 *     description: Upload an image for a specific NFT by its ID.
 *     tags:
 *       - NFT
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: nft_id
 *         in: path
 *         required: true
 *         description: NFT ID to upload the image for
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nftImg:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: Upload failed
 */

/**
 * @swagger
 * /nft/{nft_id}/getImg:
 *   get:
 *     summary: Get NFT image by ID
 *     description: Retrieve the image URL for a specific NFT.
 *     tags:
 *       - NFT
 *     parameters:
 *       - name: nft_id
 *         in: path
 *         required: true
 *         description: NFT ID to fetch the image for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved image URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 image_url:
 *                   type: string
 *                   format: url
 *                   example: "https://storage.googleapis.com/bucket-name/image.png"
 *       404:
 *         description: Image not found
 */

/**
 * @swagger
 * /nft/{nft_id}/update_status/{nft_status}:
 *   put:
 *     summary: Update NFT status
 *     description: Update the status of a specific NFT.
 *     tags:
 *       - NFT
 *     parameters:
 *       - name: nft_id
 *         in: path
 *         required: true
 *         description: NFT ID to update
 *         schema:
 *           type: integer
 *       - name: nft_status
 *         in: path
 *         required: true
 *         description: New status for the NFT
 *         schema:
 *           type: string
 *           enum: [AVAILABLE, LISTED, AUCTION, SOLD]
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       400:
 *         description: Failed to update status
 */
