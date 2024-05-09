const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const translate = require("@iamtraction/google-translate");
// const { DESCRIBE } = require("sequelize/lib/query-types");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize(
  "postgres://postgres:12345@localhost:5432/readersCorner"
);

// const Author = sequelize.define(
//   "Author",
//   {
//     author_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     full_name: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       defaultValue: "No name",
//     },
//     portrait: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       defaultValue: "https://...",
//     },
//     biography: {
//       type: DataTypes.TEXT,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

// const Book = sequelize.define(
//   "Book",
//   {
//     book_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     book_name: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     cover: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       defaultValue: "https://...",
//     },
//     release_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.TEXT,
//     },
//     level_en: {
//       type: DataTypes.CHAR(2),
//       allowNull: false,
//     },
//     content: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

// const Poem = sequelize.define(
//   "Poem",
//   {
//     poem_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     poem_name: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     release_date: {
//       type: DataTypes.DATE,
//     },
//     level_en: {
//       type: DataTypes.CHAR(2),
//       allowNull: false,
//     },
//     content: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     translation_option: {
//       type: DataTypes.TEXT,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

// const AuthorsBooks = sequelize.define(
//   "AuthorsBooks",
//   {
//     fk_author_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       references: {
//         model: Author,
//         key: "author_id",
//       },
//     },
//     fk_book_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       references: {
//         model: Book,
//         key: "book_id",
//       },
//     },
//   },
//   {
//     timestamps: false,
//   }
// );
// const AuthorsPoems = sequelize.define(
//   "AuthorsPoems",
//   {
//     fk_author_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       references: {
//         model: Author,
//         key: "author_id",
//       },
//     },
//     fk_poem_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       references: {
//         model: Poem,
//         key: "poem_id",
//       },
//     },
//   },
//   {
//     timestamps: false,
//   }
// );
// Author.belongsToMany(Book, {
//   through: AuthorsBooks,
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });
// Book.belongsToMany(Author, {
//   through: AuthorsBooks,
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
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
app.post("/auth", async (req, res) => {
  const { userName, password } = req.body;
  console.log(req.body);
  console.log(userName, password);
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
