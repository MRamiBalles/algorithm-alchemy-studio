# Algorithm Academy Studio (MBHB 2025)

Bienvenido al entorno de aprendizaje híbrido para la asignatura **Modelos Bioinspirados y Heurísticas de Búsqueda**. Este proyecto combina teoría en video, documentación oficial y laboratorios interactivos.

## 🚀 Inicio Rápido

### 1. Aplicación Web (React/Vite)
La interfaz visual para ver los videos, ejecutar comparativas gráficas y consultar la documentación.

```bash
# Instalar dependencias
npm install

# Arrancar servidor de desarrollo
npm run dev
```
Accede a `http://localhost:8080` (o el puerto que indique la consola).

### 2. Práctica 1: Algoritmos de Trayectoria (Python)
Script oficial para generar las tablas de resultados de la Práctica 1 (Greedy, Búsqueda Local, Enfriamiento Simulado, Tabú).

**Requisitos:** Python 3.x, NumPy.

```bash
# Instalar numpy si no lo tienes
pip install numpy

# Ejecutar el benchmark oficial
python practice_1_official.py
```

*Nota: Asegúrate de tener los ficheros `nug5.dat`, `tai25b.dat`, etc. en la raíz del proyecto.*

## 📂 Estructura del Proyecto

*   **`/src`**: Código fuente de la web (React components, páginas).
    *   `pages/Comparison.tsx`: La "Arena" de algoritmos.
    *   `lib/algorithms/`: Implementaciones en TypeScript de las heurísticas.
*   **`/public/content`**: Recursos estáticos (Videos mp4).
    *   `mbhb/docs`: PDFs oficiales de teoría y guiones de prácticas.
*   **`practice_1_official.py`**: Solución de referencia en Python para la Práctica 1.
*   **`practice_1_official.cpp`**: Solución de referencia en C++ (para compilar manualmente).

## 📚 Contenido del Curso (QAP)

| Unidad | Tema | Recurso |
| :--- | :--- | :--- |
| **1.1** | Greedy & Delta Eval. | Video + PDF + Lab |
| **1.2** | Búsqueda Local | Video + PDF + Lab |
| **1.3** | Enfriamiento Simulado | Video + PDF + Lab |
| **1.4** | Búsqueda Tabú | Video + PDF + Lab |
| **Arena** | Comparativa QAP | Web Tool (`/compare`) |

## 🛠️ Tecnologías
*   **Frontend:** React 18, TailwindCSS, Shadcn/ui, Recharts.
*   **Backend (Scripts):** Python 3.10+ (NumPy).
*   **Data:** QAPLIB Instances (Taillard).

---
*Desarrollado para el curso académico 2025.*
