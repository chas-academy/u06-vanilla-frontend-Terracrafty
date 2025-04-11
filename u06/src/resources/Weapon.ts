import { Iresource } from "./Iresource";

class Weapon implements Iresource {
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
    skills: Array<Skill>
}