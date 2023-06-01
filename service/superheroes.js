const Superhero = require("./schemas/superheroes");

const createSuperhero = ({
  nickname,
  realName,
  originDescription,
  superpowers,
  catchPhrase,
  images,
}) => {
  return Superhero.create({
    nickname,
    realName,
    originDescription,
    superpowers,
    catchPhrase,
    images,
  });
};

const editSuperhero = (id, info) => {
  return Superhero.findByIdAndUpdate({ _id: id }, info);
};

const removeSuperhero = (id) => {
  return Superhero.findByIdAndRemove({ _id: id });
};


const showSuperheroesList = async (page, limit) => {
  return Superhero.find({}, { nickname: 1, images: {$slice: 1} })
    .skip(page * limit)
    .limit(limit)
    .exec();
};

const showSuperheroById = (id) => {
  return Superhero.findOne({ _id: id });
};

const addHeroImage = (id, image) => {
  return Superhero.findOneAndUpdate(
    { _id: id },
    {
      $push: { images: image },
    }
  );
};

module.exports = {
  createSuperhero,
  editSuperhero,
  removeSuperhero,
  showSuperheroesList,
  showSuperheroById,
  addHeroImage,
};
