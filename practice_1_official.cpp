#include <iostream>
#include <vector>
#include <fstream>
#include <string>
#include <numeric>
#include <algorithm>
#include <cmath>
#include <iomanip>
#include <random>
#include <chrono>

using namespace std;

// --- Estructura y Globales ---
struct QAPInstance {
    string name;
    int n;
    vector<vector<double>> flow;
    vector<vector<double>> dist;
};

// Semillas (Anexo)
const vector<unsigned int> SEEDS = {42, 12, 99, 123, 777, 2025, 3000, 5, 88, 101};

// --- Utils ---
QAPInstance read_qap(const string& filename) {
    QAPInstance q;
    q.name = filename;
    ifstream file(filename);
    if (!file.is_open()) {
        cerr << "Error abriendo " << filename << endl;
        q.n = 0;
        return q;
    }
    
    file >> q.n;
    // Leer Flujo
    q.flow.resize(q.n, vector<double>(q.n));
    for (int i = 0; i < q.n; i++)
        for (int j = 0; j < q.n; j++) file >> q.flow[i][j];
        
    // Leer Distancia
    q.dist.resize(q.n, vector<double>(q.n));
    for (int i = 0; i < q.n; i++)
        for (int j = 0; j < q.n; j++) file >> q.dist[i][j];
        
    return q;
}

double evaluate(const QAPInstance& q, const vector<int>& p) {
    double cost = 0;
    for (int i = 0; i < q.n; i++) {
        for (int j = 0; j < q.n; j++) {
            cost += q.flow[i][j] * q.dist[p[i]][p[j]];
        }
    }
    return cost;
}

double delta_evaluate(const QAPInstance& q, const vector<int>& p, int r, int s) {
    double delta = 0;
    for (int k = 0; k < q.n; k++) {
        if (k != r && k != s) {
            delta += (q.flow[r][k] - q.flow[s][k]) * 
                     (q.dist[p[s]][p[k]] - q.dist[p[r]][p[k]]) +
                     (q.flow[k][r] - q.flow[k][s]) * 
                     (q.dist[p[k]][p[s]] - q.dist[p[k]][p[r]]);
        }
    }
    return delta;
}

// --- 1. Greedy ---
struct Element {
    int index;
    double val;
};
bool compareDesc(Element a, Element b) { return a.val > b.val; }
bool compareAsc(Element a, Element b) { return a.val < b.val; }

pair<vector<int>, double> greedy_solver(const QAPInstance& q) {
    vector<int> sol(q.n);
    vector<Element> flow_pot(q.n), dist_pot(q.n);
    
    for (int i = 0; i < q.n; i++) {
        flow_pot[i].index = i;
        dist_pot[i].index = i;
        flow_pot[i].val = 0; dist_pot[i].val = 0;
        for (int j = 0; j < q.n; j++) {
            flow_pot[i].val += q.flow[i][j];
            dist_pot[i].val += q.dist[i][j];
        }
    }
    
    sort(flow_pot.begin(), flow_pot.end(), compareDesc);
    sort(dist_pot.begin(), dist_pot.end(), compareAsc);
    
    for (int i = 0; i < q.n; i++) {
        sol[flow_pot[i].index] = dist_pot[i].index;
    }
    
    return {sol, evaluate(q, sol)};
}

// --- 2. Random Search ---
pair<vector<int>, double> random_search(const QAPInstance& q, unsigned int seed) {
    mt19937 rng(seed);
    vector<int> current_sol(q.n);
    iota(current_sol.begin(), current_sol.end(), 0);
    shuffle(current_sol.begin(), current_sol.end(), rng);
    
    double best_cost = evaluate(q, current_sol);
    vector<int> best_sol = current_sol;
    
    long long max_iter = 1000 * q.n;
    for (long long i = 0; i < max_iter; i++) {
        vector<int> sol(q.n);
        iota(sol.begin(), sol.end(), 0);
        shuffle(sol.begin(), sol.end(), rng);
        double cost = evaluate(q, sol);
        if (cost < best_cost) {
            best_cost = cost;
            best_sol = sol;
        }
    }
    return {best_sol, best_cost};
}

