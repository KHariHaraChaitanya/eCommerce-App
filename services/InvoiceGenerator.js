"use strict";

const Invoice = require("nodeice");
var sellerDetails={
    company: "The Chitrakars"
  , address: {
        line1:"HNo-1-  , Banjara hills"
      , city: "Hyderabad"
      , region: "Telangana"
      , zip: "500034"
      , country: "India"
    }
  , phone: "9899087888"
}
module.exports={
 genInvoice:function (buyer){
    var buyerDetails={
    company:buyer.companyName,
    email:buyer.email,
    address:{
        line1:buyer.addressLine1,
        line2:buyer.addressLine2,
        city:buyer.city,
        zip:buyer.zip,
        state:buyer.state,
        country:buyer.country
    },
    phone: buyer.phonenumber
}
var soldItems=[
    {
        item: buyer.product.productname
      , quantity: 5
      , unitPrice: 2
    }
  , {
        item: "Another interesting task",
        quantity: 10,
        unitPrice: 3
    }

]
let myInvoice = new Invoice({
    config: {
        template: __dirname + "/template/index.html"
      , tableRowBlock: __dirname + "/template/blocks/row.html"
    }
  , data: {
        currencyBalance: {
            main: 1
        },
        invoice: {
            number: {
                series: "PREFIX"
              , separator: "-"
              , id: 1
            }
          , date: "01/02/2014"
          , dueDate: "11/02/2014"
          , explanation: "Thank you for your business!"
          , currency: {
                main: "INR"
            }
        }
      , tasks: soldItems
    }
  , seller: sellerDetails
  , buyer: buyerDetails
    
});
myInvoice.toHtml(__dirname + "/my-invoice.html", (err, data) => {
    console.log("Saved HTML file");
}).toPdf(__dirname + "/my-invoice.pdf", (err, data) => {
    console.log("Saved pdf file");
});
}
}
// var buyerDetails={
//     company: "Another Company GmbH"
//   , address: {
//         street: "The Street Name"
//       , number: "00"
//       , zip: "000000"
//       , city: "Some City"
//       , state: ''
//       , country: "Nowhere"
//     }
//   , phone: "+40 726 xxx xxx"
//   , email: "me@example.com"
// //   , website: "example.com"
// //   , bank: {
// //         name: "Some Bank Name"
// //       , swift: "XXXXXX"
// //       , currency: "XXX"
// //       , iban: "..."
// //     }
// }


// Create the new invoice


// Render invoice as HTML and PDF


// Serve the pdf via streams (no files)
// require("http").createServer((req, res) => {
//      myInvoice.toPdf({ output: res });
// }).listen(8000);



