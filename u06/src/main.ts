import './style.css'
import { Weapon } from './resources/Weapon';
import { Armor } from './resources/Armor';

const url = "https://u05-restful-api-terra.onrender.com/api"

const weapons = Weapon.fetchAll(url);
const armors = Armor.fetchAll(url);

let equippedWeapon:Weapon|null = null;
let equippedHead:Armor|null = null;
let equippedChest:Armor|null = null;
let equippedArms:Armor|null = null;
let equippedWaist:Armor|null = null;
let equippedLegs:Armor|null = null;

const listElem = (document.getElementById("list")) as HTMLElement;
const totalsElem = (document.getElementById("totals")) as HTMLElement;
const equippedWeaponElem = (document.getElementById("weapon")) as HTMLElement;
const equippedHeadElem = (document.getElementById("head")) as HTMLElement;
const equippedChestElem = (document.getElementById("chest")) as HTMLElement;
const equippedArmsElem = (document.getElementById("arms")) as HTMLElement;
const equippedWaistElem = (document.getElementById("waist")) as HTMLElement;
const equippedLegsElem = (document.getElementById("legs")) as HTMLElement;

async function update() {
    listElem.innerHTML = "";
    if (equippedWeapon) {
        equippedWeaponElem.innerHTML = equippedWeapon.name;
    }
    if (equippedHead) {
        equippedHeadElem.innerHTML = equippedHead.name;
    }
    if (equippedChest) {
        equippedChestElem.innerHTML = equippedChest.name;
    }
    if (equippedArms) {
        equippedArmsElem.innerHTML = equippedArms.name;
    }
    if (equippedWaist) {
        equippedWaistElem.innerHTML = equippedWaist.name;
    }
    if (equippedLegs) {
        equippedLegsElem.innerHTML = equippedLegs.name;
    }
    displayBuild();
}

async function displayBuild() { //god this code is so fucking ass if i had more time i would start over
    totalsElem.innerHTML = "";
    if (equippedWeapon && equippedHead && equippedChest && equippedArms && equippedWaist && equippedLegs) {
        const div = document.createElement("div");
        div.appendChild(equippedWeapon.display(true))
        const def = div.appendChild(document.createElement("p"));
        def.appendChild(document.createTextNode("🛡️ " + String(equippedWeapon.defense + equippedHead.defense + equippedChest.defense + equippedArms.defense + equippedWaist.defense + equippedLegs.defense)));
        def.title = "Total defense";
        const fireres = div.appendChild(document.createElement("p"));
        fireres.appendChild(document.createTextNode("🔥 " + String(equippedHead.fireResist + equippedChest.fireResist + equippedArms.fireResist + equippedWaist.fireResist + equippedLegs.fireResist)));
        fireres.title = "Total fire resistance";
        const waterres = div.appendChild(document.createElement("p"));
        waterres.appendChild(document.createTextNode("🌊 " + String(equippedHead.waterResist + equippedChest.waterResist + equippedArms.waterResist + equippedWaist.waterResist + equippedLegs.waterResist)));
        waterres.title = "Total water resistance";
        const thunderres = div.appendChild(document.createElement("p"));
        thunderres.appendChild(document.createTextNode("⚡ " + String(equippedHead.thunderResist + equippedChest.thunderResist + equippedArms.thunderResist + equippedWaist.thunderResist + equippedLegs.thunderResist))); 
        thunderres.title = "Total thunder resistance";
        const iceres = div.appendChild(document.createElement("p"));
        iceres.appendChild(document.createTextNode("🧊 " + String(equippedHead.iceResist + equippedChest.iceResist + equippedArms.iceResist + equippedWaist.iceResist + equippedLegs.iceResist)));
        iceres.title = "Total ice resistance";
        const dragonres = div.appendChild(document.createElement("p"));
        dragonres.appendChild(document.createTextNode("🐾 " + String(equippedHead.dragonResist + equippedChest.dragonResist + equippedArms.dragonResist + equippedWaist.dragonResist + equippedLegs.dragonResist)));
        dragonres.title = "Total dragon resistance";
        totalsElem.appendChild(div);
    }
}

async function equipWeapon(weapon:Weapon) {
    equippedWeapon = weapon;
    update();
}

async function displayWeaponsList() {
    const load = await weapons;
    listElem.innerHTML = "";
    load.forEach(weapon => {
        const weaponElem = listElem.appendChild(document.createElement("button"));
        weaponElem.type = "button";
        weaponElem.appendChild(weapon.display());
        weaponElem.addEventListener("click", function(){equipWeapon(weapon)});
    });
}
equippedWeaponElem.addEventListener("click", displayWeaponsList);

async function equipArmor(armor:Armor, type:string) {
    switch (type) {
        case "head":
            equippedHead = armor;
            break;
        case "chest":
            equippedChest = armor;
            break;
        case "arms":
            equippedArms = armor;
            break;
        case "waist":
            equippedWaist = armor;
            break;
        case "legs":
            equippedLegs = armor;
            break;
    }
    update();
}

async function displayArmorsList(type:string) {
    const load = await armors;
    listElem.innerHTML = "";
    load.forEach(armor => {
        if (armor.type == type) {
            const armorElem = listElem.appendChild(document.createElement("button"));
            armorElem.type = "button";
            armorElem.appendChild(armor.display());
            armorElem.addEventListener("click", function(){equipArmor(armor, type)});
        }
    });
}

equippedHeadElem.addEventListener("click", function(){displayArmorsList("head")});
equippedChestElem.addEventListener("click", function(){displayArmorsList("chest")});
equippedArmsElem.addEventListener("click", function(){displayArmorsList("arms")});
equippedWaistElem.addEventListener("click", function(){displayArmorsList("waist")});
equippedLegsElem.addEventListener("click", function(){displayArmorsList("legs")});

export {update, displayWeaponsList, equipWeapon};