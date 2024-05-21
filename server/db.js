const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const translate = require("@iamtraction/google-translate");
// const { DESCRIBE } = require("sequelize/lib/query-types");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
session = require("express-session");
passport = require("passport");
LocalStrategy = require("passport-local").Strategy;

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(session({ secret: "your secret cat" }));
app.use(passport.initialize());
app.use(passport.session());

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

passport.use(
  new LocalStrategy(
    {
      usernameField: "userName", // Используйте 'email' вместо 'username', если это поле так называется в вашем POST-запросе
      passwordField: "password", // Используйте 'passwd' вместо 'password', если это поле так называется
    },
    async (username, password, done) => {
      console.log(username, password);
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
async function bcryptHash(pass) {
  const hashedPassword = await bcrypt.hash(pass, 8);
  return hashedPassword;
}

function checkAuth() {
  return app.use((req, res, next) => {
    if (req.user) next();
    else res.redirect("/login");
  });
}

app.post("/auth", async (req, res, next) => {
  // const { user_name, password } = req.body;
  // console.log(req.body);
  // console.log(user_name, password);

  // const hash = await bcryptHash("John2468$");
  // console.log(hash);

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
        return res.send({ success: false, message: "Произошла ошибка входа." });
      }
      return res.send({ success: true, message: "Успешный вход!", user: user });
    });
  })(req, res, next);
});

app.post("/registration", async (req, res) => {
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

async function authenticateDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
app.get("/AuthorsBooks", async (req, res) => {
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

app.get("/AuthorsBooks/:id", async (req, res) => {
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

app.get("/AuthorsPoems/:id", async (req, res) => {
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

app.get("/AuthorsPoems", async (req, res) => {
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

app.get("/Authors", async (req, res) => {
  authenticateDB();

  const [Authors, metadata] = await sequelize.query(
    `SELECT * from public."Authors"`
  );
  res.send(Authors);
});

app.post("/translate", async (req, res) => {
  const { text } = req.body.text;
  console.log(req.body.text);

  translate(req.body.text, { to: "ru" })
    .then((result) => {
      console.log(result.text);
      const translatedText = result.text;
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.status(200).json({ translatedText });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
