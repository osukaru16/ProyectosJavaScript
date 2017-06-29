


function calcularSimulacion(){

	var consumo = parseFloat(document.getElementById("consumo").value);

	var simulacion = new SimuladorFactura(consumo);

	//alert(simulacion.calcular());

	alert(simulacion.calcular().agua.subTotal);

}













// Apartir de ahora se crean la clase











function SimuladorFactura(consumo){

	// constantes arrays
	this.precioAgua = [0.6, 0.84, 1.38, 3.09, 5.76];

	this.precioAlcantarillado = [0.1928, 0.2834, 0.4724, 1.0218, 1.8702, 2.9884];

	this.precioCanon = [ 0.285924, 0.428835,  0.571848,   1.143696,  1.714516];


	//constantes


	this.mantenimientoAgua = 3.89;

	this.cuotaFijaAgua = 9.1894;

	this.cuotaFijaAlcantarillado = 1.7906;

	this.cuotaFijaRSU = 13.91;

	this.cuotaFijaCanon = 8;


	this.precioRSU = 0.1236;


	//variables

	this.consumo = consumo;


	this.bloquesAgua;
	this.bloquesAlcantarillado;
	this.bloquesCanon;
	this.bloquesRSU;


	this.cuotaVariableAgua;
	this.cuotaVariableAlcantarillado;
	this.cuotaVariableCanon;
	this.cuotaVariableRSU;

	this.subTotalAgua;
	this.subTotalAlcantarillado;
	this.subTotalCanon;
	this.subTotalRSU;




}



SimuladorFactura.prototype.calcular = function(){





	var totalAgua = parseFloat(this.calcularAgua(this.consumo));

	var totalAlcantarillado = parseFloat(this.calcularAlcantarillado(this.consumo));

	var totalCanon = parseFloat(this.calcularCanon(this.consumo));

	var totalRSU = parseFloat(this.calcularRSU(this.consumo));



	var subTotalFactura = totalAgua + totalAlcantarillado + totalCanon + totalRSU;

	var iva10 = (totalAgua+totalAlcantarillado+totalRSU-this.mantenimientoAgua)*0.1;

	var iva21 = this.mantenimientoAgua*0.21;

	var totalFactura = parseFloat(subTotalFactura.toFixed(2)) + parseFloat(iva10.toFixed(2)) + parseFloat(iva21.toFixed(2));

	









	return { 
			agua : {total : totalAgua, bloque : this.bloquesAgua, cuotaVariable : this.cuotaVariableAgua, subTotal : this.subTotalAgua.toFixed(2)}, 
			alcantarillado : {total : totalAlcantarillado, bloque : this.bloquesAlcantarillado, cuotaVariable : this.cuotaVariableAlcantarillado, subTotal : this.subTotalAlcantarillado.toFixed(2)}, 
			canon : {total :totalCanon, bloque : this.bloquesCanon, cuotaVariable : this.cuotaVariableCanon, subTotal : this.subTotalCanon.toFixed(2)}, 
			rsu : {total :totalRSU, bloque : this.bloquesRSU, cuotaVariable : this.cuotaVariableRSU, subTotal : this.subTotalRSU.toFixed(2)}, 
			factura:{subTotal: subTotalFactura.toFixed(2) , iva10 : iva10.toFixed(2), iva21 : iva21.toFixed(2) , total : totalFactura}
			};





/*
return { agua : totalAgua, alcantarillado : totalAlcantarillado, canon : totalCanon, rsu : totalRSU
			};

*/
	//mostrar(totalAgua.toFixed(2));


	/*return {
		agua: totalAgua,
		alcan: totalAlcan
	}

	total.agua*/


	//return "Total Agua: "+totalAgua+"\nTotal Alcantarillado: "+totalAlcantarillado+"\nTotal Canon: "+totalCanon+"\nTotal RSU: "+totalRSU+"\nSubTotalFactura: "+subTotalFactura.toFixed(2)+"\nIVA 10%: "+iva10.toFixed(2)+"\nIVA 21%: "+iva21.toFixed(2)+"\nTotal Factura: "+totalFactura;


	
}







// Inicio de calcularX




SimuladorFactura.prototype.calcularAgua = function(consumo){
	var bloque = this.rellenarBloquesAgua(consumo);

	this.bloquesAgua = bloque;

	var cuotaVariable = this.calcularCuotaVariable(bloque, "agua");

	this.cuotaVariableAgua = cuotaVariable;

	var subTotal = this.calcularSubTotal(cuotaVariable);

	this.subTotalAgua = subTotal;

	var totalAgua = subTotal + this.cuotaFijaAgua + this.mantenimientoAgua;


	return totalAgua.toFixed(2);


}



SimuladorFactura.prototype.calcularAlcantarillado = function(consumo){
	var bloque = this.rellenarBloquesAlcantarillado(consumo);

	this.bloquesAlcantarillado = bloque;

	var cuotaVariable = this.calcularCuotaVariable(bloque, "alcantarillado");

	this.cuotaVariableAlcantarillado = cuotaVariable;

	var subTotal = this.calcularSubTotal(cuotaVariable);

	this.subTotalAlcantarillado = subTotal;

	var totalAlcantarillado = subTotal + this.cuotaFijaAlcantarillado;


	return totalAlcantarillado.toFixed(2);


}







