import numpy as np

def calculate_cost(solution, flow_matrix, dist_matrix):
    """
    Calculates the cost of a QAP solution (permutation).
    Cost = sum_{i,j} flow(i,j) * dist(solution[i], solution[j])
    
    Args:
        solution: List or array representing the permutation (mapping facility i to location p)
        flow_matrix: n x n matrix of flows
        dist_matrix: n x n matrix of distances
    """
    n = len(solution)
    cost = 0
    # solution[i] is the location of facility i
    # solution[j] is the location of facility j
    for i in range(n):
        for j in range(n):
            if i != j:
                cost += flow_matrix[i][j] * dist_matrix[solution[i]][solution[j]]
    return cost

def calculate_cost_numpy(solution, flow_matrix, dist_matrix):
    """
    Optimized cost calculation using NumPy indexing.
    """
    # Reorder dist_matrix according to the solution (permutation)
    # The facility i is at solution[i]
    # We want a new distance matrix D' where D'[i][j] = D[solution[i]][solution[j]]
    sol = np.array(solution)
    dist_reordered = dist_matrix[sol[:, None], sol]
    return np.sum(flow_matrix * dist_reordered)

def is_valid_solution(solution, n):
    """Checks if the solution is a valid permutation of size n."""
    if len(solution) != n:
        return False
    return sorted(list(solution)) == list(range(n))
