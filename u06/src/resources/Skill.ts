
class Skill {
    id:string = "";
    name:string = "";
    maxlevel:number = 0;
    level:number = 0;

    constructor(object:any) {
        try {
            this.id = object._id;
            this.name = object.name;
            this.maxlevel = object.maxlevel;
        } catch (e) {
            console.log(e);
        }
    }

    static async fetchAll(url:string): Promise<Array<Skill>> {
        const get = (await (await fetch(`${url}/skills`)).json() as Array<any>);
        const out: Array<Skill> = [];
        get.forEach((item) => {
            out.push(new Skill(item));
        });
        return out;
    }

    display(): DocumentFragment {
        const fragment = new DocumentFragment();
        const div = document.createElement("div");
        div.appendChild(document.createElement("p").appendChild(document.createTextNode(this.name)));
        const filled = Math.min(this.maxlevel, this.level);
        const empty = this.maxlevel - filled;
        div.appendChild()
    }
}

export {Skill};

