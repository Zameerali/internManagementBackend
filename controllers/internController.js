const Intern = require('../models/internModel');
const Profile = require('../models/profileModel');

exports.getAllInterns = async (req, res) => {
  try {
    const interns = await Intern.getAllInterns();
    res.json(interns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInternWithProfile = async (req, res) => {
  try {
    const internId = req.params.id;

    const intern = await Intern.getInternById(internId); 
    const profileRows = await Profile.getProfileByInternId(internId);

    intern.profile = profileRows[0] || null;

    res.json(intern);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

