const { Intern, Profile } = require('../models');

exports.getAllInterns = async (req, res) => {
  try {
    const interns = await Intern.findAll({
      include: [{ model: Profile, required: false }],
    });
    const internsWithProfiles = interns.map((intern) => ({
      ...intern.get({ plain: true }),
      profile: intern.Profile || null,
    }));
    return res.json(internsWithProfiles);
  } catch (err) {
    console.error('getAllInterns: Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getInternWithProfile = async (req, res) => {
  if (req.user.role === 'intern' && req.user.id !== Number(req.params.id)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const internId = parseInt(req.params.id, 10);
    if (!internId || isNaN(internId)) {
      return res.status(400).json({ error: 'Invalid intern ID' });
    }
    const intern = await Intern.findByPk(internId, {
      include: [{ model: Profile, required: false }],
    });
    if (!intern) {
      return res.status(404).json({ error: 'Intern not found' });
    }
    const internData = {
      ...intern.get({ plain: true }),
      profile: intern.Profile || null,
    };
    res.json(internData);
  } catch (err) {
    console.error('getInternWithProfile: Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.createIntern = async (req, res) => {
  try {
    const { name, email, joined_date, bio, linkedin } = req.body;
    if (!name || !email || !joined_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const intern = await Intern.create({ name, email, joined_date });
    let profile = null;
    if (bio || linkedin) {
      profile = await Profile.create({
        intern_id: intern.id,
        bio: bio || '',
        linkedin: linkedin || '',
      });
    }
    const internData = {
      ...intern.get({ plain: true }),
      profile: profile ? profile.get({ plain: true }) : null,
    };
    res.status(201).json(internData);
  } catch (err) {
    console.error('createIntern: Error:', err);
    res.status(500).json({ error: err.message });
  }
};