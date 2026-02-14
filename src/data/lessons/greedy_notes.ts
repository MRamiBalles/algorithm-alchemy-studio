export const greedyNotes = `
# Problema de Asignación Cuadrática (QAP)

El **QAP** (*Quadratic Assignment Problem*) es uno de los problemas más difíciles de la optimización combinatoria (NP-Hard).

## Definición Formal

Dados **$n$** instalaciones y **$n$** localizaciones, con:
*   $F_{ij}$: Flujo de material entre la instalación $i$ y la instalación $j$.
*   $D_{kl}$: Distancia entre la localización $k$ y la localización $l$.

El objetivo es encontrar una permutación $\pi$ que minimice el coste total:

$$
\min_{\pi \in S_n} \sum_{i=1}^{n} \sum_{j=1}^{n} F_{ij} \cdot D_{\pi(i)\pi(j)}
$$

---

# Algoritmo Goloso (Greedy)

Los algoritmos constructivos generan una solución desde cero, tomando decisiones miopes (locales) en cada paso. Para el QAP, una heurística efectiva se basa en **Potenciales**.

## Concepto de Potencial

La intuición es simple:
> "Las instalaciones con **mucho flujo** deben estar en las localizaciones **más céntricas** (menor distancia total a otras)."

### 1. Potencial de Flujo ($P_i^{flow}$)
Suma del flujo que sale/entra de la instalación $i$:
$$ P_i^{flow} = \sum_{j=1}^{n} (F_{ij} + F_{ji}) $$

### 2. Potencial de Distancia ($P_k^{dist}$)
Suma de las distancias desde la localización $k$ a todas las demás:
$$ P_k^{dist} = \sum_{l=1}^{n} (D_{kl} + D_{lk}) $$

## Procedimiento

1.  Calcular el vector de **Potenciales de Flujo** para todas las unidades.
2.  Calcular el vector de **Potenciales de Distancia** para todas las localizaciones.
3.  Ordenar las **Unidades** de mayor a menor flujo ($P^{flow} \downarrow$).
4.  Ordenar las **Localizaciones** de menor a mayor distancia ($P^{dist} \uparrow$).
5.  Asignar la unidad $i$-ésima ordenada a la localización $i$-ésima ordenada.

$$
\pi(\text{Unidad}_i) = \text{Localización}_i
$$

## Complejidad
Este algoritmo es extremadamente rápido: **$O(n^2)$** para calcular potenciales y **$O(n \log n)$** para ordenar.
`;
