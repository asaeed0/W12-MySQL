//  npm dependencies
const inquirer = require('inquirer');
require("dotenv").config();

const connection = require('./connection');

const prompts = [
    {
        name: "itemId",
        type: "input",
        message: "Please enter the product number of the item you would like to purchase",
    },
    {
        name: "itemQuantity",
        type: "input",
        message: "How many would you like to purchase?"
    },
];

const querys = {
    selectAll: 'SELECT * FROM products',
    selectOne: 'SELECT * FROM products WHERE item_id = ?',
    updateStock: 'UPDATE products SET stock_quantity = ? WHERE item_id = ?',


}
 
// intial query
connection.query(querys.selectAll, (err, res) => {
    console.log(`Item ID | Product Name | Department Name | Price | Quantity Remaining |`);
    for (let item of res) {
        console.log(`${item.item_id} | ${item.product_name} | ${item.department_name} | ${item.price} | ${item.stock_quantity} |`);
    }

    inquirer.prompt(prompts)
        .then(answers => {
            connection.query(querys.selectOne, [answers.itemId], (err, res) => {
                if (err) throw err;
                let newQty = res[0].stock_quantity - answers.itemQuantity;
                if (newQty >= 0) {
                    connection.query(querys.updateStock, [newQty, answers.itemId], (err, res) =>{
                        if (err) throw err;
                        console.log(`Thanks for your purchase of ${answers.itemQuantity} items.`);
                    })
                } else {
                    console.log("Insufficient stock");
                }
                connection.end();
            }
        )
    }
)
}
);
