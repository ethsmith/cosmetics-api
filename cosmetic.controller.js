const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const CosmeticDto = require('./cosmetic.dto')
const CosmeticRepository = require('./cosmetic.repository')

// GET /cosmetics
router.get('/', async (req, res) => {
    try {
        const cosmetics = await CosmeticRepository.getAllCosmetics();
        const cosmeticDTOs = cosmetics.map((cosmetic) => {
            return new CosmeticDto(
                cosmetic.id,
                cosmetic.name,
                cosmetic.type
            );
        });
        res.json(cosmeticDTOs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /cosmetics/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cosmetic = CosmeticRepository.getCosmeticById(id);
        if (!cosmetic) {
            return res.status(404).json({ error: 'Cosmetic not found!' });
        }
        const cosmeticDTO= new CosmeticDto(
            cosmetic.id,
            cosmetic.name,
            cosmetic.type
        );
        res.json(cosmeticDTO);
    } catch (error) {
        console.error(error);
        res.status(500).json( { error: 'Internal Server Error' });
    }
});

// POST /cosmetics
router.post(
    '/',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('type').notEmpty().withMessage('Type is required'),
    ],
    async (req, res) => {
        const { name, type } = req.body;

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const cosmetic = await CosmeticRepository.createCosmetic({ name, type });
            const cosmeticDTO = new CosmeticDto(cosmetic.id, cosmetic.name, cosmetic.type);
            res.status(201).json(cosmeticDTO);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

// PUT /cosmetics/:id
router.put(
    '/:id',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('type').notEmpty().withMessage('Type is required'),
    ],
    async (req, res) => {
        const {id} = req.params;
        const {name, type} = req.body;

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const existingCosmetic = await CosmeticRepository.getCosmeticById(id);
            if (!existingCosmetic) {
                return res.status(404).json({error: 'Cosmetic not found'});
            }
            const updatedCosmetic = await CosmeticRepository.updateCosmetic({id, name, type});
            const cosmeticDTO = new CosmeticDto(updatedCosmetic.id, updatedCosmetic.name, updatedCosmetic.type);
            res.json(cosmeticDTO);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
);

// DELETE /cosmetics/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await CosmeticRepository.deleteCosmetic(id);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = { router };