// --- 3. Local Search (First Improvement) ---
pair<vector<int>, double> local_search(const QAPInstance& q, unsigned int seed) {
    mt19937 rng(seed);
    vector<int> current_sol(q.n);
    iota(current_sol.begin(), current_sol.end(), 0);
    shuffle(current_sol.begin(), current_sol.end(), rng);
    
    double current_cost = evaluate(q, current_sol);
    bool improve = true;
    
    while(improve) {
        improve = false;
        vector<pair<int,int>> neighbors;
        for(int i=0; i<q.n; i++)
            for(int j=i+1; j<q.n; j++)
                neighbors.push_back({i,j});
        
        shuffle(neighbors.begin(), neighbors.end(), rng);
        
        for(auto p : neighbors) {
            double delta = delta_evaluate(q, current_sol, p.first, p.second);
            if(delta < 0) {
                swap(current_sol[p.first], current_sol[p.second]);
                current_cost += delta;
                improve = true;
                break; // First Improvement
            }
        }
    }
    return {current_sol, current_cost};
}

// --- 4. Simulated Annealing (Cauchy) ---
pair<vector<int>, double> simulated_annealing(const QAPInstance& q, unsigned int seed) {
    mt19937 rng(seed);
    uniform_real_distribution<double> dist_real(0.0, 1.0);
    
    vector<int> current_sol(q.n);
    iota(current_sol.begin(), current_sol.end(), 0);
    shuffle(current_sol.begin(), current_sol.end(), rng);
    
    double current_cost = evaluate(q, current_sol);
    vector<int> best_sol = current_sol;
    double best_cost = current_cost;
    
    // Params
    double mu = 0.3;
    double phi = 0.3;
    double t0 = (mu / -log(phi)) * current_cost;
    double temp = t0;
    
    long long max_iter = 50 * q.n;
    long long k = 0;
    
    while (k < max_iter) {
        int accepted = 0;
        int generated = 0;
        
        while (accepted < 5 && generated < 40) {
            generated++;
            int i = uniform_int_distribution<int>(0, q.n - 1)(rng);
            int j = uniform_int_distribution<int>(0, q.n - 1)(rng);
            if (i == j) continue;
            
            double delta = delta_evaluate(q, current_sol, i, j);
            bool accept = false;
            
            if (delta < 0) accept = true;
            else if (exp(-delta / temp) > dist_real(rng)) accept = true;
            
            if (accept) {
                swap(current_sol[i], current_sol[j]);
                current_cost += delta;
                accepted++;
                if (current_cost < best_cost) {
                    best_cost = current_cost;
                    best_sol = current_sol;
                }
            }
        }
        k++;
        temp = t0 / (1.0 + k); // Cauchy
    }
    return {best_sol, best_cost};
}

