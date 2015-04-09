function MenuChoice()
{
    if (document.getElementById("menu").value == "Display Customer List")
    {
        document.getElementById("customerlist").style.visibility = "visible";
        document.getElementById("orderhistory").style.visibility = "hidden";
        document.getElementById("ordersplaced").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Display Order History")
    {
        document.getElementById("customerlist").style.visibility = "hidden";
        document.getElementById("orderhistory").style.visibility = "visible";
        document.getElementById("ordersplaced").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Display Orders Placed")
    {
        document.getElementById("customerlist").style.visibility = "hidden";
        document.getElementById("orderhistory").style.visibility = "hidden";
        document.getElementById("ordersplaced").style.visibility = "visible";
    }
    else
   {
        document.getElementById("customerlist").style.visibility = "hidden";
        document.getElementById("orderhistory").style.visibility = "hidden";
        document.getElementById("ordersplaced").style.visibility = "hidden";
   }
}

function GetCustomers()
{
    var objRequest = new XMLHttpRequest();
    
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
    
    objRequest.onreadystatechange = function()
    {
            if (objRequest.readyState == 4 && objRequest.status == 200)
            {
                var output = JSON.parse(objRequest.responseText);
                DisplayOutput(output);
            }
    }
    objRequest.open("GET",url,true);
    objRequest.send();
}
function DisplayOutput(results)
{
    var count = 0;
    var displaytext = "<table><tr><th>Customer Name</th><th>Customer ID</th><th>Customer City</th></tr>";
    
    for (count = 0; count < results.GetAllCustomersResult.length; count++)
    {
        displaytext += "<tr><td>" + results.GetAllCustomersResult[count].CompanyName + "</td><td>" + results.GetAllCustomersResult[count].CustomerID + "</td><td>" + results.GetAllCustomersResult[count].City + "</td></tr>";
    }
    results += "</table>";
    document.getElementById("customerdisplay").innerHTML = displaytext;
}    

function GetOrders()
{
    var objRequest = new XMLHttpRequest();
    
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    
    url += document.getElementById("customerid").value;
    
    objRequest.onreadystatechange = function()
    {
            if (objRequest.readyState == 4 && objRequest.status == 200)
            {
                var output = JSON.parse(objRequest.responseText);
                GenerateOutput(output);
            }
    }
    objRequest.open("GET", url,true);
    objRequest.send();
}

function GenerateOutput(result)
{
    var count = 0;
    var displaytext = "<table><tr><th>Product Names</th><th>Product Quantity</th></tr>";;
    
    for (count = 0; count < result.length; count++)
    {
        displaytext += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</tr>";
    }
    result += "</table>";
    document.getElementById("historydisplay").innerHTML = displaytext;
}

function GetOrdersPlaced()
{
     var objRequest = new XMLHttpRequest();
    
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    
    url += document.getElementById("custid").value;
    
    objRequest.onreadystatechange = function()
    {
            if (objRequest.readyState == 4 && objRequest.status == 200)
            {
                var output = JSON.parse(objRequest.responseText);
                DisplayOrders(output);
            }
    }
    objRequest.open("GET", url,true);
    objRequest.send();
}
function DisplayOrders(result)
{
    var count = 0;
    var displaytext = "<table><tr><th>Order Date</th><th>Order ID</th><th>Ship Address</th><th>Ship City</th><th>Ship Name</th><th>Ship Post Code</th><th>Shipped Date</th></tr>";;
    
    for (count = 0; count < result.GetOrdersForCustomerResult.length; count++)
    {
        displaytext += "<tr><td>" + result.GetOrdersForCustomerResult[count].OrderDate + "</td><td>" + result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipName + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td><td>" + result.GetOrdersForCustomerResult[count].ShippedDate + "</td></tr>";
    }
    result += "</table>";
    document.getElementById("ordersdisplay").innerHTML = displaytext;
}


