export const generateCustomClass = (customcss: React.CSSProperties, ref: React.RefObject<HTMLElement | null>): void => {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const element = ref.current;

    if (element && customcss) {
      Object.entries(customcss).forEach(([key, value]) => {
        (element.style as any)[key] = value;
      });
    }
  }
};