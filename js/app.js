(function() {
  var Calculadora = {
    ultimaOperacion:'',
    ultimaValorIngresado:0,
    cadena:'',

    init:function(){
      console.log("Inicializando objeto Calculadora => " + Calculadora);
      Calculadora.ligarTeclaUpDown()
    },

    ligarTeclaUpDown:function(){
      var teclas = document.getElementsByClassName("tecla")
      for (var i = 0; i < teclas.length; i++) {
        teclas[i].addEventListener('mousedown', function(event){
          event.preventDefault()
          event.stopPropagation()
          Calculadora.presionaTecla(this)
        })
        teclas[i].addEventListener('mouseup', function(event){
          event.preventDefault()
          event.stopPropagation()
          Calculadora.sueltaTecla(this)
        })
      }
    },

    restar:function(valor1, valor2){
      return valor1 - valor2
    },

    sumar:function(valor1, valor2){
      return parseFloat(valor1) + parseFloat(valor2)
    },

    multiplicar:function(valor1, valor2){
      return valor1 * valor2
    },

    dividir:function(valor1, valor2){
      return valor1 / valor2
    },

    limpiar:function(){
      document.getElementById('display').innerHTML = '0'
      Calculadora.cadena=''
      Calculadora.ultimaOperacion=''
      Calculadora.ultimaValorIngresado=0
    },

    presionaTecla:function(objeto){
      switch (objeto.id) {
        case '0':
        case '1':
        case '2':
        case '3':
        case 'punto':
        case 'igual':
          objeto.style.width = '27%'
          objeto.style.height = '60.91px'
          break;
        case 'mas':
            objeto.style.width = '88%'
            objeto.style.height = '98%'
            break;
        default:
          objeto.style.width = '20%'
          objeto.style.height = '60.91px'
          break;
      }

      var cantidad = document.getElementById('display').innerHTML
      switch (objeto.id) {
        case '0':
          if (cantidad != '0' && cantidad.length < 8) {
            document.getElementById('display').innerHTML += objeto.id
          }
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          if (cantidad.length == 1 && cantidad == '0') {
            document.getElementById('display').innerHTML = objeto.id
          }
          else {
            if (cantidad.length < 8){
              document.getElementById('display').innerHTML += objeto.id
            }else{
              document.getElementById('display').innerHTML = cantidad
            }
          }
          break;
        case 'punto':
          if (cantidad.indexOf('.') == -1 && cantidad.length < 8) {
            document.getElementById('display').innerHTML += '.'
          }
          break;
        case 'igual':
          ultimoValor = document.getElementById('display').innerHTML

          if (Calculadora.ultimaValorIngresado == "") {
            Calculadora.ultimaValorIngresado = ultimoValor
          }

          if (Calculadora.cadena == "") {
            Calculadora.cadena = ultimoValor + Calculadora.ultimaOperacion + Calculadora.ultimaValorIngresado
          }else {
            Calculadora.cadena += ultimoValor
          }

          var operaciones = Calculadora.cadena.split(' ')

          var resultado = operaciones[0]

          for(var i = 0; i < operaciones.length; i = i + 2){
            switch (operaciones[i + 1]) {
              case '+':
                resultado = Calculadora.sumar(resultado, operaciones[i + 2])
                break;
              case '-':
                resultado = Calculadora.restar(resultado, operaciones[i + 2])
                break;
              case '*':
                resultado = Calculadora.multiplicar(resultado, operaciones[i + 2])
                break;
              case '/':
                resultado = Calculadora.dividir(resultado, operaciones[i + 2])
                break;
              default:
                break;
            }
          }

          if (resultado.toString().length > 8){
            document.getElementById('display').innerHTML = resultado.toString().substr(0, 8)
          }else{
            document.getElementById('display').innerHTML = resultado.toString()
          }

          Calculadora.cadena = ''
          break;
        case 'sign':
          if (cantidad.indexOf('-') == -1 && cantidad != '0' && cantidad.length < 8) {
            document.getElementById('display').innerHTML = '-' + document.getElementById('display').innerHTML
          } else if (cantidad.indexOf('-') != -1) {
            document.getElementById('display').innerHTML = document.getElementById('display').innerHTML.substr(1)
          }
          break;
        case 'mas':
          Calculadora.cadena += document.getElementById('display').innerHTML + ' + '
          Calculadora.ultimaOperacion = ' + '
          document.getElementById('display').innerHTML = ''
          break;
        case 'menos':
          Calculadora.cadena += document.getElementById('display').innerHTML + ' - '
          Calculadora.ultimaOperacion = ' - '
          document.getElementById('display').innerHTML = ''
          break;
        case 'por':
          Calculadora.cadena += document.getElementById('display').innerHTML + ' * '
          Calculadora.ultimaOperacion = ' * '
          document.getElementById('display').innerHTML = ''
          break;
        case 'dividido':
          Calculadora.cadena += document.getElementById('display').innerHTML + ' / '
          Calculadora.ultimaOperacion = ' / '
          document.getElementById('display').innerHTML = ''
          break;
        case 'on':
          Calculadora.limpiar()
          break;
        default:
          break;
      }
    },

    sueltaTecla:function(objeto){
      switch (objeto.id) {
        case '0':
        case '1':
        case '2':
        case '3':
        case 'punto':
        case 'igual':
          objeto.style.width = '29%'
          objeto.style.height = '62.91px'
          break;
        case 'mas':
            objeto.style.width = '90%'
            objeto.style.height = '100%'
            break;
        default:
          objeto.style.width = '22%'
          objeto.style.height = '62.91px'
          break;
      }
    }
  }

  Calculadora.init()
})();
