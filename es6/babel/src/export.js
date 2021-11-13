//export let a = "hello"
export class Person{
    constructor(name){
        this.name=name
    }
    showInfo(){
        console.log(this.name);
    }
}
//一次仅抛出一个
export default Person;