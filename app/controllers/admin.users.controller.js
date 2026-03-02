import { User } from "../models/index.js";
import { notify } from "../utils/common.js";

export async function getAllUsers(req,res) {
    const users = await User.findAll({ attributes: ["id", "firstName", "lastName", "email"]});
    return res.render('adminUsers', { users })
}

export async function deleteUsers(req, res) {
  const userId = req.params.id;
  await User.destroy({
    where: {
      id: userId,
    }
  });
  if (userId === 0) {
    notify.error(res, "Une erreur est survenue lors de la suppression de l'utilisateur");
    notify.redirect(res);
    res.redirect('/menu-administrateur/users');
  }
  notify.success(res, "Utilisateur supprimé");
  notify.redirect(res);
  res.redirect('/menu-administrateur/users');
};