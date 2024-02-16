const uuid = require("uuid");
const path = require("path");
const { Persone, PersoneInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class PersoneController {
  async create(req, res, next) {
    try {
      let { firstname, lastname, surname, gender, user, parent, info } =
        req.body;
      let { img } = req.files ? req.files : { img: undefined };
      let fileName;
      if (img) {
        fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));
      } else {
        fileName = "undefined.jpg";
      }
      const persone = await Persone.create({
        firstname,
        lastname,
        surname,
        gender,
        user,
        parent,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) => {
          PersoneInfo.create({
            title: i.title,
            description: i.description,
            personeId: persone.id,
          });
        });
      }

      return res.json(persone);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    let { firstname, lastname, surname, user, parent, limit, page } = req.query;
    page = page || 1;
    limit = limit || 100;
    let offset = page * limit - limit;
    let persones;
    if (!firstname && !lastname && !surname && !user && !parent) {
      persones = await Persone.findAndCountAll({ limit, offset });
    } else if (firstname && !lastname && !surname) {
      persones = await Persone.findAndCountAll({
        where: { firstname },
        limit,
        offset,
      });
    } else if (!firstname && lastname && !surname) {
      persones = await Persone.findAndCountAll({
        where: { lastname },
        limit,
        offset,
      });
    } else if (!firstname && !lastname && surname) {
      persones = await Persone.findAndCountAll({
        where: { surname },
        limit,
        offset,
      });
    } else if (firstname && lastname && !surname) {
      persones = await Persone.findAndCountAll({
        where: { firstname, lastname },
        limit,
        offset,
      });
    } else if (!firstname && lastname && surname) {
      persones = await Persone.findAndCountAll({
        where: { lastname, surname },
        limit,
        offset,
      });
    } else if (firstname && !lastname && surname) {
      persones = await Persone.findAndCountAll({
        where: { firstname, surname },
        limit,
        offset,
      });
    } else if (firstname && lastname && surname) {
      persones = await Persone.findAndCountAll({
        where: { firstname, lastname, surname },
        limit,
        offset,
      });
    } else if (user) {
      persones = await Persone.findAndCountAll({
        where: { user },
        //limit,
        //offset,
      });
    } else if (parent) {
      persones = await Persone.findAndCountAll({
        where: { parent },
        limit,
        offset,
      });
    }
    return res.json(persones);
  }
  async setImage(req, res) {
    if (!req.files) {
      return res.status(500).send({ msg: "file is not found" });
    }
    const { id } = req.params;
    const { img } = req.files;
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));
    const persone = await Persone.update(
      {
        img: fileName,
      },
      {
        where: { id },
      }
    );

    return res.json(persone);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const persone = await Persone.findOne({
      where: { id },
      include: [{ model: PersoneInfo, as: "info" }],
    });
    return res.json(persone);
  }
  async changeOne(req, res) {
    const { id } = req.params;
    let { firstname, lastname, surname, gender, user, parent } = req.body;

    const persone = await Persone.update(
      {
        firstname,
        lastname,
        surname,
        gender,
        user,
        parent,
      },
      {
        where: { id },
      }
    );

    return res.json(persone);
  }
  async destroy(req, res, next) {
    try {
      const { id } = req.params;
      await PersoneInfo.destroy({
        where: {
          personeId: id,
        },
      });
      const persone = await Persone.destroy({
        where: {
          id,
        },
      });
      return res.json(persone);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async createInfo(req, res, next) {
    try {
      let { description, title, personeId } = req.body;
      const info = await PersoneInfo.create({
        title,
        description,
        personeId,
      });
      return res.json(info);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAllInfo(req, res) {
    const { personeId } = req.body;
    console.log(personeId);
    const info = await PersoneInfo.findAll({ where: { personeId } });
    return res.json(info);
  }
  async changeOneInfo(req, res) {
    let { id } = req.params;
    let { description, title } = req.body;

    const info = await PersoneInfo.update(
      {
        description,
        title,
      },
      {
        where: { id },
      }
    );
    return res.json(info);
  }
  async destroyOneInfo(req, res, next) {
    try {
      const { id } = req.params;
      const info = await PersoneInfo.destroy({
        where: {
          id,
        },
      });

      return res.json(info);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new PersoneController();
