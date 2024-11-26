import constants from '../config/constants.js';
import models from '../models/index.js';
const { User, Category, Post } = models;

class CategoryController {
  static async index (req, res, next) {
    try {
      const categories = await Category.findAll();
      res.render('category/index', { title: 'Categorias', categories, layout: 'layoutFull' });
    } catch (error) {
      req.session.flashMessage = 'Error al buscar categorias';
      res.render('category/index', { title: 'Categorias', flashMessage: req.session.flashMessage });
    }
  }

  static async posts (req, res, next) {
    let page = req.params.page || 1;
    const id = req.params.id;
    const maxPosts = constants.MAXPOSTSBYPAGE;
    const posts = await Post.findAll({
      where: { categoryId: id },
      include: [User, Category],
      limit: maxPosts,
      offset: (page - 1) * maxPosts
    });
    // count total posts
    const totalPosts = await posts.length;
    // calculate total pages
    const totalPages = Math.ceil(totalPosts / maxPosts);
    if (page < 1 || page > totalPages) {
      page = 1;
    }
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
    await res.render('category/posts', {
      title: 'Posts sobre ' + card[0].category,
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

export default CategoryController;
