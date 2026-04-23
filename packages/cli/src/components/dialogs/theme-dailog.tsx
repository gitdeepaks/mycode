import { useCallback, useEffect, useRef } from "react";
import { useDialog } from "../../providers/dialog";

import { useTheme } from "../../providers/theme";
import { DialogSearchList } from "../dialog-serach-list";
import { DEFAULT_THEME, THEMES } from "../../theme";
import type { Theme } from "../../theme";

export const ThemeDialogContent = () => {
  const dialog = useDialog();
  const { setTheme, colors } = useTheme();
  const originalThemeRef = useRef<Theme>(
    THEMES.find((theme) => theme.colors === colors) ?? DEFAULT_THEME!,
  );
  const confirmedRef = useRef(false);

  // Revert the original theme when the dialog is closed

  useEffect(() => {
    return () => {
      if (!confirmedRef.current) {
        setTheme(originalThemeRef.current);
      }
    };
  }, [setTheme]);

  const handleSelect = useCallback(
    (theme: Theme) => {
      confirmedRef.current = true;
      setTheme(theme);
      dialog.close();
    },
    [setTheme, dialog],
  );

  const handleHighlight = useCallback(
    (theme: Theme) => {
      setTheme(theme);
    },
    [setTheme],
  );

  return (
    <DialogSearchList
      items={THEMES}
      onSelect={handleSelect}
      onHighlight={handleHighlight}
      filterFn={(theme, query) =>
        theme.name.toLowerCase().includes(query.toLowerCase())
      }
      renderItem={(theme, isSelected) => (
        <text selectable={false} fg={isSelected ? "black" : "white"}>
          {theme.name === originalThemeRef.current.name
            ? "★ "
            : " \u0020\u0020\u0020"}
          {theme.name}
        </text>
      )}
      getKey={(theme) => theme.name}
      placeholder="Search themes"
      emptyText="No themes found"
    />
  );
};
