import numpy as np

def greedy_construction(n, flow_matrix, dist_matrix):
    """
    Greedy constructive algorithm for QAP.
    Strategy: Assign facilities with higher total flow to locations with lower total distance.
    """
    # 1. Total flow for each facility
    total_flows = np.sum(flow_matrix, axis=1)
    # 2. Total distance for each location
    total_dists = np.sum(dist_matrix, axis=1)
    
    # 3. Sort facilities by descending flow
    facilities_sorted = np.argsort(total_flows)[::-1]
    # 4. Sort locations by ascending distance
    locations_sorted = np.argsort(total_dists)
    
    # 5. Assignment
    solution = [0] * n
    for i in range(n):
        solution[facilities_sorted[i]] = locations_sorted[i]
        
    return solution

if __name__ == "__main__":
    # Example usage with dummy data
    n = 3
    f = np.array([[0, 5, 2], [5, 0, 3], [2, 3, 0]])
    d = np.array([[0, 1, 4], [1, 0, 2], [4, 2, 0]])
    sol = greedy_construction(n, f, d)
    print(f"Greedy Solution: {sol}")
