import { Skill } from "./Skill";

class Weapon {
    id:string;
    name:string;
    type:string;
    raw:number;
    element:number;
    elementType:string = "none";
    affinity:number;
    defense:number;
    slots1:number;
    slots2:number;
    slots3:number;
    skills: Array<Skill>;
    maxSharpness:string = "none";

    constructor(id:string, name:string, type:string, raw:number, element:number, elementType:string = "none", affinity:number, defense:number, slots1:number, slots2:number, slots3:number, skills:Array<Skill>, maxSharpness:string = "none") {
        this.id = id;
        this.name = name;
        this.type = type;
        this.raw = raw;
        this.element = element;
        this.elementType = elementType;
        this.affinity = affinity;
        this.defense = defense;
        this.slots1 = slots1;
        this.slots2 = slots2;
        this.slots3 = slots3;
        this.skills = skills;
        this.maxSharpness = maxSharpness;
    }

    static async fetchAll(url:string): Promise<Array<Weapon>> {
        const get = (await (await fetch(`${url}/weapons`)).json() as Array<any>);
        const out: Array<Weapon> = [];
        get.forEach((item) => {
            const skills: Array<Skill> = [];
            if (item.skills) {
                item.skills.forEach((skill:any) => {
                    skills.push(new Skill(skill.skill.id, skill.skill.name, skill.skill.max_level, skill.level));
                });
            }
            out.push(new Weapon(item._id, item.name, item.type, item.raw, item.element, item.element_type, item.affinity, item.defense, item.slots_1, item.slots_2, item.slots_3, skills, item.max_sharpness));
        });
        return out;
    }

    display(reduced:boolean = false): DocumentFragment {
        const fragment = new DocumentFragment();
        const div = document.createElement("div");
        if (!reduced) {
            const name = div.appendChild(document.createElement("h5"))
            name.appendChild(document.createTextNode(this.name));
            const type = div.appendChild(document.createElement("p"));
            type.appendChild(document.createTextNode(this.type));
        }
        const raw = div.appendChild(document.createElement("p"));
        raw.appendChild(document.createTextNode("🔪 " + String(this.raw)));
        raw.title = "Physical damage";
        const elem = div.appendChild(document.createElement("p"));
        if (this.elementType != "none") {
            switch (this.elementType) {
                case "fire":
                    elem.appendChild(document.createTextNode("🔥 " + this.element));
                    elem.title = "Elemental damage (Fire)";
                    break;
                case "water":
                    elem.appendChild(document.createTextNode("🌊 " + this.element));
                    elem.title = "Elemental damage (Water)";
                    break;
                case "lightning":
                case "electric":
                case "thunder":
                    elem.appendChild(document.createTextNode("⚡ " + this.element));
                    elem.title = "Elemental damage (Thunder)";
                    break;
                case "ice":
                    elem.appendChild(document.createTextNode("🧊 " + this.element));
                    elem.title = "Elemental damage (Ice)";
                    break;
                case "dragon":
                    elem.appendChild(document.createTextNode("🐾 " + this.element));
                    elem.title = "Elemental damage (Dragon)";
                    break;
                case "poison":
                    elem.appendChild(document.createTextNode("🫧 " + this.element));
                    elem.title = "Status buildup (Poison)";
                    break;
                case "paralysis":
                    elem.appendChild(document.createTextNode("〽️ " + this.element));
                    elem.title = "Status buildup (Paralysis)";
                    break;
                case "sleep":
                    elem.appendChild(document.createTextNode("💤 " + this.element));
                    elem.title = "Status buildup (Sleep)";
                    break;
                case "blast":
                    elem.appendChild(document.createTextNode("💥 " + this.element));
                    elem.title = "Status buildup (Blast)";
                    break;
            }
        } else {
            elem.appendChild(document.createTextNode("No element"));
        }
        const aff = div.appendChild(document.createElement("p"));
        aff.appendChild(document.createTextNode("⚔️ " + String(this.affinity) + "%"));
        aff.title = "Affinity";
        if (!reduced) {
            const def = div.appendChild(document.createElement("p"));
            def.appendChild(document.createTextNode("🛡️ " + String(this.defense)));
            def.title = "Defense";
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
        }
        fragment.appendChild(div);
        return fragment;
    }
}

export {Weapon};