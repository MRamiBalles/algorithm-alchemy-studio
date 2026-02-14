export const lsNotes = `
# Tema 1.2: Búsqueda Local

> **Objetivo de la Unidad:** Entender los fundamentos de las trayectorias en espacios de búsqueda y las estrategias de mejora iterativa.

## 1. Conceptos Fundamentales

La Búsqueda Local (LS) es una metaheurística de trayectoria que parte de una solución inicial y se mueve iterativamente a soluciones vecinas mejores hasta alcanzar un **óptimo local**.

### Definiciones Clave

*   **Espacio de Búsqueda ($S$):** El conjunto de todas las posibles permutaciones (soluciones factibles). Para QAP, $|S| = n!$.
*   **Vecindad ($N(s)$):** Subconjunto de soluciones obtenibles aplicando un "movimiento" simple a la solución actual $s$.
*   **Óptimo Local:** Una solución $s^*$ es un óptimo local si no existe ninguna solución $s' \in N(s^*)$ tal que $f(s') < f(s^*)$.

---

## 2. Estructura de Vecindad en QAP

Para problemas de permutación como el QAP, el movimiento más común es el **intercambio 2-opt** (swap).

$$
N(s) = \{ s' \mid s' \text{ se obtiene intercambiando las posiciones de las instalaciones } i \text{ y } j \text{ en } s \}
$$

El tamaño de esta vecindad es cuadrático: $|N(s)| = \frac{n(n-1)}{2}$.

### Evaluación Delta ($\Delta$)

Calcular la función objetivo completa $O(n^2)$ para cada vecino es ineficiente. Usamos la **evaluación incremental**:

$$
\Delta(s, i, j) = f(s') - f(s)
$$

Debido a la estructura del QAP, el cambio de coste solo afecta a los arcos conectados a $i$ y $j$, permitiendo un cálculo en **$O(n)$**.

---

## 3. Estrategias de Movimiento

Existen dos estrategias principales para explorar la vecindad:

| Estrategia | Descripción | Ventajas/Desventajas |
| :--- | :--- | :--- |
| **El Primer Mejor** (First Improvement) | Acepta el *primer* vecino que mejore la solución actual. | ✅ Más rápido por iteración.<br>❌ Puede converger a óptimos locales de peor calidad. |
| **El Mejor Vecino** (Best Improvement) | Evalúa *toda* la vecindad y elige el que ofrece la mayor reducción de coste. | ✅ Sigue el gradiente más pronunciado.<br>❌ Lento si $n$ es grande. |

---

## Referencias Bibliográficas

*   **Departamento de Tecnologías de la Información, Universidad de Huelva.** *Metaheurísticas Bioinspiradas e Híbridas: Tema 1.2 Búsqueda Local*. V2024.
*   **Aarts, E., & Lenstra, J. K.** (2003). *Local search in combinatorial optimization*. Princeton University Press.
`;
