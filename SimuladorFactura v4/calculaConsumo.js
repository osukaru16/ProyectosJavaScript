//array
//var bloque = [0,0,0,0,0,0];


// constantes arrays
const precioAgua = [0.6, 0.84, 1.38, 3.09, 5.76];

const precioAlcantarillado = [0.1928, 0.2834, 0.4724, 1.0218, 1.8702, 2.9884];

const precioCanon = [ 0.285924, 0.428835,  0.571848,   1.143696,  1.714516];


//constantes


const mantenimientoAgua = 3.89;

const cuotaFijaAgua = 9.1894;

const cuotaFijaAlcantarillado = 1.7906;

const cuotaFijaRSU = 13.91;

const cuotaFijaCanon = 8;


const precioRSU = 0.1236;


//variables

var consumo = 0.0;



function calcular(){

	consumo = parseFloat(document.getElementById("consumo").value);

	var totalAgua = calcularAgua(consumo);

	mostrar(totalAgua.toFixed(2));


	/*return {
		agua: totalAgua,
		alcan: totalAlcan
	}

	total.agua*/


}




function calcularAgua(consumo){
	var bloque = rellenarBloques(consumo);

	var cuotaVariable = calcularCuotaVariable(bloque);


	var subTotal = calcularSubTotal(cuotaVariable);


	var totalAgua = subTotal + cuotaFijaAgua + mantenimientoAgua;



	

	//alert(subTotal);



	return totalAgua;


}


function rellenarBloques(consumo){

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




function calcularCuotaVariable(bloque){

	var cuotaVariable = new Array(bloque.length);

	for (i = 0; i < bloque.length; i++){
		cuotaVariable[i] = bloque[i] * precioAgua[i];
	}

	return cuotaVariable;

}






function calcularSubTotal(cuotaVariable){

	var subTotal = 0.0;

	for (i = 0; i < cuotaVariable.length; i++){
		subTotal += cuotaVariable[i];
	}


	return subTotal;

}



















function mostrar(dato){
	// Hay que hacer que cree elementos html para mostrar la infimacion;

	alert(dato);
}

