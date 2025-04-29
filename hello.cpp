Input:
    N = number of stations
    M = number of tunnels
    stations[] = list of station coordinates (x, y, z)
    tunnels[] = list of tunnels with endpoints u and v
    source = starting station
    destination = ending station
    maintenance[] = list of stations under maintenance

graph create 

    For each tunnel (u, v):
        Calculate 3D distance between station u and station v
        Add v and distance to u's adjacency list
        Add u and distance to v's adjacency list (because it's bidirectional)


source and destination check 

    If yes:
        Print -1 and stop

source and destination check
        dist[] = array of size N, all values set to ∞
    dist[source] = 0
    minHeap = priority queue with (0, source)

algorithm
    While minHeap is not empty:
        Pop (currentCost, currentStation)
        If currentStation is destination → break
        If currentStation is in maintenance → skip

        For each neighbor of currentStation:
            If neighbor is in maintenance → skip
            newCost = currentCost + edgeCost
            If newCost < dist[neighbor]:
                Update dist[neighbor] = newCost
                Push (newCost, neighbor) into minHeap

final output 
        If dist[destination] is ∞:
        Print -1
    Else:
        Print dist[destination] with 2 decimal precision
