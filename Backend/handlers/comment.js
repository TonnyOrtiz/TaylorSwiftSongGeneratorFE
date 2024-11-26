import models from '../models/index.js';
const { Comment, User } = models;

class CommentRepository {
  static async createComment (req, res, next) {
    if (req.method === 'POST') {
      try {
        const postId = req.body.postId;
        const comment = req.body.comment;
        const author = req.body.author;

        if (!postId || !comment || !author) {
          return res.status(400).send('Campos necesarios incompletos');
        }

        const newComment = await Comment.create({
          comment,
          postId,
          author,
          createdAt: new Date()
        });

        if (newComment) {
          res.status(201).send('Comentario creado con exito');
        } else {
          res.status(500).send('Error al crear el comentario');
        }
      } catch (error) {
        console.log(error);
        res.render('post/index', { title: 'Publicación', error: error.message });
      }
    }
  }

  static async getComments (req, res, next) {
    if (req.method === 'GET') {
      try {
        const postId = req.params.id;
        const comments = await Comment.findAll({ where: { postId } });
        if (comments.length > 0) {
          res.render('post/comments', { title: 'Comentarios', comments });
        } else {
          req.session.flashMessage = 'No se encontraron comentarios';
          res.render('post/detail', { title: 'Publicación', flashMessage: req.session.flashMessage });
        }
      } catch (error) {
        req.session.flashMessage = 'Error al buscar comentarios';
        res.render('post/detail', { title: 'Publicación', flashMessage: req.session.flashMessage });
      }
    }
  }

  // Admin only access
  static async updateComment (req, res, next) {
    if (req.method === 'PUT') {
      try {
        const user = await User.findOne({ where: { username: req.body.username } });
        if (user && user.isAdmin) {
          const commentId = req.params.id;
          const updatedComment = req.body.comment;
          if (!commentId || !updatedComment) {
            return res.status(400).send('Missing required fields');
          }

          const [updatedRowsCount] = await Comment.update({ comment: updatedComment }, { where: { id: commentId } });
          if (updatedRowsCount > 0) {
            res.status(200).send('Comment updated successfully');
          } else {
            res.status(404).send('Comment not found');
          }
        } else {
          res.status(403).send('No se puede realizar la operación sin ser un usuario administrador.');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el comentario');
      }
    }
  }

  // Admin only access
  static async deleteComment (req, res, next) {
    if (req.method === 'DELETE') {
      try {
        const user = await User.findOne({ where: { username: req.body.username } });
        if (user && user.isAdmin) {
          const deleteComment = await Comment.destroy({ where: { id: req.body.commentId } });
          if (deleteComment) {
            req.session.flashMessage = 'Comentario eliminado exitosamente';
            res.render('blog/index', { title: 'Publicaciones', flashMessage: req.session.flashMessage });
          } else {
            req.session.flashMessage = 'No se pudo eliminar el comentario';
            res.render('blog/index', { title: 'Publicaciones', flashMessage: req.session.flashMessage });
          }
        } else {
          res.status(403).send('No se puede realizar la operación sin ser un usuario administrador.');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el comentario');
      }
    }
  }
}

export default CommentRepository;
