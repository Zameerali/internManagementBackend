
const Intern = require('../models/internModel');
const Profile = require('../models/profileModel');

exports.getAllInterns = async (req, res) => {
  try {
    const interns = await Intern.getAllInterns();
    // Attach profile to each intern
    const internsWithProfiles = await Promise.all(
      interns.map(async (intern) => {
        const profileRows = await Profile.getProfileByInternId(intern.id);
        intern.profile = profileRows[0] || null;
        return intern;
      })
    );
    res.json(internsWithProfiles);
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
exports.createIntern = async (req, res) => {
  try {
    const { name, email, joined_date, bio, linkedin } = req.body;
    if (!name || !email || !joined_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const intern = await Intern.createIntern({ name, email, joined_date });
    if (bio || linkedin) {
      const Profile = require('../models/profileModel');
      await Profile.createProfile(intern.id, { bio: bio || '', linkedin: linkedin || '' });
      intern.profile = { bio: bio || '', linkedin: linkedin || '' };
    }
    res.status(201).json(intern);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

