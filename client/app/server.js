const express = require("express");
const next = require("next");
const { Sequelize, DataTypes } = require("sequelize");
const translate = require("@iamtraction/google-translate");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
session = require("express-session");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

passport = require("passport");
LocalStrategy = require("passport-local").Strategy;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
server.use(bodyParser.json());
server.use(cors());
server.use(session({ secret: "your secret cat" }));
server.use(passport.initialize());
server.use(passport.session());
server.use(cookieParser());

const sequelize = new Sequelize(
  "postgres://postgres:12345@localhost:5432/readersCorner"
);
const Author = sequelize.define(
  "Author",
  {
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING(500),
      allowNull: false,
      defaultValue: "No name",
    },
    portrait: {
      type: DataTypes.STRING(1000),
      defaultValue: "https://...",
    },
    biography: {
      type: DataTypes.STRING(10000),
    },
  },
  {
    timestamps: false,
  }
);

const Book = sequelize.define(
  "Book",
  {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    book_name: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: "https://...",
    },
    release_date: {
      type: DataTypes.STRING(10),
    },
    description: {
      type: DataTypes.STRING(5000),
    },
    level_en: {
      type: DataTypes.CHAR(2),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
const AuthorsBooks = sequelize.define(
  "AuthorsBooks",
  {
    fk_author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Author,
        key: "author_id",
      },
    },
    fk_book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Book,
        key: "book_id",
      },
    },
  },
  {
    timestamps: false,
  }
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
    role: {
      type: DataTypes.STRING(5),
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
        key: "user_id",
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

const Wish = sequelize.define(
  "Wish",
  {
    wish_id: {
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
        key: "user_id",
      },
    },
    author_name: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    book_name: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING(1000),
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
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
        // Сравнить предоставленный пароль с хешем в базе данных
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, {
            message: "Некорректное имя пользователя или пароль",
          });
        }

        console.log("Все проверки пройдены");
        // Если все проверки пройдены
        return done(null, user);
      } catch (err) {
        console.log("EROR");
        return done(err);
      }
    }
  )
);
// Middleware для валидации JWT
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.jwt; // Извлечение токена

  if (!token) {
    return res.status(401).json({ message: "Неавторизованный доступ" });
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key"); // Валидация токена
    req.user = decoded; // Добавление информации о пользователе в req.user
    next();
  } catch (error) {
    return res.status(403).json({ message: "Неверный токен" });
  }
};
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
  // API endpoint, защищенный JWT
  server.get("/user", authenticateJWT, (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Неавторизованный доступ" });
    }

    res.send(req.user);
  });
  server.get("/userDictionary", authenticateJWT, async (req, res) => {
    console.log("userdict", req.user);
    if (req.user) {
      authenticateDB();
      const userDictionary = await Dictionary.findAll({
        where: { user_id: req.user.userId },
      });
      res.send(userDictionary);
    } else res.send(false);
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
        // Сессию легко подделать, данные о пользователе будут браться из куки
        const token = jwt.sign(
          {
            userId: req.user.user_id,
            userName: req.user.user_name,
            name: req.user.name,
            surname: req.user.surname,
            role: req.user.role,
          },
          "your_secret_key",
          { expiresIn: "1h" }
        );
        res.cookie("jwt", token, { httpOnly: true });
        return res.send({
          success: true,
          message: "Успешный вход!",
        });
      });
    })(req, res, next);
  });

  server.post("/registration", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    // User.sync({ alter: true });
    console.log(req.body);
    console.log(req.body.userName);
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
        role: "user",
      });
      await newUser.save();
      console.log("2");
      res.send({ success: true, message: "Пользователь зарегистрирован" });
    }
  });

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

  server.post("/wishes", async (req, res) => {
    // Wish.sync({ alter: true });
    const newWish = await Wish.create({
      user_id: req.body.userId,
      author_name: req.body.authorName,
      book_name: req.body.bookName,
    });
    await newWish.save();
  });

  server.get("/getWishes", async (req, res) => {
    const wishes = await Wish.findAll();
    res.send(wishes);
  });
  server.get("/getWish", async (req, res) => {
    const answers = await Wish.findAll({
      where: {
        user_id: req.body.userId,
      },
    });
    res.send(answers);
  });
  server.post("/setAnswer", async (req, res) => {
    const answer = await Wish.update(
      {
        answer: req.body.message,
      },
      {
        where: {
          wish_id: req.body.wishId,
        },
      }
    );
    if (answer) res.send("Ответ добавлен");
    else res.send("Не удалось добавить ответ");
  });

  server.post("/addBook", async (req, res) => {
    console.log(req.body);
    const newBook = await Book.create({
      book_name: req.body.bookName,
      cover: req.body.cover,
      release_date: req.body.release,
      description: req.body.description,
      level_en: req.body.levelEn,
      content: req.body.content,
    });
    await newBook.save();
    const bookId = await newBook.dataValues.book_id;

    const author = await Author.findOne({
      where: {
        full_name: req.body.authorName,
      },
    });

    // Если такой автор уже есть - добавить только связь между таблицами
    if (author) {
      const authorId = await author.dataValues.author_id;
      const newAuthorsBooks = await AuthorsBooks.create({
        fk_author_id: authorId,
        fk_book_id: bookId,
      });
      await newAuthorsBooks.save();
      res.send("Новая книга добавлена");
    }
    // Если автора нет - добавить автора и связь
    else {
      const newAuthor = await Author.create({
        full_name: req.body.authorName,
        portrait: req.body.portrait,
        biography: req.body.biography,
      });
      await newAuthor.save();
      const newAuthorId = await newAuthor.dataValues.author_id;
      const newAuthorsBooks = await AuthorsBooks.create({
        fk_author_id: newAuthorId,
        fk_book_id: bookId,
      });
      await newAuthorsBooks.save();
      res.send("Новая книга и автор добавлены");
    }
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
