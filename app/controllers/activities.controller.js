export async function getAll(req, res) {
    const activities = await Activity.findAll();
    return res.render('activity', { activities })
}