import numpy as np

def generate_mock_tai25b():
    n = 25
    print(f"Generando tai25b.dat simulado (N={n})...")
    
    # Generate random Flow and Distance matrices
    # QAPLIB instances usually have integer values, but float is fine for our solver
    np.random.seed(42)
    flow = np.random.randint(0, 100, size=(n, n))
    dist = np.random.randint(0, 100, size=(n, n))
    
    # Zero diagonals
    np.fill_diagonal(flow, 0)
    np.fill_diagonal(dist, 0)
    
    with open("tai25b.dat", "w") as f:
        f.write(f"{n}\n")
        f.write("\n")
        
        # Write Flow (A)
        for row in flow:
            f.write(" ".join(map(str, row)) + "\n")
        f.write("\n")
        
        # Write Distance (B)
        for row in dist:
            f.write(" ".join(map(str, row)) + "\n")
            
    print("tai25b.dat generado.")

if __name__ == "__main__":
    generate_mock_tai25b()
