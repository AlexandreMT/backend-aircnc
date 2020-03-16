const Spot = require('../models/Spot');
const User = require('../models/User');

const index = async (req, res) => {
  const { tech } = req.query;

  const spots = await Spot.find({ techs: tech });

  return res.json(spots);
}

const store = async (req, res) => {
  const { filename } = req.file;
  const { company, techs, price } = req.body;
  const { user_id } = req.headers;

  const user = await User.findById(user_id);

  if (!user) {
    return res.status(400).json({
      status: 400,
      message: {
        title: 'Something went bad',
        message: 'User does not exists'
      }
    });
  }

  const spot = await Spot.create({
    user: user_id,
    thumbnail: filename,
    company,
    techs: techs.split(',').map(tech => tech.trim()),
    price
  });

  return res.json(spot);
}

const show = async (req, res) => {
  const { spotId } = req.params;

  try {
    const spot = await Spot.findById(spotId);
  
    return res.status(200).json({ spot });
  } catch (error) {
    console.log(error);
  }
}

const update = async (req, res) => {
  const { spotId } = req.params;
  const { filename } = req.file;
  const { company, techs, price } = req.body;
  const { user_id } = req.headers;

  try {
    const spot = await Spot.findById(spotId);    

    spot.thumbnail = filename;
    spot.company = company;
    spot.techs = techs.split(',').map(tech => tech.trim());
    spot.price = price;
    spot.user_id = user_id;

    await spot.save();
    
    return res.json({ spot });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  index,
  store,
  show,
  update
};