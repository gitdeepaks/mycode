import { useRef, useState, useMemo, type RefObject } from "react";
import type { ScrollBoxRenderable } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import { getFilteredCommands } from "./filter-commands";
import type { Commands } from "./types";
import { useKeyboardLayer } from "../../providers/keyboard-layer";

type UserCommandMenuReturn = {
  showCommandMenu: boolean;
  commandQuery: string;
  selectedIndex: number;
  scrollRef: RefObject<ScrollBoxRenderable | null>;
  handleContentChnage: (text: string) => void;
  resolveCommand: (index: number) => void;
  setSelectedIndex: (index: number) => void;
};

export function useUserCommandMenu(): UserCommandMenuReturn {
  const [textValue, setTextValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const scrollRef = useRef<ScrollBoxRenderable | null>(null);
  const { push, pop, isTopLayer, setResponder } = useKeyboardLayer();

  const commandQuery =
    showCommandMenu && textValue.startsWith("/") ? textValue.slice(1) : "";

  const filteredCommands = useMemo(
    () => getFilteredCommands(commandQuery),
    [commandQuery],
  );

  const close = () => {
    setShowCommandMenu(false);
    pop("command");
  };

  const handleContentChnage = (text: string) => {
    setTextValue(text);
    setSelectedIndex(0);

    const scrollbox = scrollRef.current;
    if (scrollbox) {
      scrollbox.scrollTo(0);
    }

    const prefix = text.startsWith("/") ? text.slice(1) : null;

    if (prefix !== null && !prefix.includes(" ")) {
      setShowCommandMenu(true);
      push("command", () => {
        close();
        return true;
      });
    } else {
      close();
    }
  };

  // Resolve the command
  const resolveCommand = (index: number): Commands | undefined => {
    const command = filteredCommands[index];
    if (command) {
      close();
    }

    return command;
  };

  // Arrow keys to move the selection
  useKeyboard((key) => {
    if (!showCommandMenu || !isTopLayer("command", () => false)) return;

    if (key.name === "escape") {
      close();
    } else if (key.name === "up") {
      key.preventDefault();
      setSelectedIndex((i: number) => {
        const newIndex = Math.max(0, i - 1);
        // keep the heilited item visible when arrowing past the edge
        const sb = scrollRef.current;
        if (sb && newIndex < sb.scrollTop) {
          sb.scrollTo(newIndex);
        }
        return newIndex;
      });
    } else if (key.name === "down") {
      key.preventDefault();
      setSelectedIndex((i: number) => {
        if (filteredCommands.length === 0) {
          return 0;
        }

        const newIndex = Math.min(filteredCommands.length - 1, i + 1);
        const sb = scrollRef.current;
        if (sb) {
          const viewPortHeight = sb.viewport.height;
          const visibleEnd = sb.scrollTop + viewPortHeight - 1;
          if (newIndex > visibleEnd) {
            sb.scrollTo(newIndex - viewPortHeight + 1);
          }
        }

        return newIndex;
      });
    }
  });
  return {
    showCommandMenu,
    commandQuery,
    selectedIndex,
    scrollRef,
    handleContentChnage,
    resolveCommand,
    setSelectedIndex,
  };
}
