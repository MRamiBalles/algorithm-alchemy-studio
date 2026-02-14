export const tabuNotes = `
# Tema 1.4: Búsqueda Tabú

> **Objetivo de la Unidad:** Dominar el uso de **memoria** para guiar la búsqueda y evitar ciclos y óptimos locales.

## 1. Memoria a Corto Plazo (Lista Tabú)

La Búsqueda Tabú (Glover, 1986) mejora la Búsqueda Local prohibiendo (declarando "tabú") volver a visitar soluciones recientes o realizar movimientos inversos.

### Tenencia Tabú (*Tabu Tenure*)
El número de iteraciones que un movimiento permanece prohibido se llama **Tenencia ($T$)**.
*   Si $T$ es pequeño: Posible ciclado.
*   Si $T$ es muy grande: Restringe demasiado la búsqueda.

Para QAP con $n$ instalaciones, una tenencia robusta suele ser $T \approx n/2$ o dinámica en $[n/2, 3n/2]$.

---

## 2. Criterio de Aspiración

Una regla Tabú puede ser demasiado estricta y prohibir una solución excelente. El **Criterio de Aspiración** permite ignorar el estatus tabú si:
> "La solución resultante es mejor que la mejor solución encontrada hasta el momento globalmente."

---

## 3. Intensificación y Diversificación

El algoritmo balancea dos fuerzas mediante memoria a largo plazo:

### Intensificación (Explotación)
Centrarse en regiones prometedoras.
*   **Estrategia:** Reiniciar la búsqueda desde las mejores soluciones encontradas si se estanca.

### Diversificación (Exploración)
Explorar regiones no visitadas.
*   **Matriz de Frecuencias:** Contamos cuántas veces la instalación $i$ ha sido asignada a la localización $j$.
*   **Penalización:** Al evaluar movimientos, penalizamos aquellos que llevan a configuraciones con alta frecuencia (muy repetidas).
    $$ f'(s) = f(s) + \lambda \cdot \text{Frecuencia}(s) $$

---

## Referencias Bibliográficas

*   **Departamento de Tecnologías de la Información, Universidad de Huelva.** *Metaheurísticas Bioinspiradas e Híbridas: Tema 1.4 Búsqueda Tabú*. V2024.
*   **Glover, F.** (1989). *Tabu Search - Part I*. ORSA Journal on Computing, 1(3), 190-206.
`;
