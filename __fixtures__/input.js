import {nameof} from '../nameof.macro';

class MyClass {

}

const foo = 123;


const myFn = () => {
    console.log('wawawewa');
};

console.log(nameof({ MyClass }));
console.log(nameof({ foo }));
console.log(nameof({ myFn }));


