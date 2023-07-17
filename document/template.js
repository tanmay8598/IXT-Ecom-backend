const template = function ({
  name,
  address,
  PaymentMode,
  deliveryCharge,
  total,
  items,
  totalSaved,
  deliverySlot,
}) {
  const today = new Date();
  return `
  <!DOCTYPE html>
  <html>
  <head>
  <style>
  
  .invoice-container {
      margin: 0;
      padding: 0;
      padding-top: 10px;
      font-family: 'Roboto', sans-serif;
      width: 530px;
      margin: 0px auto;
      }
  
  table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  table td, table th {
    border: 1px solid rgb(247, 247, 247);
    padding: 10px;
  }
  
  table tr:nth-child(even){background-color: #f8f8f8;}
  
  table tr:hover {background-color: rgb(243, 243, 243);}
  
  table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #FFFFFF;
    color: rgb(78, 78, 78);
  }
  
  .header {
    display: -webkit-box;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
      padding: 10px 5px;
      
  
  }
  .address {
    display: -webkit-box;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
      flex-direction: column;
      padding: 10px 0px 15px 0px;
      line-height: 10px;
      font-size: 12px;
      margin-top: -20px
  
  }
  
  .status {
      text-align: right;
  }
  .receipt-id {
      text-align: right;
  }
  
  .title {
      font-weight: 100px;
      text-transform: uppercase;
      color: gray;
      letter-spacing: 2px;
      font-size: 8px;
      line-height: 5px;
  }
  
  .summary {
      margin-top: 5px;
      margin-right: 0px;
      margin-left: 50%;
      margin-bottom: 15px;
  }
  
  img {
      width: 100px;
     
  }
  
  </style>
  </head>
  <body>
  <div class="invoice-container">
  
  <section  class="header">
          <div>
           <h3>Subhash Super Store</h3>
           <img width="300" height="100" src ='https://groceryapp-s3bucket.s3.ap-south-1.amazonaws.com/invoice-logo.jpeg' /></td>
          </div>
          <div class="receipt-id" style="margin-top: -120px 0 40px 0">
              
          </div>
  </section> 
  <section class="address">
  
        <div style="margin-bottom: 100px; margin-top: 20px">
        


            <p class="title">Bill to:</p>
          <h4 style="font-size: 9px; line-height: 5px">${name}</h4>
          <p style="font-size: 9px; line-height: 5px">${address.email}</p>
          <p style="font-size: 9px; line-height: 5px">${
            address.mobileNumber
          }</p>
          <p style="font-size: 9px; line-height: 5px">${address.address},${
    address.landmark
  },</p>
          <p style="font-size: 9px; line-height: 5px">${address.area},${
    address.pincode
  },${address.city}</p>

  <p class="title" >Slot timing:</p>
  <h4 style="font-size: 9px; line-height: 5px">${deliverySlot}</h4>
        </div>
  
        <div style="margin-bottom: 100px; margin-top: 20px">
        <p class="title">From:</p>
        <h4 style="font-size: 9px; line-height: 5px">Subhash Super Store</h4>
        <p style="font-size: 9px; line-height: 5px">subhas.store2023@gmail.com</p>
        <p style="font-size: 9px; line-height: 5px">+91-6306591599</p>
        <p style="font-size: 9px; line-height: 5px">GST: 09AEWPA0282Q1ZU</p>
        <p style="font-size: 9px; line-height: 5px">FSSAI: 998899 </p>
        <p style="font-size: 9px; line-height: 5px">TYPE SUPPLY: GOODS AND SERVICES</p>
        <p style="font-size: 9px; line-height: 5px">PLACE OF SUPPLY: UTTAR PRADESH STATE CODE 09</p>
        </div>
  
     
  </section>
  
  <table style="text-align: center">
  <tr>
    <th style="font-size: 9px">No.</th>
    <th style="font-size: 9px;width:120px">Item Name</th>
   
    <th style="font-size: 9px">HSN</th>
    <th style="font-size: 9px">MRP</th>
    <th style="font-size: 9px">Price</th>
    <th style="font-size: 9px">Discount</th>
    <th style="font-size: 9px">Quantity</th>
    <th style="text-align: right; font-size: 9px">Total</th>
  </tr>

  ${items.map(
    (item, index) =>
      `  <tr>
      <td style="font-size: 9px">${index + 1}</td>
    <td style="font-size: 9px"; overflow-wrap: break-word">${item.name}</td>

    <td style="font-size: 9px">${item.hsnCode}</td>
    <td style="font-size: 9px; text-decoration: line-through">₹ ${Number(
      item.mrp
    ).toFixed(2)}</td>
    <td style="font-size: 9px">₹ ${Number(item.price).toFixed(2)}</td>
    <td style="font-size: 9px">₹ ${Number(item.discount).toFixed(2)}</td>
    <td style="font-size: 9px">${item.qty}</td>
    <td style="text-align: right; font-size: 9px">₹ ${Number(
      item.qty * item.price
    ).toFixed(2)}</td>
  </tr>`
  )}


</table>
  
  <section class="summary">
      <table>
          <tr>
            <th style="font-size: 9px">Invoice Summary</th>
            <th></th>
          </tr> 
          <tr>
              <td style="font-size: 10px" >Payment Mode</td>
              <td style="text-align: right; font-size: 9px; font-weight: 700">${PaymentMode}</td>
            </tr>
            <tr>
            <td style="font-size: 10px" >Sub Total</td>
            <td style="text-align: right; font-size: 9px; font-weight: 700">₹ ${
              Number(total).toFixed(2) - Number(deliveryCharge).toFixed(2)
            }</td>
          </tr>
          <tr>
          <td style="font-size: 10px" >You Saved</td>
          <td style="text-align: right; font-size: 9px; font-weight: 700">₹ ${totalSaved}</td>
        </tr>
          <tr>
              <td style="font-size: 10px" >Shipping Charges</td>
              <td style="text-align: right; font-size: 9px; font-weight: 700">₹${deliveryCharge}</td>
            </tr>
            <tr>
            <td style="font-size: 10px" >Total Quantity</td>
            <td style="text-align: right; font-size: 9px; font-weight: 700"> ${
              items?.length
            }</td>
          </tr>
  
            <tr>
            <td style="font-size: 9px">Total</td>
            <td style="text-align: right; font-size: 9px; font-weight: 700">₹${total}</td>
          </tr>
          
        </table>
    </section>
    <div>
        <hr>
        <h4 style="font-size: 9px">Note</h4>
        <p style="font-size: 9px"></p>
    </div>
  </div>
  </body>
  </html>`;
};

module.exports = template;
