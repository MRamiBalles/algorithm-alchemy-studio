import numpy as np
import math
import random
import copy
import time
import os

# Set seed for reproducibility and comparison with C++/TS
random.seed(42)
np.random.seed(42)

class QAPProblem:
    def __init__(self, file_path):
        self.n, self.flow, self.dist = self.read_qap_file(file_path)

    def read_qap_file(self, file_path):
        """Lee archivos estándar QAPLIB (n, Flujo, Distancia)"""
        with open(file_path, 'r') as f:
            content = f.read().split()
        
        iterator = iter(content)
        n = int(next(iterator))
        
        # Leer Matriz A (Flujo)
        flow = np.zeros((n, n))
        for i in range(n):
            for j in range(n):
                flow[i][j] = float(next(iterator))
                
        # Leer Matriz B (Distancia)
        dist = np.zeros((n, n))
        for i in range(n):
            for j in range(n):
                dist[i][j] = float(next(iterator))
                
        return n, flow, dist

    def evaluate(self, solution):
        """Calcula el coste total de una solución (permutación)"""
        cost = 0
        for i in range(self.n):
            for j in range(self.n):
                # f_ij * d_s(i)s(j)
                cost += self.flow[i][j] * self.dist[solution[i]][solution[j]]
        return cost

    def delta_evaluate(self, solution, r, s):
        """
        Calcula el cambio de coste al intercambiar r y s. 
        Optimización 'Delta Evaluation' para no recalcular todo.
        """
        delta = 0
        current_cost = 0
        new_cost = 0
        
        # Elementos afectados (filas y columnas r y s)
        for k in range(self.n):
            if k != r and k != s:
                # Coste actual asociado a r y s
                current_cost += self.flow[r][k] * self.dist[solution[r]][solution[k]]
                current_cost += self.flow[s][k] * self.dist[solution[s]][solution[k]]
                current_cost += self.flow[k][r] * self.dist[solution[k]][solution[r]]
                current_cost += self.flow[k][s] * self.dist[solution[k]][solution[s]]
                
                # Nuevo coste tras intercambio (simulado)
                new_cost += self.flow[r][k] * self.dist[solution[s]][solution[k]]
                new_cost += self.flow[s][k] * self.dist[solution[r]][solution[k]]
                new_cost += self.flow[k][r] * self.dist[solution[k]][solution[s]]
                new_cost += self.flow[k][s] * self.dist[solution[k]][solution[r]]
        
        delta = new_cost - current_cost
        return delta

# --- 1. Algoritmo Greedy (Constructivo) ---
def greedy_solver(problem):
    """
    Heurística: Unidades con mayor flujo van a localizaciones más céntricas (menor distancia).
    """
    # 1. Calcular Potenciales
    # Potencial Flujo: Suma de flujos de una unidad al resto
    flow_potential = np.sum(problem.flow, axis=1) 
    # Potencial Distancia: Suma de distancias de una loc al resto
    dist_potential = np.sum(problem.dist, axis=1)
    
    # 2. Ordenar
    # Unidades: de mayor flujo a menor (descendente)
    units_sorted = np.argsort(flow_potential)[::-1]
    # Localizaciones: de menor distancia a mayor (ascendente)
    locs_sorted = np.argsort(dist_potential)
    
    # 3. Asignar
    solution = [-1] * problem.n
    for i in range(problem.n):
        unit = units_sorted[i]
        loc = locs_sorted[i]
        # Fix logic: unit is the index in flow matrix, we assign it to loc
        # But solution array usually means: solution[i] is the location of unit i
        # The user code had 'solution[unit] = loc', which is correct for permutation
        solution[unit] = int(loc) 
        
    return solution, problem.evaluate(solution)

# --- 2. Búsqueda Local (El Mejor Vecino) ---
def local_search_best_improvement(problem, initial_sol):
    """
    Explora TODO el vecindario (2-opt) y elige el mejor movimiento.
    """
    current_sol = list(initial_sol)
    current_cost = problem.evaluate(current_sol)
    evaluations = 1
    
    while True:
        best_delta = 0
        best_move = None
        
        # Generar todo el vecindario (n * (n-1) / 2)
        for i in range(problem.n):
            for j in range(i + 1, problem.n):
                delta = problem.delta_evaluate(current_sol, i, j)
                evaluations += 1
                
                if delta < best_delta: # Buscamos minimizar
                    best_delta = delta
                    best_move = (i, j)
        
        # Si no hay mejora, hemos llegado a un Óptimo Local
        if best_move is None:
            break
            
        # Aplicar movimiento
        i, j = best_move
        current_sol[i], current_sol[j] = current_sol[j], current_sol[i]
        current_cost += best_delta
        
    return current_sol, current_cost, evaluations

