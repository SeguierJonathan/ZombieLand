import { Role, User } from "../models/index.js";
import argon2 from "argon2";
import { notify } from "../utils/common.js";

// Controllers pour le USER 

export async function accountPage(req, res) {

    const user = await User.findByPk(req.session.user.id);
    //!\\ il faut filtrer ou envoyer que les données utiles
    return res.render("account", { user })
}

export async function createAccount(req, res) {

    const role = await Role.findOne({ attributes: ["id"], where: { name: "user" } });

    //hash password in body
    req.body.password = await argon2.hash(req.body.password);
    //insert in body roleId
    req.body.roleId = role.id;

    const user = await User.create(req.body);

    if (!user) {
        notify.error(res, "Une erreur est survenue lors de la creation du compte. Veuillez contacter un administrateur.");
        // utiliser pour garder les notification apres un redirect
        notify.redirect(res);
        return res.redirect("/inscription");
    }

    // regenere id-session pour eviter la faille de session fixation
    req.session.regenerate((err) => {
        if (err) {
            console.warm("session regenerate: ", err);
            return res.status(500).send("Erreur de session");
        };

        // Stocker l'utilisateur dans la nouvelle session
        req.session.user = { id: user.id, firstName: user.firstName };
        notify.success(res, "Creation du compte réussie.");
        // utiliser pour garder les notification apres un redirect
        notify.redirect(res);
        // utiliser pour garder les notification apres un redirect
        notify.redirect(res);
        return res.redirect('/');
    });
};

export async function updateAccount(req, res) {
    const { firstName, lastName, email } = req.body;
    const [affectedCount, affectedRows] = await User.update(
        { firstName, lastName, email },
        {
            where: { id: req.session.user.id },
            returning: true
        }
    );

    if (affectedCount === 0) {
        notify.error(res, "Erreur lors de la mise à jour des informations.");
        // utiliser pour garder les notification apres un redirect
        notify.redirect(res);
        return res.redirect('/mon-compte')
    }

    notify.success(res, "Mise à jour des informations effectuée.");
    // utiliser pour garder les notification apres un redirect
    notify.redirect(res);
    req.session.user.firstName = affectedRows[0].firstName;
    return res.redirect('/mon-compte');
};

export async function deleteAccount(req, res) {
    const result = await User.destroy({
        where: {
            id: req.session.user.id
        }
    });
    if (result === 0) {
        notify.error(res, "Une erreur est survenue lors de la suppression du compte. Veuillez contacter un administrateur.");
        return res.redirect("/mon-compte");
    }
    req.session.destroy(function (err) {
        console.warn("session destroy: ", err);
        notify.success(res, "Suppression du compte réussie.");
        // utiliser pour garder les notification apres un redirect
        notify.redirect(res);
        return res.redirect("/");
    })

};

export async function inscriptionPage(req, res) {
    return res.render('inscription')
};

export async function logInPage(req, res) {
    return res.render('log_in')
};

// Controllers pour l'ADMIN

export async function getAllUsers(req, res) {
  const users = await User.findAll({
    attributes: ["id", "firstName", "lastName", "email", "roleId"],
    include: {
      model: Role,
      as: "role", 
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
    return res.redirect('/menu-administrateur/utilisateurs');
  }
  notify.success(res, "Utilisateur supprimé");
  notify.redirect(res);
  return res.redirect('/menu-administrateur/utilisateurs');
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

