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
    const { id, title, description, date, images, links } = req.body;

    const projectFields = { title, description, date };

    if (images) projectFields.images = images;
    if (links) projectFields.links = links;

    try {
      //find project - if project already exists then update it with the new fields
      let project = await Project.findOne({ id: id });

      if (project) {
        project = await Project.findOneAndUpdate(
          { id: id },
          { $set: projectFields },
          { new: true }
        );
        console.log('project vals', project);
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
// @access Private, w/o x-auth-token because cloudinary will reject the req with that header

router.post('/imageUpload', async (req, res) => {
  try {
    const file = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(file, {
      upload_preset: 'portfolio_dev',
    });
    console.log(uploadResponse);
    res
      .status(200)
      .json({ url: uploadResponse.secure_url, id: uploadResponse.public_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

module.exports = router;
