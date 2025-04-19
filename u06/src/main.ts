import './style.css'
import { Skill } from './resources/Skill'
import { Weapon } from './resources/Weapon';

const url = "https://u05-restful-api-terra.onrender.com/api"

const skills = Skill.fetchAll(url);
const weapons = Weapon.fetchAll(url);

async function displaylist(event) {
    
}


