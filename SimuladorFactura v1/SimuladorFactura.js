


function calcularSimulacion(){

	var consumo = parseFloat(document.getElementById("consumo").value);

	var simulacion = new SimuladorFactura(consumo);

	alert(simulacion.calcular());

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


}



SimuladorFactura.prototype.calcular = function(){





	var totalAgua = this.calcularAgua(this.consumo);

	//mostrar(totalAgua.toFixed(2));


	/*return {
		agua: totalAgua,
		alcan: totalAlcan
	}

	total.agua*/



	return totalAgua.toFixed(2);
}












SimuladorFactura.prototype.calcularAgua = function(consumo){
	var bloque = this.rellenarBloquesAgua(consumo);

	var cuotaVariable = this.calcularCuotaVariable(bloque);


	var subTotal = this.calcularSubTotal(cuotaVariable);


	var totalAgua = subTotal + this.cuotaFijaAgua + this.mantenimientoAgua;



	return totalAgua;


}









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






//calcularCuotaVariable y calcularSubTotal sepueden usar en el resto de calculos



SimuladorFactura.prototype.calcularCuotaVariable = function(bloque){

	var cuotaVariable = new Array(bloque.length);

	for (i = 0; i < bloque.length; i++){
		cuotaVariable[i] = bloque[i] * this.precioAgua[i];
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










































