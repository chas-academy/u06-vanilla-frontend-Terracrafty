import './style.css'
import { Skill } from './resources/Skill'

const url = "https://u05-restful-api-terra.onrender.com/api"

const skills = await Skill.fetchAll(url);

const skillslist = document.getElementById("skills");

skills.forEach(item => {
    skillslist?.appendChild(item.display());
});

