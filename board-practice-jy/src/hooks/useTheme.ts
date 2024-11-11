import { useCallback, useLayoutEffect, useState } from "react";

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const onChangeTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  useLayoutEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  return {
    theme,
    onChangeTheme,
  };
}

export default useTheme;
