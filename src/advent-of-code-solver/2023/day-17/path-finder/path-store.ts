import { CityStep, VisitorTracker } from './visitor-tracker.js';

export interface PathSum extends CityStep {
  sum: number;
}

export class PathStore {
  private readonly candidates_in_buckets: (PathSum[] | undefined)[] = [];
  private best_efficiency = 0;
  constructor(private readonly visitor_tracker: VisitorTracker) {}

  /**
   * The candidate will but in the bucket store with it's estimated path cost as key
   */
  private storeCandidateInBucket(candidate: PathSum) {
    // Since we do a "Breadth-first search",
    // We know that the first visit to a coordinate will be the best possible.
    // But! The coordinate can be visited from either a horizontal or vertical direction
    if (this.visitor_tracker.visited(candidate)) return;
    if (this.candidates_in_buckets[candidate.sum]) {
      this.candidates_in_buckets[candidate.sum]!.push(candidate);
    } else {
      this.candidates_in_buckets[candidate.sum] = [candidate];
    }
  }
  /**
   * Will consume the most promising candidate
   * Returns undefined if no more
   */
  public consumeNextCandidate(): PathSum | undefined {
    for (let i = this.best_efficiency; i < this.candidates_in_buckets.length; i++) {
      const candidate = this.findCandidateAtIndex(i);
      if (candidate) return candidate;
    }
    return undefined;
  }

  /**
   * will consume one of the candidates at index i (efficiency sum)
   */
  private findCandidateAtIndex(i: number): PathSum | undefined {
    const bucket = this.candidates_in_buckets[i];
    if (bucket === undefined || bucket.length === 0) {
      return undefined;
    }
    const candidate = bucket.pop()!;
    if (this.visitor_tracker.visited(candidate)) {
      // already visited, find another candidate for this index
      return this.findCandidateAtIndex(i);
    } else {
      this.best_efficiency = i;
      this.visitor_tracker.visit(candidate);
      return candidate;
    }
  }

  storeCandidates(child_paths: PathSum[]) {
    for (const path of child_paths) {
      this.storeCandidateInBucket(path);
    }
  }
}
