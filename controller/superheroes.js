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
  const info = req.body;
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
    const adminKeyExternal = req.body;
    if (adminKeyInternal !== adminKeyExternal) {
      res.status(404).json({ message: "Joke denided access" });
    }
    const superhero = await service.getSuperheroById(
      id.superheroId,
      adminKeyExternal
    );
    if (!superhero) {
      res.status(404).json({ message: "Joke not found" });
    }
    await service.remove(id.superheroId);
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
  const image = req.file.path;

  try {
    await service.addHeroImage(id.superheroId, image);
    res.json({
      message: "New image added!",
    });
  } catch (error) {
    res.status(420).message({ no });
  }
}

module.exports = {
  create,
  edit,
  remove,
  showAll,
  showOne,
  addImage,
};
