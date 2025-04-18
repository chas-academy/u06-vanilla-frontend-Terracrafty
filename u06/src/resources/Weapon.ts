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
    maxSharpness:number;

    constructor(id:string, name:string, type:string, raw:number, element:number, elementType:string = "none", affinity:number, defense:number, slots1:number, slots2:number, slots3:number, skills:Array<Skill>, maxSharpness:number) {
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
            out.push(new Weapon(item._id, item.name, item.type, item.raw, item.element, item.elementType = "none", item.affinity, item.defense, item.slots1, item.slots2, item.slots3, skills, item.max_sharpness));
        });
        return out;
    }

    display(): DocumentFragment {
        
    }
}