// --- 5. Tabu Search ---
pair<vector<int>, double> tabu_search(const QAPInstance& q, unsigned int seed) {
    mt19937 rng(seed);
    vector<int> current_sol(q.n);
    iota(current_sol.begin(), current_sol.end(), 0);
    shuffle(current_sol.begin(), current_sol.end(), rng);
    
    double current_cost = evaluate(q, current_sol);
    vector<int> best_sol = current_sol;
    double best_cost = current_cost;
    
    int restart_interval = 8 * q.n;
    int max_iter_total = 40 * q.n;
    int tabu_tenure = q.n / 2;
    
    vector<vector<int>> tabu_matrix(q.n, vector<int>(q.n, 0));
    vector<vector<int>> freq_matrix(q.n, vector<int>(q.n, 0));
    
    for (int iter = 1; iter <= max_iter_total; iter++) {
        int best_i = -1, best_j = -1;
        double best_local_delta = 1e18; 
        
        for (int k = 0; k < 40; k++) {
            int i = uniform_int_distribution<int>(0, q.n - 1)(rng);
            int j = uniform_int_distribution<int>(0, q.n - 1)(rng);
            if (i == j) { k--; continue; }
            
            double delta = delta_evaluate(q, current_sol, i, j);
            bool is_tabu = tabu_matrix[min(i,j)][max(i,j)] > iter;
            bool aspira = (current_cost + delta < best_cost);
            
            if (!is_tabu || aspira) {
                if (delta < best_local_delta) {
                    best_local_delta = delta;
                    best_i = i;
                    best_j = j;
                }
            }
        }
        
        if (best_i != -1) {
            swap(current_sol[best_i], current_sol[best_j]);
            current_cost += best_local_delta;
            
            int u = min(best_i, best_j), v = max(best_i, best_j);
            tabu_matrix[u][v] = iter + tabu_tenure;
            
            for (int k=0; k<q.n; k++) freq_matrix[k][current_sol[k]]++;
            
            if (current_cost < best_cost) {
                best_cost = current_cost;
                best_sol = current_sol;
            }
        }
        
        if (iter % restart_interval == 0 && iter < max_iter_total) {
            if (uniform_real_distribution<double>(0, 1)(rng) < 0.5) tabu_tenure = max(2, (int)(tabu_tenure * 1.5));
            else tabu_tenure = max(2, (int)(tabu_tenure * 0.5));
            
            double r = uniform_real_distribution<double>(0, 1)(rng);
            if (r < 0.25) { 
                shuffle(current_sol.begin(), current_sol.end(), rng);
                current_cost = evaluate(q, current_sol);
            } else if (r < 0.75) {
                shuffle(current_sol.begin(), current_sol.end(), rng); // Placeholder for Greedy Randomized
                current_cost = evaluate(q, current_sol);
            } else {
                current_sol = best_sol;
                current_cost = best_cost;
            }
            for(auto& row : tabu_matrix) fill(row.begin(), row.end(), 0);
        }
    }
    return {best_sol, best_cost};
}

int main() {
    cout << "Ejecutando Practica 1 (C++ Benchmark)" << endl;
    cout << "---------------------------------------" << endl;
    QAPInstance q = read_qap("tai25b.dat");
    if (q.n == 0) {
        q = read_qap("nug5.dat"); // Fallback check
        if(q.n == 0) return 1;
    }
    
    cout << "Problema: " << q.name << " (N=" << q.n << ")" << endl << endl;
    
    // Greedy
    auto start = chrono::high_resolution_clock::now();
    auto greedy = greedy_solver(q);
    auto end = chrono::high_resolution_clock::now();
    cout << "Greedy:  " << greedy.second << " \t(" << chrono::duration_cast<chrono::microseconds>(end-start).count() << " us)" << endl;
    
    // Random Search (Seed 42)
    start = chrono::high_resolution_clock::now();
    auto rs = random_search(q, 42);
    end = chrono::high_resolution_clock::now();
    cout << "RandomS: " << rs.second << " \t(" << chrono::duration_cast<chrono::milliseconds>(end-start).count() << " ms)" << endl;
    
    // Local Search (Seed 42)
    start = chrono::high_resolution_clock::now();
    auto ls = local_search(q, 42);
    end = chrono::high_resolution_clock::now();
    cout << "LocalS:  " << ls.second << " \t(" << chrono::duration_cast<chrono::microseconds>(end-start).count() << " us)" << endl;
    
    // SA (Seed 42)
    start = chrono::high_resolution_clock::now();
    auto sa = simulated_annealing(q, 42);
    end = chrono::high_resolution_clock::now();
    cout << "SimAnn:  " << sa.second << " \t(" << chrono::duration_cast<chrono::milliseconds>(end-start).count() << " ms)" << endl;
    
    // Tabu (Seed 42)
    start = chrono::high_resolution_clock::now();
    auto tabu = tabu_search(q, 42);
    end = chrono::high_resolution_clock::now();
    cout << "Tabu:    " << tabu.second << " \t(" << chrono::duration_cast<chrono::milliseconds>(end-start).count() << " ms)" << endl;
    
    return 0;
}