# --- 3. Enfriamiento Simulado (Simulated Annealing) ---
def simulated_annealing(problem, initial_sol, mu=0.3, phi=0.3):
    """
    Implementación específica de la práctica.
    Esquema Cauchy: Tk = T0 / (1 + k)
    """
    current_sol = list(initial_sol)
    current_cost = problem.evaluate(current_sol)
    best_sol = list(current_sol)
    best_cost = current_cost
    
    # Cálculo de T0 según fórmula de la práctica
    # T0 = (mu / -math.log(phi)) * Coste_Inicial
    t0 = (mu / -math.log(phi)) * current_cost
    temp = t0
    
    max_iter = 50 * problem.n # Condición de parada
    evaluations = 1
    
    k = 0 # Contador de enfriamientos
    
    while k < max_iter:
        # Bucle interno (Cadena de Markov)
        # Parada: 5 aceptados o 40 generados
        accepted = 0
        generated = 0
        
        while generated < 40 and accepted < 5:
            # Generar vecino aleatorio (2-opt)
            i, j = random.sample(range(problem.n), 2)
            delta = problem.delta_evaluate(current_sol, i, j)
            generated += 1
            evaluations += 1
            
            # Criterio de Metrópolis
            # Si delta < 0 (mejora), se acepta siempre.
            # Si delta > 0 (empeora), se acepta con prob e^(-delta/T)
            is_accepted = False
            if delta < 0:
                is_accepted = True
            else:
                prob = math.exp(-delta / temp)
                if random.random() < prob:
                    is_accepted = True
            
            if is_accepted:
                # Aplicar movimiento
                current_sol[i], current_sol[j] = current_sol[j], current_sol[i]
                current_cost += delta
                accepted += 1
                
                # Actualizar mejor global
                if current_cost < best_cost:
                    best_cost = current_cost
                    best_sol = list(current_sol)
        
        # Esquema de Enfriamiento de Cauchy
        k += 1
        temp = t0 / (1 + k)
        
    return best_sol, best_cost, evaluations

# --- 4. Búsqueda Tabú (Simplificada) ---
def tabu_search(problem, initial_sol, tabu_tenure=5, max_iter=1000):
   
    current_sol = list(initial_sol)
    current_cost = problem.evaluate(current_sol)
    best_sol = list(current_sol)
    best_cost = current_cost
    
    # Matriz Tabú 
    tabu_matrix = np.zeros((problem.n, problem.n))
    evaluations = 1
    
    iteration = 0
    while iteration < max_iter:
        best_neighbor_delta = float('inf')
        best_move = None
        
        # Examinar 40 vecinos aleatorios 
        for _ in range(40):
            i, j = random.sample(range(problem.n), 2)
            u, v = min(i, j), max(i, j)
            
            delta = problem.delta_evaluate(current_sol, u, v)
            evaluations += 1
            
            is_tabu = tabu_matrix[u][v] > iteration
            
            if not is_tabu or (current_cost + delta < best_cost):
                if delta < best_neighbor_delta:
                    best_neighbor_delta = delta
                    best_move = (u, v)
        
        if best_move:
            u, v = best_move
            current_sol[u], current_sol[v] = current_sol[v], current_sol[u]
            current_cost += best_neighbor_delta
            
            tabu_matrix[u][v] = iteration + tabu_tenure
            
            if current_cost < best_cost:
                best_cost = current_cost
                best_sol = list(current_sol)
        
        iteration += 1
        
    return best_sol, best_cost, evaluations

if __name__ == "__main__":
    file_path = "nug5.dat" 
    
    try:
        qap = QAPProblem(file_path)
        print(f"Problema cargado. Tamaño N={qap.n}")

        greedy_sol, greedy_cost = greedy_solver(qap)
        print(f"\n--- Greedy ---")
        print(f"Coste: {greedy_cost}")
        print(f"Solución: {greedy_sol}")

        ls_sol, ls_cost, ls_evals = local_search_best_improvement(qap, greedy_sol)
        print(f"\n--- Búsqueda Local (Best Improvement) ---")
        print(f"Coste: {ls_cost}")
        print(f"Solución: {ls_sol}")

        sa_sol, sa_cost, sa_evals = simulated_annealing(qap, greedy_sol)
        print(f"\n--- Enfriamiento Simulado (Cauchy) ---")
        print(f"Coste: {sa_cost}")
        print(f"Solución: {sa_sol}")
        
        ts_sol, ts_cost, ts_evals = tabu_search(qap, greedy_sol)
        print(f"\n--- Búsqueda Tabú ---")
        print(f"Coste: {ts_cost}")
        print(f"Solución: {ts_sol}")

    except Exception as e:
        print(f"Error: {e}")
