'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "RAM" from table "Features"
 * addColumn "ram" to table "Features"
 *
 **/

var info = {
    "revision": 5,
    "name": "noname",
    "created": "2018-03-13T10:17:10.841Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Features", "RAM"]
    },
    {
        fn: "addColumn",
        params: [
            "Features",
            "ram",
            {
                "type": Sequelize.STRING,
                "allowNull": false
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
