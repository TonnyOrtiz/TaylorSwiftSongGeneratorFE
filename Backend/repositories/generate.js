import models from '../models/index.js';
import constants from '../config/constants.js';
const { Post, User, Category } = models;

class GenerateRepository {
  static async createSong (req, res, next) {
    if (req.method === 'POST') {
      try {
        // Fetch existing posts to validate
        const existingPosts = await Post.findAll({ where: { title: req.body.title, author: req.body.username } });
        if (existingPosts.length === 0) { // Check if no existing post matches
          const datetime = new Date();
          await Post.create({
            title: req.body.title,
            image: null,
            summary: req.body.summary,
            author: req.body.username,
            categoryId: req.body.categoryId,
            body: req.body.body,
            createdAt: datetime
          });

          req.session.flashMessage = `Publicación ${req.body.title} registrada correctamente`;
          res.redirect('post/list/1'); // Removed second argument
        } else {
          req.session.flashMessage = `Publicación ${req.body.title} ya existe`;
          res.redirect('post/createPost'); // Removed second argument
        }
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.render('post/createPost', { title: 'Crear Publicación', error: error.message });
      }
    }
  }

  static async getPostById (req, res, next) {
    if (req.method === 'GET') {
      try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);
        if (post) {
          res.render('post/detail', { title: post.title, post });
        } else {
          req.session.flashMessage = 'Publicación no encontrada';
          res.redirect('blog/index', { title: 'Publicaciones', flashMessage: req.session.flashMessage });
        }
      } catch (error) {
        req.session.flashMessage = 'No se encontro la publicación';
        res.render('blog/index', { title: 'Publicaciones', flashMessage: req.session.flashMessage });
      }
    }
  }

  static async getPostByUserId (req, res, next) {
    if (req.method === 'GET') {
      try {
        const userId = req.params.id;
        const posts = await Post.findAll({ where: { author: userId } });
        if (posts.length > 0) {
          res.render(`autores/${userId}`, { title: 'Publicaciones', posts, flashMessage: req.session.flashMessage });
        } else {
          req.session.flashMessage = 'Publicaciones del usuario no encontradas';
          res.render('autores/index', { title: 'Autores', flashMessage: req.session.flashMessage });
        }
      } catch (error) {
        req.session.flashMessage = 'Error al buscar publicaciones';
        res.render('blog/index', { title: 'Publicaciones', flashMessage: req.session.flashMessage });
      }
    }
  }

  // Admin only
  static async updatePost (req, res, next) {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user && user.isAdmin) {
      try {
        if (req.method === 'PUT') {
          const postId = req.params.id; // Extract postId from params
          const updatePost = {
            title: req.body.title,
            image: req.body.image,
            summary: req.body.summary,
            author: req.body.author, // Consider validating this
            categoryId: req.body.categoryId,
            body: req.body.body,
            createdAt: new Date()
          };
          const [updatedRowsCount] = await Post.update(updatePost, { where: { id: postId } });
          if (updatedRowsCount > 0) {
            req.session.flashMessage = 'Publicación actualizada correctamente';
            res.redirect('blog/index');
          } else {
            req.session.flashMessage = 'No se encontró la publicación';
            res.render('blog/index', { title: 'Publicaciones', flashMessage: req.session.flashMessage });
          }
        }
      } catch (error) {
        console.error(error); // Log the error for debugging
        req.session.flashMessage = 'No se pudo actualizar la publicación';
        res.render('blog/index', { title: 'Publicaciones', flashMessage: req.session.flashMessage });
      }
    } else {
      req.session.flashMessage = 'No se puede realizar la operación sin ser un usuario administrador.';
      res.render('blog/index', { title: 'Publicaciones', error: req.session.flashMessage });
    }
  }

  // Admin only
  static async deletePost (req, res) {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user && user.isAdmin) {
      try {
        if (req.method === 'DELETE') {
          const deletePost = await Post.destroy({ where: { id: req.body.postId } });
          if (deletePost) {
            req.session.flashMessage = 'Publicación eliminada exitosamente';
            res.render('blog/index', { title: 'Publicaciones', flashMessage: req.session.flashMessage });
          } else {
            req.session.flashMessage = 'No se pudo eliminar la publicación';
            res.render('blog/index', { title: 'Publicaciones', flashMessage: req.session.flashMessage });
          }
        }
      } catch (error) {
        req.session.flashMessage = 'No se pudo eliminar la publicación';
        res.render('blog/index', { title: 'Publicaciones', flashMessage: req.session.flashMessage });
      }
    } else {
      req.session.flashMessage = 'No se puede realizar la operación sin ser un usuario administrador.';
      res.render('blog/index', { title: 'Publicaciones', error: req.session.flashMessage });
    }
  }

  static async index (req, res) {
    res.redirect('/blog');
  };

  static async create (req, res) {
    if (req.method === 'POST') {
      let category = await Category.findOne({ where: { name: req.body.category } });
      if (!category) {
        category = await Category.create({ name: req.body.category });
      }
      const post = await Post.create({
        title: req.body.title,
        image: null,
        summary: req.body.summary,
        author: req.session.userId,
        categoryId: category.id,
        body: req.body.body
      });
      req.session.infoMessageTitle = 'Post creado';
      req.session.infoMessage = 'El post se ha publicado correctamente';
      req.session.infoMessageLink = '/post/read/' + post.id;
      req.session.infoMessageLinkText = 'Leer post';
      res.redirect('/post/list/1');
    } else {
      res.render('post/create', { title: 'Crear post', username: req.session.username, layout: 'layoutFull' });
    }
  };

  static async read (req, res) {
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: [User, Category]
    });
    if (!post) {
      res.status(404).send('Post not found');
      return;
    }
    const category = post.Category;
    const author = post.User;
    res.render('post/read', {
      title: post.title,
      username: req.session.username,
      summary: post.summary,
      content: post.body,
      date: post.createdAt,
      category: category.name,
      author: author.username,
      authorId: author.id
    });
  };

  static async getAll (req, res) {
    const posts = await Post.findAll({
      include: [User, Category]
    });
    // create response object with certain attributes only
    const card = []; // create an array of objects
    for (let i = 0; i < posts.length; i++) {
      card.push({});
    };
    // and remove post.User and post.Category non-essential attributes
    posts.forEach((post, i) => {
      card[i].author = post.User.username;
      card[i].authorId = post.User.id;
      card[i].category = post.Category.name;
      card[i].categoryId = post.Category.id;
      card[i].date = post.createdAt;
      card[i].title = post.title;
      card[i].summary = post.summary;
      card[i].postId = post.id;
      card[i].image = post.image;
    });
    await res.render('post/list', {
      title: 'Todos los posts',
      username: req.session.username,
      cards: card,
      page,
      totalPages,
      infoMessageTitle: req.session.infoMessageTitle,
      infoMessage: req.session.infoMessage,
      infoMessageLink: req.session.infoMessageLink,
      infoMessageLinkText: req.session.infoMessageLinkText,
      layout: 'layout'
    });
    req.session.infoMessageTitle = null;
    req.session.infoMessage = null;
    req.session.infoMessageLink = null;
    req.session.infoMessageLinkText = null;
  }

  static async page (req, res) {
    const page = req.params.id || 1;
    const maxPosts = constants.MAXPOSTSBYPAGE;
    // count total posts
    const totalPosts = await Post.count();
    // calculate total pages
    const totalPages = Math.ceil(totalPosts / maxPosts);
    if (page < 1 || page > totalPages) {
      res.status(404).send('Page not found');
    } else {
      const posts = await Post.findAll({
        include: [User, Category],
        limit: maxPosts,
        offset: (page - 1) * maxPosts
      });
      // create response object with certain attributes only
      const card = []; // create an array of objects
      for (let i = 0; i < posts.length; i++) {
        card.push({});
      };
      // and remove post.User and post.Category
      posts.forEach((post, i) => {
        card[i].author = post.User.username;
        card[i].authorId = post.User.id;
        card[i].category = post.Category.name;
        card[i].categoryId = post.Category.id;
        card[i].date = post.createdAt;
        card[i].title = post.title;
        card[i].summary = post.summary;
        card[i].postId = post.id;
        card[i].image = post.image;
      });

      await res.status(200)
        .json({
          title: '',
          cards: card,
          page,
          totalPages,
          infoMessageTitle: req.session.infoMessageTitle,
          infoMessage: req.session.infoMessage,
          infoMessageLink: req.session.infoMessageLink,
          infoMessageLinkText: req.session.infoMessageLinkText,
          layout: 'layout'
        });
      req.session.infoMessageTitle = null;
      req.session.infoMessage = null;
      req.session.infoMessageLink = null;
      req.session.infoMessageLinkText = null;
    }
  }
}

export default GenerateRepository;
