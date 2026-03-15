import numpy as np
import os

def load_qap_instance(file_path):
    """
    Loads a QAP instance from a file in QAPLIB format.
    Format:
    n
    (Flow matrix A)
    (Distance matrix B)
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Instance file not found: {file_path}")

    with open(file_path, 'r') as f:
        content = f.read().split()
    
    if not content:
        raise ValueError("Empty instance file")

    n = int(content[0])
    matrices_data = [float(x) for x in content[1:]]
    
    # Expected total elements: n*n (Flow) + n*n (Distance) = 2*n*n
    if len(matrices_data) < 2 * n * n:
        raise ValueError(f"Incomplete matrix data. Expected {2*n*n} elements, got {len(matrices_data)}")

    # Load Flow Matrix
    flow_matrix = np.array(matrices_data[:n*n]).reshape((n, n))
    
    # Load Distance Matrix
    dist_matrix = np.array(matrices_data[n*n:2*n*n]).reshape((n, n))
    
    return n, flow_matrix, dist_matrix

if __name__ == "__main__":
    # Test with a dummy check if file exists
    try:
        n, f, d = load_qap_instance("src/python/qap/instances/test.dat")
        print(f"Loaded instance of size {n}")
    except Exception as e:
        print(f"Error: {e}")
