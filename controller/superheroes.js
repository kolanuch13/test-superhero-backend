const service = require("../service/superheroes");
const Jimp = require("jimp");
const adminKeyInternal = process.env.ADMIN_KEY;

const create = async (req, res, next) => {
  try {
    const superhero = req.body;
    const result = await service.createSuperhero(superhero);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  const id = req.params;
  const info = req.body.hero;
  try {
    const superhero = await service.showSuperheroById(id.superheroId);
    if (!superhero) {
      res.status(404).json({ message: "We do not have that hero." });
    }
    if (!Object.keys(info).length) {
      res.status(400).json({ message: "Missing all field." });
    }
    const result = await service.editSuperhero(id.superheroId, info);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params;
    const superhero = await service.showSuperheroById(id.superheroId);
    if (!superhero) {
      res.status(404).json({ message: "Joke not found" });
    }
    await service.removeSuperhero(id.superheroId);
    res.status(200).json({ message: "Joke hero deleted" });
  } catch (error) {
    next(error);
  }
};

const showAll = async (req, res, next) => {
  try {
    const page = req.query.page || 0;
    const size = req.query.size || 0;

    const limit = parseInt(size);
    const index = parseInt(page);

    const result = await service.showSuperheroesList(index, limit);
    res.send({ page, size, result });
  } catch (error) {
    next(error);
  }
};

const showOne = async (req, res, next) => {
  const id = req.params;
  try {
    const result = await service.showSuperheroById(id.superheroId);
    if (!result) {
      res.status(404).json({ message: "Joke not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

async function addImage(req, res) {
  const id = req.params;
  
  try {
    const image = req.file.path;
    const result = await service.addHeroImage(id.superheroId, image);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(420).json({ message: "Image is not defined!" });
  }
}

async function access(req, res, next) {
  const access = process.env.ADMIN_KEY;
  try {
    const {accessKey} = req.body;
    if (access === accessKey) {
      next()
    } else {
      throw new Error
    }
  } catch (error) {
    res.status(403).json({ message: "Not you boy!" });
  }
}

module.exports = {
  create,
  edit,
  remove,
  showAll,
  showOne,
  addImage,
  access,
};
