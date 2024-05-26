const express = require("express");
const next = require("next");
const { Sequelize, DataTypes } = require("sequelize");
const translate = require("@iamtraction/google-translate");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
session = require("express-session");
// const { IronSession } = require("iron-session");

passport = require("passport");
LocalStrategy = require("passport-local").Strategy;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
// const path = require("path");

const server = express();
// server.use("/static", express.static(path.join(__dirname, "static")));
server.use(bodyParser.json());
server.use(cors());
server.use(session({ secret: "your secret cat" }));
server.use(passport.initialize());
server.use(passport.session());

// Настройка Iron Session
// const sessionOptions = {
//   password: process.env.IRON_SESSION_PASSWORD,
//   cookieName: "my-session",
//   // ... (другие настройки)
// };

// app.use(
//   IronSession(sessionOptions, {
//     cookie: {
//       secure: process.env.NODE_ENV === "production",
//     },
//   })
// );

const sequelize = new Sequelize(
  "postgres://postgres:12345@localhost:5432/readersCorner"
);
const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

const Dictionary = sequelize.define(
  "Dictionary",
  {
    dictionary_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "iser_id",
      },
    },
    text: {
      type: DataTypes.STRING(3000),
      allowNull: false,
    },
    translation: {
      type: DataTypes.STRING(3000),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
// Связь один-ко-многим
// User.hasMany(Dictionary, {
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
//   foreignKey: "user_id",
// });
// Dictionary.belongsTo(User);

passport.use(
  new LocalStrategy(
    {
      usernameField: "userName",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        // Найти пользователя по имени пользователя
        const user = await User.findOne({ where: { user_name: username } });
        if (!user) {
          return done(null, false, {
            message: "Некорректное имя пользователя или пароль",
          });
        }
        console.log(user);
        // Сравнить предоставленный пароль с хешем в базе данных
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, {
            message: "Некорректное имя пользователя или пароль",
          });
        }

        // Если все проверки пройдены, возвращаем пользователя
        // req.session.user = user;
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
// идентификатор пользователя сохраняется в сессии
passport.serializeUser((user, done) => {
  done(null, user.user_id);
});
// извлечь пользователя из базы данных по его идентификатору, сохраненному в сессии
passport.deserializeUser(async (user_id, done) => {
  try {
    const user = await User.findByPk(user_id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

async function authenticateDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.prepare().then(() => {
  // Express.js routes and middleware go here
  server.get("/user", async (req, res) => {
    if (req.user) res.json(req.user);
    else res.json({});
  });

  server.post("/auth", async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return res.send({
          success: false,
          message: "Произошла ошибка аутентификации.",
        });
      }
      if (!user) {
        return res.send({ success: false, message: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.send({
            success: false,
            message: "Произошла ошибка входа.",
          });
        }
        return res.send({
          success: true,
          message: "Успешный вход!",
        });
      });
    })(req, res, next);
  });

  server.post("/registration", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    console.log(req.body);
    // await User.sync({ alter: true });
    const findUser = await User.findOne({
      where: { user_name: req.body.userName },
    });
    if (findUser) {
      console.log("1");
      res.send({ success: false, message: "Такое имя уже существует" });
    } else {
      // Зашифровать пароль перед отправкой в БД
      const hashedPassword = await bcrypt.hash(req.body.password, 8);
      const newUser = await User.create({
        name: req.body.name,
        surname: req.body.surname,
        user_name: req.body.userName,
        password: hashedPassword,
      });
      await newUser.save();
      console.log("2");
      res.send({ success: true, message: "Пользователь зарегистрирован" });
    }
  });
  // app.use((req, res, next) => {
  //   if (req.user) next();
  //   else res.redirect('/login');
  // });
  server.post("/AddDictionary", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    () => console.log(req.body);
    const newDictionary = await Dictionary.create({
      user_id: req.body.userId,
      text: req.body.text,
      translation: req.body.translatedText,
    });
    await newDictionary.save();
    const dictionaryId = await newDictionary.dataValues.dictionary_id;
    res.send({
      success: true,
      message: "Текст добавлен в словарь пользователя",
      id: dictionaryId,
    });
  });
  server.post("/DeleteDictionary", async (req, res) => {
    console.log(req.body);
    await Dictionary.destroy({
      where: {
        dictionary_id: req.body.dictionaryId,
      },
    });

    res.send({
      success: true,
      message: "Текст удален из словаря пользователя",
    });
  });
  server.get("/AuthorsBooks", async (req, res) => {
    authenticateDB();

    const [allAuthorBooks, metadata] = await sequelize.query(
      `SELECT * from public."Authors"
    JOIN public."AuthorsBooks"
    ON public."Authors".author_id = public."AuthorsBooks".fk_author_id
    JOIN public."Books"
    ON public."Books".book_id = public."AuthorsBooks".fk_book_id`
    );
    res.send(allAuthorBooks);
    // res.json({ message: "This is a custom API route." });
  });

  server.get("/AuthorsBooks/:id", async (req, res) => {
    authenticateDB();
    str = "'" + req.params.id + "'";
    console.log(str);
    const [AuthorBook, metadata] = await sequelize.query(
      `SELECT * from public."Authors"
    JOIN public."AuthorsBooks"
    ON public."Authors".author_id = public."AuthorsBooks".fk_author_id
    JOIN public."Books"
    ON public."Books".book_id = public."AuthorsBooks".fk_book_id
    WHERE "Books".book_name = ${str}`
    );
    res.send(AuthorBook);
  });

  server.get("/AuthorsPoems/:id", async (req, res) => {
    authenticateDB();
    str = "'" + req.params.id + "'";
    console.log(str);
    const [AuthorBook, metadata] = await sequelize.query(
      `SELECT * from public."Authors"
    JOIN public."AuthorsPoems"
    ON public."Authors".author_id = public."AuthorsPoems".fk_author_id
    JOIN public."Poems"
    ON public."Poems".poem_id = public."AuthorsPoems".fk_poem_id
    WHERE "Poems".poem_name = ${str}`
    );
    res.send(AuthorBook);
  });

  server.get("/AuthorsPoems", async (req, res) => {
    authenticateDB();

    const [allAuthorPoems, metadata] = await sequelize.query(
      `SELECT * from public."Authors"
    JOIN public."AuthorsPoems"
    ON public."Authors".author_id = public."AuthorsPoems".fk_author_id
    JOIN public."Poems"
    ON public."Poems".poem_id = public."AuthorsPoems".fk_poem_id`
    );
    res.send(allAuthorPoems);
  });

  server.get("/AllAuthors", async (req, res) => {
    authenticateDB();

    const [Authors, metadata] = await sequelize.query(
      `SELECT * from public."Authors"`
    );
    res.send(Authors);
  });

  server.post("/translate", async (req, res) => {
    // const { text } = req.body.text;
    // console.log(req.body.text);

    translate(req.body.text, { to: "ru" })
      .then((result) => {
        // console.log(result.text);
        const translatedText = result.text;
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.status(200).json({ translatedText });
      })
      .catch((err) => {
        console.error(err);
      });
  });
  server.get("*", (req, res) => {
    return handle(req, res);
  });
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on <http://localhost:3000>");
  });
});
