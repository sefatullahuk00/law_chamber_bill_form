let url = '?pay_order_title=Pay+Order&pay_order_amount=10500&n_fee_title=N-Fee+%26+E-Fee';


let params = new URLSearchParams(url);

let entries = Array.from(params.values())
let a = params.values();
const [name,val,...b] = entries;
console.log(name + val + b);


// console.log(entries);

