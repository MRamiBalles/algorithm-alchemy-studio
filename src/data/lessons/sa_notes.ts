export const saNotes = `
# Tema 1.3: Enfriamiento Simulado

> **Objetivo de la Unidad:** Comprender cómo las metaheurísticas pueden escapar de óptimos locales aceptando movimientos de empeoramiento controlados por la temperatura.

## 1. Analogía Física

El Enfriamiento Simulado (*Simulated Annealing*, SA) se inspira en el proceso de recocido de materiales. En metalurgia:
1.  Se calienta el material a alta temperatura (átomos se mueven libremente).
2.  Se enfría lentamente para que los átomos encuentren una estructura cristalina de **mínima energía**.

En optimización:
*   **Energía** $\equiv$ Función de Coste ($f(s)$).
*   **Temperatura ($T$)** $\equiv$ Parámetro de control de aleatoriedad.
*   **Estado** $\equiv$ Solución factible.

---

## 2. Criterio de Metropolis

La clave del SA es que acepta movimientos que **empeoran** la solución con una probabilidad $P$, evitando quedar atrapado en óptimos locales.

Sea $\Delta = f(s') - f(s)$ el cambio de coste. La probabilidad de aceptar $s'$ es:

$$
P(\text{accept}) = 
\begin{cases} 
1 & \text{si } \Delta < 0 \text{ (Mejora)} \\
e^{-\Delta / T} & \text{si } \Delta \ge 0 \text{ (Empeora)}
\end{cases}
$$

*   Si $T$ es alta, $P \approx 1$ (Acepta casi todo, exploración).
*   Si $T \to 0$, $P \to 0$ (Solo acepta mejoras, explotación).

---

## 3. Esquemas de Enfriamiento

El descenso de la temperatura determina la convergencia.

### Esquema Geométrico
$$ T_{k+1} = \alpha \cdot T_k $$
Donde $\alpha \in [0.8, 0.99]$. Es lento pero seguro.

### Esquema de Cauchy (Usado en Práctica)
$$ T_k = \frac{T_0}{1 + k} $$
Permite saltos largos ocasionales incluso en fases avanzadas.

---

## Referencias Bibliográficas

*   **Departamento de Tecnologías de la Información, Universidad de Huelva.** *Metaheurísticas Bioinspiradas e Híbridas: Tema 1.3 Enfriamiento Simulado*. V2024.
*   **Kirkpatrick, S., Gelatt, C. D., & Vecchi, M. P.** (1983). *Optimization by simulated annealing*. Science, 220(4598), 671-680.
`;
