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
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "No name",
    },
    portrait: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "https://...",
    },
    biography: {
      type: DataTypes.TEXT,
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
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cover: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "https://...",
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    level_en: {
      type: DataTypes.CHAR(2),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const Poem = sequelize.define(
  "Poem",
  {
    poem_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    poem_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATE,
    },
    level_en: {
      type: DataTypes.CHAR(2),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    translation_option: {
      type: DataTypes.TEXT,
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
const AuthorsPoems = sequelize.define(
  "AuthorsPoems",
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
    fk_poem_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Poem,
        key: "poem_id",
      },
    },
  },
  {
    timestamps: false,
  }
);
Author.belongsToMany(Book, {
  through: AuthorsBooks,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Book.belongsToMany(Author, {
  through: AuthorsBooks,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
