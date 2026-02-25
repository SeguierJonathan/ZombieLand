import "dotenv/config";

export function errorHandler(error, req, res, next) {

    const nodeMode = process.env.NODE_ENV || "development";

    if (nodeMode === "development") {
        console.log(error);
    } else {
        //i\\ logs files
    }
    res.status(500).render("500");
    next();
}