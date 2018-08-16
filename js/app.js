var calculadora = {};


calculadora = (function(){
	// Inicialización de propiedades
	var boton = new Array()
	var botonID = new Array()

	var numberProv = "";
	var numberOne = "";
	var numberTwo = "";
	var OpPend = "no";
	var lastOperation = "";
	var resultado = "";
	var displayNumber = "";
	var loadCounter = 0;

	load()
	// Definición de métodos privados
	function load(){
		//Lectura de botones al inicializar el DOM
		boton = document.querySelectorAll("img");
		for (var i = 0; i < boton.length; i++) {
			botonID[i] = boton[i].getAttribute("id")
			adds(i)
			addsMouse(i)
		}
	}

	function adds(i){
		boton[i].addEventListener("click",function(){clickButton(i)},false)
	}

	function solve(operador){
		if (OpPend != "no") {
			numberTwo = document.getElementById('display').innerHTML
			getRes = numberOne+OpPend+numberTwo
			resultado = eval(getRes)
			if (toString(resultado).length > 8) {
				resultado = resultado.toFixed(7)
			}
			document.getElementById('display').innerHTML = resultado
			numberProv = ""
			OpPend = operador
			numberOne = resultado
		} else {
			numberOne = numberProv
			OpPend = operador
			numberProv = ""
		}
	}

	function clickButton(buttonClicked){
		switch(botonID[buttonClicked]){
			//Case on
			case "on":
				document.getElementById("display").innerHTML = 0;
				OpPend = "no"
				break

			//Case mas
			case "mas":
				displayNumber = ""
				solve("+")
				document.getElementById("display").innerHTML = "";
				break

			//Case menos
			case "menos":
				solve("-")
				document.getElementById("display").innerHTML = "";
				break

			//Case por
			case "por":
				solve("*")
				document.getElementById("display").innerHTML = "";
				break

			//Case Dividido
			case "dividido":
				solve("/")
				document.getElementById("display").innerHTML = "";
				break

			//Case Signo
			case "sign":
				document.getElementById("display").innerHTML = document.getElementById("display").innerHTML * -1
				numberProv = numberProv * -1
				break

			//Case raiz
			case "raiz":
				break

			//Case  igual
			case "igual":
				if (OpPend != "no") {
					numberTwo = document.getElementById('display').innerHTML
					resultado = eval(numberOne+OpPend+numberTwo)
					lastOperation = OpPend
					parteEntera = Math.trunc(resultado)
					parteDecimal = resultado - parteEntera
					if (parteDecimal > 0) {
						if (parteEntera < 10) {
							resultado = resultado.toFixed(7)
						} else if (parteEntera >= 10 && parteEntera < 100) {
							resultado = resultado.toFixed(6)
						} else if(parteEntera >= 100 && parteEntera < 1000) {
							resultado = resultado.toFixed(5)
						} else if(parteEntera >= 1000) {
							resultado = resultado.toFixed(2)
						}
					}
					OpPend = "no"
					document.getElementById('display').innerHTML = parseFloat(resultado)
					numberProv = ""
				} else{ //Acá se ejecuta cuando se presiona varias veces el signo igual
					numberOne = resultado
					displayNumber = ""
					resultado = eval(numberOne+lastOperation+numberTwo)
					console.log(lastOperation)
					parteEntera = Math.trunc(resultado)
					parteDecimal = resultado - parteEntera
					if (parteDecimal > 0) {
						if (parteEntera < 10) {
							resultado = resultado.toFixed(7)
						} else if (parteEntera >= 10 && parteEntera < 100) {
							resultado = resultado.toFixed(6)
						} else if(parteEntera >= 100 && parteEntera < 1000) {
							resultado = resultado.toFixed(5)
						} else if(parteEntera >= 1000) {
							resultado = resultado.toFixed(2)
						}
					}
					OpPend = "no"
					document.getElementById('display').innerHTML = parseFloat(resultado)
					numberProv = ""
				}
				break

			//Case Punto
			case "punto":
				var counterPoint = 0
				displayNumber = document.getElementById('display').innerHTML
				for (var i = 0; i < displayNumber.length; i++) {
					if(displayNumber[i] == "."){counterPoint += 1}
				}
				if (counterPoint == 0) {
					document.getElementById('display').innerHTML = displayNumber + "."
				}
				break
			
			//Case default
			default:
				if (loadCounter == 0 || numberProv == "") {
					displayNumber = ""
					loadCounter = 1
				}else{
					displayNumber = document.getElementById('display').innerHTML
				}
				if (displayNumber.length < 8) {
					if (displayNumber == "0") {
						document.getElementById('display').innerHTML = botonID[buttonClicked]
						numberProv = botonID[buttonClicked]
					}else{
						document.getElementById('display').innerHTML = displayNumber + botonID[buttonClicked]
						numberProv = displayNumber + botonID[buttonClicked]		
					}
				}
				break
		}
	}

	//Funciones para modificar tamaño de botón cuando es presionado
	function addsMouse(i){
		 boton[i].onmousedown = function(){
		 		document.getElementById(botonID[i]).style.paddingLeft = "0.5%"
		 		document.getElementById(botonID[i]).style.paddingRight = "0.5%"
		 		document.getElementById(botonID[i]).style.paddingTop = "0.5%"
		 		document.getElementById(botonID[i]).style.paddingBottom = "0.5%"
		}
		 boton[i].onmouseup = function(){
		 		document.getElementById(botonID[i]).style.padding = "0"
		 		document.getElementById(botonID[i]).style.paddingRight = "0"
		 		document.getElementById(botonID[i]).style.paddingTop = "0"
		 		document.getElementById(botonID[i]).style.paddingBottom = "0"	 	
		}
	}

}());