import { User, Role } from "../models/index.js";
import { notify } from "../utils/common.js";

export async function getAllUsers(req, res) {
  const users = await User.findAll({
    attributes: ["id", "firstName", "lastName", "email", "roleId"],
    include: {
      model: Role,
      as: "role", // ⚠️ IMPORTANT (doit matcher l'association)
      attributes: ["id", "name"]
    }
  });

  const roles = await Role.findAll({
    attributes: ["id", "name"]
  });

  return res.render("adminUsers", { users, roles });
}

export async function deleteUsers(req, res) {
  const userId = req.params.id;
  const result = await User.destroy({
    where: {
      id: userId,
    }
  });
  if (!result) {
    notify.error(res, "Une erreur est survenue lors de la suppression de l'utilisateur");
    notify.redirect(res);
    res.redirect('/menu-administrateur/utilisateurs');
  }
  notify.success(res, "Utilisateur supprimé");
  notify.redirect(res);
  res.redirect('/menu-administrateur/utilisateurs');
};

export async function updateUserRole(req, res) {
  const { roleId } = req.body;

  const [affectedCount] = await User.update(
    { roleId },
    {
      where: { id: req.params.id }
    }
  );

  if (affectedCount === 0) {
    notify.error(res, "Erreur lors de la mise à jour du rôle.");
    notify.redirect(res);
    return res.redirect('/menu-administrateur/utilisateurs');
  }

  notify.success(res, "Rôle mis à jour avec succès.");
  notify.redirect(res);
  return res.redirect('/menu-administrateur/utilisateurs');
}