SimuladorFactura.prototype.calcularCanon = function(consumo){
	var bloque = this.rellenarBloquesCanon(consumo);

	this.bloquesCanon = bloque;

	var cuotaVariable = this.calcularCuotaVariable(bloque, "canon");

	this.cuotaVariableCanon = cuotaVariable;

	var subTotal = this.calcularSubTotal(cuotaVariable);

	this.subTotalCanon = subTotal;

	var totalCanon = subTotal + this.cuotaFijaCanon;


	return totalCanon.toFixed(2);


}








SimuladorFactura.prototype.calcularRSU = function(consumo){
	var bloque = this.rellenarBloquesRSU(consumo);

	this.bloquesRSU = bloque;

	var cuotaVariable = this.calcularCuotaVariable(bloque, "RSU");

	this.cuotaVariableRSU = cuotaVariable;

	var subTotal = cuotaVariable;

	this.subTotalRSU = subTotal;

	var totalRSU = subTotal + this.cuotaFijaRSU;


	return totalRSU.toFixed(2);


}














// Fin de calcularX




// Inicio Rellenar bloques

SimuladorFactura.prototype.rellenarBloquesAgua = function(consumo){

	var bloque = new Array(5);

	if(consumo <= 10){ 
		bloque[0] = consumo
	}else{
		bloque[0] = 10;
	}


	if(consumo > 20){
		bloque[1] = 10;
	}else if(consumo<=10){
		bloque[1] = 0;
	}else{
		bloque[1] = consumo - 10;
	}

	
	if(consumo > 40){
		bloque[2] = 20;
	}else if(consumo <= 20){
		bloque[2] = 0;
	}else{
		bloque[2] = consumo - 20;
	}
	

	if(consumo > 80){
		bloque[3] = 40;
	}else if(consumo <= 40){
		bloque[3] = 0;
	}else{
		bloque[3] = consumo - 40;
	}
	

	if(consumo < 80){
		bloque[4] = 0;
	}else{
		bloque[4] = consumo - 80;
	}


	return bloque;
}









SimuladorFactura.prototype.rellenarBloquesAlcantarillado = function(consumo){

	var bloque = new Array(6);

	if(consumo <= 10){ 
		bloque[0] = consumo
	}else{
		bloque[0] = 10;
	}


	if(consumo > 20){
		bloque[1] = 10;
	}else if(consumo<=10){
		bloque[1] = 0;
	}else{
		bloque[1] = consumo - 10;
	}

	
	if(consumo > 40){
		bloque[2] = 20;
	}else if(consumo <= 20){
		bloque[2] = 0;
	}else{
		bloque[2] = consumo - 20;
	}
	

	if(consumo > 80){
		bloque[3] = 40;
	}else if(consumo <= 40){
		bloque[3] = 0;
	}else{
		bloque[3] = consumo - 40;
	}
	



	if(consumo <= 80){
		bloque[4] = 0;
	}else if(consumo > 120){
		bloque[4] = 40;
	}else if(consumo <= 40){
		bloque[4] = 0;
	}else{
		bloque[4] = consumo - 40;
	}
	



	if(consumo < 120){
		bloque[5] = 0;
	}else{
		bloque[5] = consumo - 120 ;
	}







	return bloque;
}







SimuladorFactura.prototype.rellenarBloquesCanon = function(consumo){

	var bloque = new Array(5);

	if(consumo <= 12){ 
		bloque[0] = consumo
	}else{
		bloque[0] = 12;
	}


	if(consumo > 20){
		bloque[1] = 8;
	}else if(consumo<=12){
		bloque[1] = 0;
	}else{
		bloque[1] = consumo - 12;
	}

	
	if(consumo > 40){
		bloque[2] = 20;
	}else if(consumo <= 20){
		bloque[2] = 0;
	}else{
		bloque[2] = consumo - 20;
	}
	

	if(consumo > 80){
		bloque[3] = 40;
	}else if(consumo <= 40){
		bloque[3] = 0;
	}else{
		bloque[3] = consumo - 40;
	}
	

	if(consumo < 80){
		bloque[4] = 0;
	}else{
		bloque[4] = consumo - 80;
	}


	return bloque;
}









SimuladorFactura.prototype.rellenarBloquesRSU = function(consumo){
	var bloque = 0;

	if(consumo <= 20){
		bloque = 0;
	}else{
		bloque = consumo;
	}

	return bloque;
}












// Fin Rellenar bloques



























































//calcularCuotaVariable y calcularSubTotal sepueden usar en el resto de calculos



SimuladorFactura.prototype.calcularCuotaVariable = function(bloque, tipo){
	var cuotaVariable;

	if (tipo == "agua"){
		cuotaVariable = new Array(bloque.length);

		for (i = 0; i < bloque.length; i++){
			cuotaVariable[i] = bloque[i] * this.precioAgua[i];
		}
	}else if(tipo == "alcantarillado"){
		cuotaVariable = new Array(bloque.length);

		for (i = 0; i < bloque.length; i++){
			cuotaVariable[i] = bloque[i] * this.precioAlcantarillado[i];
		}
	}else if(tipo == "canon"){
		cuotaVariable = new Array(bloque.length);

		for (i = 0; i < bloque.length; i++){
			cuotaVariable[i] = bloque[i] * this.precioCanon[i];
		}
	}else{
		cuotaVariable = bloque * this.precioRSU;
	}


	return cuotaVariable;

}








SimuladorFactura.prototype.calcularSubTotal = function(cuotaVariable){

	var subTotal = 0.0;

	for (i = 0; i < cuotaVariable.length; i++){
		subTotal += cuotaVariable[i];
	}


	return subTotal;

}










































