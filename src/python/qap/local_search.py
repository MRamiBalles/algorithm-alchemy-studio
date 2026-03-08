import numpy as np
import random
from .utils import calculate_cost_numpy

def calculate_delta(i, j, solution, flow_matrix, dist_matrix):
    """
    Optimized calculation of the cost change (delta) when swapping facilities at positions i and j.
    Avoids full cost recalculation (O(n^2) -> O(n)).
    
    Args:
        i, j: Indices in the solution array to be swapped.
        solution: Current permutation.
        flow_matrix: n x n matrix of flows.
        dist_matrix: n x n matrix of distances.
    """
    n = len(solution)
    r_i = solution[i]
    r_j = solution[j]
    
    delta = 2 * (
        flow_matrix[i][i] * (dist_matrix[r_j][r_j] - dist_matrix[r_i][r_i]) +
        flow_matrix[i][j] * (dist_matrix[r_j][r_i] - dist_matrix[r_i][r_j]) +
        flow_matrix[j][i] * (dist_matrix[r_i][r_j] - dist_matrix[r_j][r_i]) +
        flow_matrix[j][j] * (dist_matrix[r_i][r_i] - dist_matrix[r_j][r_j])
    )
    
    for k in range(n):
        if k != i and k != j:
            r_k = solution[k]
            delta += 2 * (
                flow_matrix[i][k] * (dist_matrix[r_j][r_k] - dist_matrix[r_i][r_k]) +
                flow_matrix[j][k] * (dist_matrix[r_i][r_k] - dist_matrix[r_j][r_k]) +
                flow_matrix[k][i] * (dist_matrix[r_k][r_j] - dist_matrix[r_k][r_i]) +
                flow_matrix[k][j] * (dist_matrix[r_k][r_i] - dist_matrix[r_k][r_j])
            )
            
    return delta

def local_search(solution, flow_matrix, dist_matrix, max_iters=10000):
    """
    Local Search (Hill Climbing) with First-Improvement strategy.
    Neighborhood: 2-exchange.
    """
    n = len(solution)
    current_solution = list(solution)
    current_cost = calculate_cost_numpy(current_solution, flow_matrix, dist_matrix)
    
    improved = True
    iterations = 0
    
    # Shuffle neighborhood order to avoid bias
    indices = list(range(n))
    
    while improved and iterations < max_iters:
        improved = False
        random.shuffle(indices)
        
        for idx1 in range(n):
            i = indices[idx1]
            for idx2 in range(idx1 + 1, n):
                j = indices[idx2]
                
                # Calculate delta for swapping i and j
                delta = calculate_delta(i, j, current_solution, flow_matrix, dist_matrix)
                
                if delta < -1e-9: # Improved
                    current_solution[i], current_solution[j] = current_solution[j], current_solution[i]
                    current_cost += delta
                    improved = True
                    break # First-Improvement
            if improved:
                break
        
        iterations += 1
        
    return current_solution, current_cost, iterations
