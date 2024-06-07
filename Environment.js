const assert = require('assert');

class Environment{

//Creates an environment with given record
    constructor(record = {}){
    this.record = record;
    }


// creates a variable with given name and value
    define(name, value){
    this.record[name] = value;
    return value;
    }

    lookup(name){
        if(!(name in this.record)){
            throw new ReferenceError(`Variable ${name} is not defined`)
        }
        return this.record[name];
    }

}

module.exports = Environment;