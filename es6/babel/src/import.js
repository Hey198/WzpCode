// expor 抛出js文件
// import 接受js文件
//接受名应该相同 as 进行修改变量名
// import {a as b,Person} from "./export"
// console.log(b);
// let person1=new Person("xoaaa");
// person1.showInfo();
import{Person}from "./export"
let person1=new Person("xoaaa");
person1.showInfo();
// export default 抛出只能抛出一个变量类等
// 可以任意起名字
import p from "./export"
let person1=new p("xoaaa");
person1.showInfo();