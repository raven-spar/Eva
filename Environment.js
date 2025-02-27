const assert = require('assert');

class Environment{

//Creates an environment with given record
    constructor(record = {}, parent = null){
    this.record = record;
    this.parent = parent;  
    }


// creates a variable with given name and value
    define(name, value){
    this.record[name] = value;
    return value;
    }

    lookup(name){
        return this.resolve(name).record[name];
    }

    assign(name, value){
        this.resolve(name).record[name] = value;
        return value;
    }

    resolve(name){
        if(this.record.hasOwnProperty(name)){
            return this;
        }

        if(this.parent === null){
            throw new ReferenceError(`Variable ${name} is not defined`);
        }

        return this.parent.resolve(name);
    }

}

module.exports = Environment;