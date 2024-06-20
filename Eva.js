const assert = require('assert');
const Environment = require('./Environment');


class Eva{

    constructor(global = new Environment()){
        this.global = global;
    }
    eval(exp, env = this.global){
        
//----------------------------------------------------
//Numbers and Strings
        if (isNumber(exp)){ 
            return exp;
        }

        if (isString(exp)){
            return exp.slice(1, -1);
        }
//----------------------------------------------------        
//Math operations

        if (exp[0] === '+'){
            return this.eval(exp[1]) + this.eval(exp[2]);
        }

        if (exp[0] === '*'){
            return this.eval(exp[1]) * this.eval(exp[2]);
        }
        
        if (exp[0] === '-'){
            return this.eval(exp[1]) - this.eval(exp[2]);
        }

        if (exp[0] === '/'){
            if (isNumber(exp[2]) && exp[2] === 0){
                throw 'Division by zero';
            }
            return this.eval(exp[1]) / this.eval(exp[2]);
        }
//----------------------------------------------------        
//Variable definition
        if(exp[0] === 'var'){
            const [_, name, value] = exp;
            return env.define(name, this.eval(value));
        }

//Variable access
        if (isVariableName(exp)){
            return env.lookup(exp)
        }

        throw 'Not Implemented';
    }
}

//----------------------------------------------------
//Helper functions

function isVariableName(exp){
    return typeof exp === 'string' && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp)
}

function isNumber(exp){
    return typeof exp === 'number';
}

function isString(exp){
    return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
}


//--------------------------------
//Tests :

const eva  = new Eva();

//Numbers and Strings
assert.strictEqual(eva.eval(1), 1);
assert.strictEqual(eva.eval('"Hello"'), 'Hello');

//Math operations
assert.strictEqual(eva.eval ([ '+' , 1, 5]), 6);
assert.strictEqual(eva.eval([ '+' , 6, [ '+' , 2, 3]]), 11);
assert.strictEqual(eva.eval([ '+' , ['+', 2, 4], [ '+' , 2, 3]]), 11);
assert.strictEqual(eva.eval([ '*' , 6, [ '*' , 2, 3]]), 36);
assert.strictEqual(eva.eval ([ '/' , 10, 5]), 2);
assert.strictEqual(eva.eval([ '/' , 30, [ '+' , 2, 3]]), 6);

//Variable definition
assert.strictEqual(eva.eval(['var' ,'x', 1]), 1);
assert.strictEqual(eva.eval("x"), 1);
assert.strictEqual(eva.eval(['var' , 'y' , 100]), 100);

//Blocks








console.log('All tests passed!')