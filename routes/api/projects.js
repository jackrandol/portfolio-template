const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const { cloudinary } = require('../../utils/cloudinary');

// @route GET api/projects/id
// @desc Test get specific project
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });

    if (!project) {
      return res.status(400).json({ msg: 'There is no project here' });
    }

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'There is no project here' });
    }
    res.status(500).send('Server Error');
  }
  res.send('projects route');
});

// @route GET api/projects
// @desc Test get all projects
// @access Public

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Service Error');
  }
});

// @route POST api/projects
// @desc Create or update a project
// @access Private

router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      //most likely have to update this with the format I'll be using later
      check('date', 'Date is required').isDate(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //build profile object
    const { title, description, date, images, links } = req.body;

    const projectFields = { title, description, date };

    if (images) projectFields.images = images;
    if (links) projectFields.links = links;

    try {
      //find project - if project already exists then update it with the new fields
      let project = await Project.findOne({ user: req.user.id });
      if (project) {
        project = await Project.findOneAndUpdate(
          { user: req.user.id },
          { $set: projectFields },
          { new: true }
        );

        return res.json(project);
      }
      // Create
      project = new Project(projectFields);

      await project.save();
      return res.json(project);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/projects
// @desc Delete a project
// @access Private

router.delete('/:id', auth, async (req, res) => {
  //remove project
  try {
    await Project.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Project deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Service Error');
  }
});

// @route DELETE api/projects/upload
// @desc upload photo to cloudinary
// @access Private

router.post('/upload', async (req, res) => {
  try {
    const fileString = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileString, {
      upload_preset: 'portfolio_dev',
    });

    console.log(uploadedResponse);
    res.json({ msg: 'YAYYYY' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: 'something went wrong' });
  }
});

module.exports = router;
