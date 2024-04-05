let currency= document.querySelectorAll("select");
let inp =document.querySelectorAll("input");
let inpvalue= inp[0].value;
let coinprice1 = 1;
let coinprice2;
let tov = document.querySelector("#tov");

async function getcoinlist() {
  const list_url = "https://api.coingecko.com/api/v3/coins/list";
  const response = await fetch(list_url);
  const data = await response.json();
  for (const select of currency) {
    for (const code in data) {
      const option = document.createElement("option");
      option.innerText= data[code].symbol.toUpperCase();
      option.value= data[code].id;
      if( select.id === "fromslc" & data[code].id==="tether")
      { option.selected= "selected";
        coinprice1= await getcoinprice("tether"); 
      }
      else if( select.id === "toslc" & data[code].id==="bitcoin")
      { option.selected= "selected";
        coinprice2= await getcoinprice("bitcoin");
      }
      select.append(option);
        
      }
    }
    currency[0].addEventListener("change", (evt) => {
      getcoinid1(evt.target)
    })
    currency[1].addEventListener("change", (evt) => {
      getcoinid2(evt.target)
    })
    
  }
  getcoinlist();
  

  async function getcoinprice(coinid){
    let priceurl = `https://api.coingecko.com/api/v3/coins/${coinid}`;
    let response = await fetch(priceurl);
    let cmdata = await response.json();
    let cmp= cmdata.market_data.current_price.usd; 
    return cmp;
  }
  
  async function getcoinid1(ele){
    let coinid = ele.value;
    coinprice1= await getcoinprice(coinid);
  }
  async function getcoinid2(ele){
    let coinid = ele.value;
    coinprice2= await getcoinprice(coinid);
  }
  const Button = document.querySelector("#sbmt");
  Button.addEventListener("click",(event)=>{
    event.preventDefault();
    GetRate();
});

async function GetRate(){
  let rate= (coinprice1/coinprice2);
  if(inp[0].value<1){ inp[0].value=1;}
  let output = inp[0].value *rate;
  inp[1].innerText=output;
  inp[1].value=output;
}

let swap = document.getElementById("swpimg");

swap.addEventListener("click", () =>{
  let swapvar=0;  
  swapvar = currency[0].selectedIndex;
  currency[0].selectedIndex = currency[1].selectedIndex;
  currency[1].selectedIndex = swapvar;
  let swapprice=0;  
  swapprice = coinprice1;
  coinprice1 = coinprice2;
  coinprice2= swapprice;
}
)
