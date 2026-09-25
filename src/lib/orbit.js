/** Signed distance from card `i` to orbit position `r`, wrapped into [-n/2, n/2). */
export const offset = (i, r, n) => ((((i - r) % n) + n * 1.5) % n) - n / 2;
