
class Skill {
    id:string = "";
    name:string = "";
    maxlevel:number = 0;
    level:number = 0;

    constructor(id:string, name:string, maxlevel:number, level:number = 0) {
        this.id = id;
        this.name = name;
        this.maxlevel = maxlevel;
        this.level = level;
    }

    static async fetchAll(url:string): Promise<Array<Skill>> {
        const get = (await (await fetch(`${url}/skills`)).json() as Array<any>);
        const out: Array<Skill> = [];
        get.forEach((item) => {
            out.push(new Skill(item._id, item.name, item.max_level));
        });
        return out;
    }

    clone(level:number = this.level) {
        return new Skill(this.id, this.name, this.maxlevel, level);
    }

    display(): DocumentFragment {
        const fragment = new DocumentFragment();
        const div = document.createElement("div");
        const name = div.appendChild(document.createElement("p"));
        name.appendChild(document.createTextNode(this.name));
        const boxes = div.appendChild(document.createElement("p"));
        const filled = Math.min(this.maxlevel, this.level);
        const empty = this.maxlevel - filled;
        for (let i = 0; i < filled; i++) {
            boxes.appendChild(document.createTextNode("🔲"));
        }
        for (let i = 0; i < empty; i++) {
            boxes.appendChild(document.createTextNode("⬛️"));
        }
        fragment.appendChild(div);
        return fragment;
    }
}

export {Skill};

