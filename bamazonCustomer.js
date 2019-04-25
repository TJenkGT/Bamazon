var mysql = require("mysql")
var inquirer = require("inquirer")
const cTable = require("console.table")
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("select * from products", function (err, res) {
        if (err) throw err
        const table = cTable.getTable(res);
        console.log(table);
        inquirer
            .prompt([
                {
                    message: "What is the id of the product",
                    name: "id",
                },
                {
                    message: "How many would you buy",
                    name: "quantite",

                }
            ])
            .then(answers => {
                transaction(answers.id,answers.quantite)
            });

    })
}

function transaction(id,q) {
connection.query("SELECT * from products WHERE ?", {item_id: id}, function(err,res){
    if (err) throw err;
    const table = cTable.getTable(res)
    console.log(table)
    // console.log(res[0].price * q)
    connection.end();
})
}


const checkInventory = function(qty,id) {
    connection.query(`Select stock_quantity,price from products WHERE item_id = ${id}`,function(err, res) {
      let result;
      if(res[0].stock_quantity >= qty){
           //update the db and show the cost
           connection.query(`UPDATE products SET stock_quantity = ${res[0].stock_quantity - qty} WHERE item_id = ${id}`);
           result = `Your price is $${(qty * res[0].price).toFixed(2)}`;
       }else{
           result = `There's not enough of product #${id} for you! `;
       }
      console.log(result)
      connection.end();
      }
    );
  };


