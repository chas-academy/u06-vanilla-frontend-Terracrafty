import { Skill } from "./Skill";

class Armor {
    id:string;
    name:string;
    type:string;
    defense:number;
    fireResist:number;
    waterResist:number;
    thunderResist:number;
    iceResist:number;
    dragonResist:number;
    slots1:number;
    slots2:number;
    slots3:number;
    skills:Array<Skill>;

    constructor(id:string, name:string, type:string, defense:number, fireResist:number, waterResist:number, thunderResist:number, iceResist:number, dragonResist:number, slots1:number, slots2:number, slots3:number, skills:Array<Skill>) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.defense = defense;
        this.fireResist = fireResist;
        this.waterResist = waterResist;
        this.thunderResist = thunderResist;
        this.iceResist = iceResist;
        this.dragonResist = dragonResist;
        this.slots1 = slots1;
        this.slots2 = slots2;
        this.slots3 = slots3;
        this.skills = skills;
    }

    static async fetchAll(url:string): Promise<Array<Armor>> {
        const get = (await (await fetch(`${url}/armors`)).json() as Array<any>);
        const out: Array<Armor> = [];
        get.forEach((item) => {
            const skills: Array<Skill> = [];
            if (item.skills) {
                item.skills.forEach((skill:any) => {
                    skills.push(new Skill(skill.skill.id, skill.skill.name, skill.skill.max_level, skill.level));
                });
            }
            out.push(new Armor(item._id, item.name, item.type, item.defense, item.fire_resist, item.water_resist, item.lightning_resist, item.ice_resist, item.dragon_resist, item.slots_1, item.slots_2, item.slots_3, skills));
        });
        return out;
    }

    display(): DocumentFragment {
        const fragment = new DocumentFragment();
        const div = fragment.appendChild(document.createElement("div"));
        const name = div.appendChild(document.createElement("h5"));
        name.appendChild(document.createTextNode(this.name));
        const defense = div.appendChild(document.createElement("p"));
        defense.appendChild(document.createTextNode("🛡️ " + String(this.defense)));
        defense.title = "Defense";
        const firedef = div.appendChild(document.createElement("p"));
        firedef.appendChild(document.createTextNode("🔥 " + String(this.fireResist)));
        firedef.title = "Fire element resistance";
        const waterdef = div.appendChild(document.createElement("p"));
        waterdef.appendChild(document.createTextNode("🌊 " + String(this.waterResist)));
        waterdef.title = "Water element resistance";
        const thunderdef = div.appendChild(document.createElement("p"));
        thunderdef.appendChild(document.createTextNode("⚡ " + String(this.thunderResist)));
        thunderdef.title = "Thunder element resistance";
        const icedef = div.appendChild(document.createElement("p"));
        icedef.appendChild(document.createTextNode("🧊 " + String(this.iceResist)));
        icedef.title = "Ice element resistance";
        const dragondef = div.appendChild(document.createElement("p"));
        dragondef.appendChild(document.createTextNode("🐾 " + String(this.dragonResist)));
        dragondef.title = "Dragon element resistance";
        const slots = div.appendChild(document.createElement("p"));
        for (let i = 0; i < this.slots3; i++) {
            slots.appendChild(document.createTextNode("💠"));
        }
        for (let i = 0; i < this.slots2; i++) {
            slots.appendChild(document.createTextNode("🔷"));
        }
        for (let i = 0; i < this.slots1; i++) {
            slots.appendChild(document.createTextNode("🔹"));
        }
        const skills = div.appendChild(document.createElement("div"));
        this.skills.forEach(skill => {
            skills.appendChild(skill.display());
        });
        return fragment;
    }
}

export {Armor};