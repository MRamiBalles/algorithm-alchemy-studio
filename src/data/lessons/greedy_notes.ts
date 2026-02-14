export const greedyNotes = `
# Tema 1.1: Introducción y Algoritmos Constructivos

> **Objetivo de la Unidad:** Comprender la formulación matemática del Problema de Asignación Cuadrática (QAP) y la aplicación de heurísticas constructivas basadas en potenciales.

## 1. El Problema de Asignación Cuadrática (QAP)

El QAP, introducido porKoopmans y Beckmann (1957), modela la asignación de **$n$** instalaciones a **$n$** localizaciones con el objetivo de minimizar el coste de transporte total, que depende del flujo de materiales y la distancia entre ubicaciones.

### Definición Formal

Sea $n$ el número de instalaciones y localizaciones. Se definen las matrices:
*   $F = [f_{ij}]$: Matriz de **Flujo** (cantidad de material entre la instalación $i$ y la $j$).
*   $D = [d_{kl}]$: Matriz de **Distancia** (distancia entre la localización $k$ y la $l$).

Buscamos una permutación $\pi: \{1,..,n\} \to \{1,..,n\}$ que minimice:

$$
\min_{\pi \in S_n} \sum_{i=1}^{n} \sum_{j=1}^{n} f_{ij} \cdot d_{\pi(i)\pi(j)}
$$

---

## 2. Heurística Golosa (Greedy)

Los algoritmos constructivos generan una solución paso a paso, tomando la mejor decisión local en cada iteración sin "mirar atrás". Para el QAP, utilizamos la **Estrategia de Potenciales**.

### Hipótesis Heurística
> "Las instalaciones con mayor interacción (flujo) deberían situarse en las localizaciones más centrales (menor distancia agregada)."

### Cálculo de Potenciales

Para formalizar esta intuición, definimos dos vectores:

1.  **Potencial de Flujo ($P_i^{flow}$):** Suma del flujo total asociado a la instalación $i$.
    $$ P_i^{flow} = \sum_{j=1}^{n} (f_{ij} + f_{ji}) $$

2.  **Potencial de Distancia ($P_k^{dist}$):** Suma de las distancias desde la localización $k$ a todas las demás.
    $$ P_k^{dist} = \sum_{l=1}^{n} (d_{kl} + d_{lk}) $$

### Algoritmo Paso a Paso

1.  **Calcular** $P^{flow}$ para todas las instalaciones ($i=1..n$).
2.  **Calcular** $P^{dist}$ para todas las localizaciones ($k=1..n$).
3.  **Ordenar** las instalaciones de tal forma que $P^{flow}_{(1)} \ge P^{flow}_{(2)} \ge ... \ge P^{flow}_{(n)}$.
4.  **Ordenar** las localizaciones de tal forma que $P^{dist}_{(1)} \le P^{dist}_{(2)} \le ... \le P^{dist}_{(n)}$.
5.  **Asignar** la instalación con el $k$-ésimo mayor flujo a la localización con la $k$-ésima menor distancia.

$$
\pi(\text{Instalación}_k) = \text{Localización}_k
$$

---

### Referencias Bibliográficas
*   **Departamento de Tecnologías de la Información, Universidad de Huelva.** *Metaheurísticas Bioinspiradas e Híbridas: Tema 1.1 Introducción*. V2024.
*   **Taillard, E. D.** (1991). *Robust taboo search for the quadratic assignment problem*. Parallel Computing, 17(4-5), 443-455.
`;
