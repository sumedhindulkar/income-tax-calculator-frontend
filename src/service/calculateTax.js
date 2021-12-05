const calculateTax = (data) => {
  let { bas, fa, hra, inv, lta, med, rent, city } = data;
  var appHra = 0;
  if (city === "metro") {
    var x = (bas * 50) / 100;
    var y = rent - (bas * 10) / 100;
    if (x > y) {
      appHra = y;
    } else {
      appHra = x;
    }

    console.log("metro");
  }
  if (city === "nonMetro") {
    var x = (bas * 40) / 100;
    var y = rent - (bas * 10) / 100;
    if (x > y) {
      appHra = y;
    } else {
      appHra = x;
    }
    console.log("nonmetro");
  }
  if (appHra > hra) {
    appHra = hra;
  }
  console.log("appHRA" + appHra);
  let TaxInc = bas + lta + hra + fa - appHra - inv - med;
  return TaxInc;
};
export default calculateTax;
