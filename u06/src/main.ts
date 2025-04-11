import './style.css'

async function list(resource:Promise<Array<Object>>) {
    try {
        await resource
    } catch (e) {
        console.log(e);
    }
}