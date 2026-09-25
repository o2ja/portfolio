/**
 * Stand-in for next/font/google. Loads the family from Google Fonts and, like
 * next/font, returns a class that defines the CSS variable the project asked for.
 * To support a new family, add its css2 spec below and export a constructor.
 */
const SPECS: Record<string, string> = {
  Archivo: "Archivo:wght@100..900",
  "Bodoni Moda": "Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900",
  Fraunces: "Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,100..900,0..100,0..1;1,9..144,100..900,0..100,0..1",
  Inter: "Inter:wght@100..900",
  Jost: "Jost:wght@300;400;500",
};

type Options = { variable?: string };

function font(family: string) {
  return ({ variable }: Options = {}) => {
    const className = `__font_${family.replace(/\W/g, "_").toLowerCase()}`;
    if (!document.querySelector(`style[data-font="${className}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${SPECS[family]}&display=swap`;
      document.head.append(link);
      const style = document.createElement("style");
      style.dataset.font = className;
      // `variable` classes only define the custom property, exactly like next/font.
      style.textContent =
        `.${className}{font-family:'${family}'}` +
        (variable ? `.${className}_var{${variable}:'${family}'}` : "");
      document.head.append(style);
    }
    return { className, variable: `${className}_var`, style: { fontFamily: `'${family}'` } };
  };
}

export const Archivo = font("Archivo");
export const Bodoni_Moda = font("Bodoni Moda");
export const Fraunces = font("Fraunces");
export const Inter = font("Inter");
export const Jost = font("Jost");
