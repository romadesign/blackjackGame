## Nombre del proyecto: Juego de Blackjack

* Objetivos: 
. Desarrollar un juego de blackjack completamente funcional que permita a los usuarios jugar contra la computadora.


* Características técnicas:

. El juego estará programado en el lenguaje de programación Javascript
. Se utilizará la biblioteca de Bootstrap para estilos personalizados
. Se utilizará una estructura de datos para representar las cartas y la baraja.
. Se utilizarán condicionales y bucles para implementar las reglas del blackjack.
. Se utilizarán funciones para organizar y modularizar el código en diferentes archivos.
. Se utilizara el guardado de datos en el navegador "LocalStorage" 

* Requisitos
Interfaz de usuario: Debe haber una interfaz de usuario atractiva y fácil de usar que muestre las cartas y permita al usuario interactuar con el juego.
Baraja de cartas: Debe haber una baraja de cartas que se pueda utilizar para jugar el juego. Esta baraja debe estar ordenada aleatoriamente y mezclada antes de cada partida.
Reglas del juego: El juego debe seguir las reglas estándar del blackjack. El jugador y el crupier deben recibir dos cartas cada uno, con el objetivo de llegar a 21 puntos.
Apuestas: El jugador debe poder apostar antes de que se repartan las cartas.
Ganador: Debe haber un sistema para determinar quién gana la partida. Si el jugador tiene una mano con un valor total de 21 puntos o menos y la mano del crupier supera los 21 puntos, el jugador gana automáticamente. De lo contrario, la mano con el valor total más cercano a 21 gana.
Historial de partidas: Debe haber una forma de almacenar el historial de las partidas jugadas, incluyendo las apuestas y los resultados.
Animaciones: Debe haber animaciones que muestren el movimiento de las cartas y las acciones del juego, lo que puede mejorar la experiencia del usuario.
Sonidos: Opcionalmente, puedes agregar efectos de sonido para mejorar la experiencia del usuario.
Responsividad: La interfaz de usuario debe ser responsiva y adaptable a diferentes dispositivos y tamaños de pantalla.


* Diagrama de flujo

Inicio

- Repartir dos cartas a la computadora y al jugador
- Mostrar las cartas del jugador y la primera carta de la computadora

- Si el jugador tiene 21 puntos:
  Mostrar mensaje de blackjack y terminar la partida
- Sino:
  Si la carta visible de la computadora es un as:
    Preguntar al jugador si quiere comprar un seguro
    Si el jugador compra un seguro:
      Comprobar si la computadora tiene blackjack
      Si la computadora tiene blackjack:
        Pagar la apuesta del seguro y terminar la partida
      Sino:
        Continuar la partida normalmente
  Si la carta visible de la computadora es un 10, J, Q o K:
    Comprobar si la computadora tiene blackjack
    Si la computadora tiene blackjack:
      Pagar la apuesta de la computadora y terminar la partida
    Sino:
      Continuar la partida normalmente
  Si el jugador no tiene blackjack:
    Preguntar al jugador si quiere pedir otra carta
    Si el jugador pide otra carta:
      Repartir otra carta al jugador
      Si el jugador tiene más de 21 puntos:
        Mostrar mensaje de derrota y terminar la partida
      Sino:
        Continuar la partida normalmente
    Si el jugador no pide otra carta:
      Jugar automáticamente la mano de la computadora
      Si la computadora tiene más de 21 puntos:
        Mostrar mensaje de victoria y pagar la apuesta del jugador
      Sino:
        Comparar las manos del jugador y la computadora
        Si el jugador tiene una mano mejor:
          Mostrar mensaje de victoria y pagar la apuesta del jugador
        Si la computadora tiene una mano mejor:
          Mostrar mensaje de derrota y pagar la apuesta de la computadora
        Si las manos son iguales:
          Mostrar mensaje de empate y devolver la apuesta del jugador

Fin