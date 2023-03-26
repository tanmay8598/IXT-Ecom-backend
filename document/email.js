const email = function (orderItems, paymentMethod, totalPrice) {
  // const today = new Date();
  return `
<!DOCTYPE html>
<html>
    <head>
       <style>
           html, body {
    margin: 0 auto;
    padding: 0;
}

.table-container{ 
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.layout {
    background-color: #EEEEEE;
    font-family: "Roboto";
    width: 100%;
    color: #484b5b;
    padding: 20px 0;
}

.content {
    text-align: center;
    background-color: white;
    width: 75%;
    margin: 0 auto;
    padding: 25px;
}

.name {
    line-height: 20px;
    font-size: 24px;
    
}

.logo {
    width: 150px;
    margin: 0px auto;
}

hr {
  border: 0;
  clear:both;
  display:block;
  width: 96%;               
  background-color: #d1d1d1;
  height: 1px;
  margin-top: 20px;
}


.link-container {
  padding: 25px; 
  margin: 0 auto;
}

.invoice-link {
    padding: 18px 30px;
    background-color: #1a64db;
    width: 50%;
    margin: 0 auto;
    border-radius: 50px;
    border: none;
    color: white;
    font-size: 18px;
    text-decoration: none;
    
}

.address {
    text-align: center
}

.address p {
    line-height: 7px;
    font-size: 15px
}

.address h2 {
    font-size: 17px
}


.footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
}

.footer-logo {
    width: 165px;
    margin: 20px auto;
    display: block
    
}

@media only screen and (max-width: 600px) {
  content {
    width: 100%;
  }

  invoice-link {
    width: 100%;
  }
}
       </style>
    </head>
    
    
    
    <body>
        <div class="layout">
        <div class="content">
            
            <h1 class="name">Subhash Super Store</h1>
              <hr>
              <div>
                  <p style="font-size: 18px">Order Placed Successfully!!</p>
              </div>
   <div class='table-container'>
     <table style="text-align: center; margin: 0 auto" >
  <tr>
    
    <th style="font-size: 20px">Item Name</th>
    <th style="font-size: 20px;padding-right:30px">Quantity</th>
    <th style="font-size: 20px">Price</th>
 
  </tr>

  ${orderItems.map(
    (item) =>
      `  <tr>
   
    <td style="font-size: 20px; width: "150px"; overflow-wrap: break-word">${
      item.name
    }</td>
    <td style="font-size: 20px">${item.qty}</td>
    <td style="font-size: 20px">${Number(item.price).toFixed(2)}</td>
    
  </tr>`
  )}


</table></div>
              
           
              
              
              
              <div class="address">
                  <h2>Total Price: ₹${totalPrice}</h2>
                  <p>Payment Method: ${paymentMethod}</p>
                  
              </div>
        </div>
        
      <div class"footer">
        
        </a>
      </div>
    <p style="text-align: center">Powered by ©IXT Minds</p>
    </div>
    </body>
</html>`;
};

module.exports = email;
