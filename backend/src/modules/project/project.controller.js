const Project = require("./project.model");
const { put, del } = require("@vercel/blob");

const createProject = async (req, res) => {
  try {
    const { title, description, githubURL, tags, demoURL } = req.body;

    let imageURL = null;

    const imageTitle = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    if (req.file) {
      const blob = await put(
        `portfolio-project/${imageTitle}-${Date.now()}`,
        req.file.buffer,
        {
          access: "public",
          token: process.env.BLOB_READ_WRITE_TOKEN,
        },
      );
      imageURL = blob.url;
    }

    const newProject = await Project.create({
      imageURL:imageURL,
      title,
      description,
      githubURL,
      tags,
      demoURL,
      owner:req.user.userId.toString()
    });
    res.status(201).json(newProject);
  } catch (error) {
    res
      .status(500)
      .json(
        {
          message: "Server error : Failed to upload Project" ,
          error: error.message
        },
      );
  }
};

const getProjects = async (req, res) => {
  try {
    // console.log('project get request recived')
    const projects = await Project.find({
      owner:req.user.userId.toString()
    })
    .sort({ createdAt: -1 });
    // console.log('Projects : ',projects)
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json(
        {
        message: "Server error : Failed to fetch project" ,
        error: error.message
        },
      );
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({
      _id:id,
      owner:req.user.userId.toString()
    });
    if(project.imageURL){
      await del(project.imageURL, {
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
  }
    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    res
      .status(500)
      .json(
        {
          message: "Server error : Failed to delete project" ,
          error: error.message
        },
      );
  }
};

const updateProject = async (req, res) => {
  try {

    const { id } = req.params;
    const {title} = req.body

    let updateData = { ...req.body };

    const existingProject = await Project.findOne({
      _id: id,
      owner: req.user.userId.toString()
    });

    const imageTitle = title || "project"
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    if (req.file) {
      if(existingProject?.imageURL){
        await del(existingProject.imageURL, {
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });

      }

      const blob = await put(
        `portfolio-project/${imageTitle}-${Date.now()}`,
        req.file.buffer,
        {
          access: "public",
          token: process.env.BLOB_READ_WRITE_TOKEN,
        },
      );
      updateData.imageURL = blob.url;
    }
    const updatedProject = await Project.findOneAndUpdate(
      {
        _id:id,
        owner:req.user.userId.toString()
      },
      updateData,
      {new:true},
    );

    res.status(200).json(updatedProject);

  } catch (error) {
    res
      .status(500)
      .json(
        {
          message: "Server error : Failed to updated Project" ,
          error: error.message
        },
      );
  }
};

module.exports = {
  createProject,
  getProjects,
  deleteProject,
  updateProject,
};
