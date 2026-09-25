/** Stand-in for next/navigation. A preview only ever shows the homepage. */
export const usePathname = () => "/";
export const useSearchParams = () => new URLSearchParams();
export const useRouter = () => ({ push() {}, replace() {}, back() {}, forward() {}, refresh() {}, prefetch() {} });
