export interface SubState {
  subs: Sub[];
  filterdSub: Sub[];
  loading: boolean;
  error: Error | null;
  getMySubs: () => Promise<void>;
  addOptimisticSub: (newSub: Sub) => void;
}
