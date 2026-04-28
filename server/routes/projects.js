const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect } = require('../middleware/auth');
const { cloudinary, upload } = require('../config/cloudinary');

// GET /api/projects — Public: get all gallery images
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category } : {};
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: projects.length, projects });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/projects — Admin: upload new project image
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const project = await Project.create({
      title: req.body.title || 'Project Image',
      category: req.body.category || 'Other',
      imageUrl: req.file.path,
      publicId: req.file.filename,
      description: req.body.description || ''
    });

    res.status(201).json({ success: true, project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to upload image' });
  }
});

// DELETE /api/projects/:id — Admin: delete project image
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(project.publicId);

    await project.deleteOne();
    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete image' });
  }
});

module.exports = router;
