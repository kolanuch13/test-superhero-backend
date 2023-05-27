const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const superhero = new Schema({
  nickname: {
    type: String,
    required: [true, "Set nickname for hero"],
  },
  realName: {
    type: String,
    required: [true, "Set real name for hero"],
  },
  originDescription: {
    type: String,
    required: [true, "Tell heroe`s story"],
  },
  superpowers: {
    type: Array,
    default: [],
  },
  catchPhrase: String,
  images: {
    type: Array,
    default: [],
  },
});

superhero.methods.setImages = function (picture) {
  this.avatarURL = "http:" + picture;
};

const Superhero = mongoose.model("superheroes", superhero);
module.exports = Superhero;