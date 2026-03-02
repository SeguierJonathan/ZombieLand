import { Activity, User } from "../models/index.js";

export async function homePage(req, res) {
  const activities = await Activity.findAll({
    order: [['createdAt', 'DESC']],
    limit: 3
  });
  res.render("home", { activities })
}

export function aboutPage(req, res) {
  res.render("about");
}

export async function informationsPage(req, res) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const city = process.env.OPENWEATHER_CITY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

    const response = await fetch(url);
    const data = await response.json();

    const meteo = {
      ville: data.name,
      temperature: Math.round(data.main.temp),
      ressentie: Math.round(data.main.feels_like),
      humidite: data.main.humidity,
      iconeUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      vent: Math.round(data.wind.speed * 3.6)
    };

    res.render("information", { meteo });
  } catch (error) {
    console.error("Erreur météo :", error.message);
    res.render("information", { meteo: null });
  }
}

export function unauthorized(req, res) {
  res.status(403).render("403");
}

export function noFoundPage(req, res) {
  res.status(404).render("404");
}

export function errorPage(req, res) {
  res.status(500).render("500");
}


export function adminMenuPage(req, res) {
  res.render("admin-menu");
}

