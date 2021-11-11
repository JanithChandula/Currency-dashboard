global.set("Pref",msg.payload)
return msg;
if(msg.payload==""){
    msg.payload=1;
    global.set("Pref","Dollars");
}

global.set("Amount",msg.payload)
return msg;
let wh= msg.payload;
global.set("Weather",msg.payload);
if ((wh=="yes")||(wh=="Yes")||(wh=="YES") ){
    console.log(msg.payload);
    msg.payload=1;
    console.log(msg.payload);
}
else{
    msg.payload=0;
    console.log(msg.payload);
}
return msg;
global.set("location",msg.payload)
return msg;


return {
    location:{country:global.get("Country"),city:global.get("location")}
}
    
let desc= msg.payload.description;
global.set("weather",msg.payload.description);
var num = desc.replace(/[^0-9]/g, ''); 
//let numbers= parseInt(num,10); 
let lat= (parseInt(num.slice(0,6)))/10000;
let long=(parseInt(num.slice(6)))/10000;

global.set("Lat",lat);
global.set("Long",long);


return {
    payload:msg.payload.description+". The temperature is "+msg.payload.tempc+" C.",
};


msg.LATITUDE=global.get("Lat");

msg.LONGITUDE=global.get("Long");
return msg;



let AQI=msg.payload.data.current.pollution.aqius

let quality=""
if(AQI){
    if(AQI<20){
        quality="Very Good. There is no health risk.Breathe to fill your lungs!.";
    }
    else if(AQI<50){
        quality="Good. There is no health risk. Perfect air for exercising! Go for it!.";
    }
    else if(AQI<100){
        quality="Moderate. Sensitive individuals may experience irritations.";
    }
    else if(AQI<150){
        quality="Unhealthy for Sensitive Groups. Sensitive groups should limit outdoor exertions.";
    }
    else{
        quality="Unhealthy. Harmful for sensitive groups. Everyone should limit outdoor activities.";
    }
    return { 
        payload: "\n US AQI is " + AQI+"."+
        "\n Therefore Air Quality is " + quality,
        
    }
}
else{
    return{
        payload:"No Data for this city",
    }
}   
    
let Rate=msg.payload.response.rates.CNY;
global.set("UtC",Rate)
return {
    USDtoCNY:Rate,
}

    
 let amount=global.get("Amount");
let UtoC=global.get("UtC");
let pref=global.get("Pref");
var text="a";
let RUtoC;
let conv;
if (pref=="Dollars"){
    conv=(amount*(1/UtoC));
    conv=conv.toFixed(2);
    UtoC=UtoC.toFixed(2);
    text=amount+" Renminbi  = "+conv+" United State dollars.    "+"\n           1 Dollar is  "+UtoC+" Renminbi.";
} 
else if (pref=="Renminbi"){
   conv=(amount*UtoC); 
   conv=conv.toFixed(2);
   RUtoC=(1/UtoC);
   RUtoC=RUtoC.toFixed(2);
   text=amount+"  \nDollars  = "+conv+"  Renminbi. "+ "\n           1 Renminbi is "+RUtoC+" Dollars.";
}
else{}

return {
    payload:text,
};   
    
    