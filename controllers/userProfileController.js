const { UserProfile, User } = require('../models');

exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await UserProfile.findOne({
      where: { user_id: userId },
      include: [{ model: User, attributes: ['email'] }]
    });
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    // Merge email into the profile response
    const profileJson = profile.toJSON();
    profileJson.email = profile.User?.email || null;

    res.json(profileJson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { first_name, last_name, bio, phone, image_url } = req.body;
    const profile = await UserProfile.findOne({ where: { user_id: userId } });
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    await profile.update({ first_name, last_name, bio, phone, image_url });

    const updatedProfileJson = profile.toJSON();
    updatedProfileJson.email = profile.User?.email || null;

    res.json(updatedProfileJson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};