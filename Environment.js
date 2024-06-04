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

}

module.exports = Environment;