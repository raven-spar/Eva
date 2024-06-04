const assert = require('assert');

class Eva{
    eval(exp){
        if (isNumber(exp)){
            return exp;
        }

        if (isString(exp)){
            return exp.slice(1, -1);
        }

        if (exp[0] === '+'){
            let left_op = exp[1];
            let right_op = exp[2];
            if (isList(exp[1])){
                left_op = this.eval(exp[1]);
            }
            if (isList(exp[2])){
                right_op = this.eval(exp[2]);
            }
            return left_op + right_op;
        }
        throw 'Not Implemented';
    }
}


function isNumber(exp){
    return typeof exp === 'number';
}

function isString(exp){
    return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
}

function isList(exp){
    return typeof exp === 'object';
}
//--------------------------------
//Tests :

const eva  = new Eva();

assert.strictEqual(eva.eval(1), 1);
assert.strictEqual(eva.eval('"Hello"'), 'Hello');
assert.strictEqual(eva.eval ([ '+' , 1, 5]), 6);
assert.strictEqual(eva.eval([ '+' , 6, [ '+' , 2, 3]]), 11);
assert.strictEqual(eva.eval([ '+' , ['+', 2, 4], [ '+' , 2, 3]]), 11);


console.log('All tests passed!')