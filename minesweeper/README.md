# Mines Weeper

## Descripción General

El juego "Buscaminas" es un puzzle que se juega en una cuadrícula. El objetivo es descubrir todas las celdas que no contienen minas sin activar ninguna mina. Las minas están distribuidas aleatoriamente en la cuadrícula.

## Jugabilidad

- Inicio del Juego: El jugador empieza con una cuadrícula cubierta, donde el número de minas es predeterminado y se distribuyen aleatoriamente.
- Clic Izquierdo: Revela lo que se oculta bajo una celda no descubierta. Si se revela una mina, el jugador pierde la partida.

- Clic Derecho: Coloca o quita una bandera en una celda no descubierta para marcar potenciales minas.

- Contador de Minas: Un contador que mantiene el número de minas marcadas y el total de minas.
  Implementación en JavaScript

- Cronometro para rastrear cuánto tiempo toma resolver el juego

## Reglas

- Si la celda clicada no tiene una mina y tiene minas en celdas adyacentes, se muestra el número de minas en las celdas vecinas.

- Si la celda clicada no tiene minas adyacentes, se revela automáticamente un área hasta que se encuentren celdas con números.

- Si el jugador revela todas las celdas que no contienen minas, **gana**.

- Si el jugador hace clic en una celda que contiene una mina, **pierde**.
  Estructura de Datos

- Celdas: Cada celda puede tener los siguientes estados:
  **Cubierta**
  **Descubierta**
  **Marcada con bandera**
