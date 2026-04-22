import type {
  KeyBinding,
  ScrollBoxRenderable,
  TextareaRenderable,
} from "@opentui/core";
import { EmptyBorder } from "./border";
import { StatusBar } from "./status-bar";
import { CommandMenu } from "./commant-menu";
import { useCallback, useEffect, useRef, type RefObject } from "react";
import type { Commands } from "./commant-menu/types";
import { useUserCommandMenu } from "./commant-menu/user-command-menu";
import { useRenderer } from "@opentui/react";

type Props = {
  onSubmit: (text: string) => void;
  disabled?: boolean;
};

export const TEXTAREA_KEY_BINDINGD: KeyBinding[] = [
  { name: "return", action: "submit" },
  { name: "empty", action: "submit" },
  { name: "return", shift: true, action: "newline" },
  { name: "enter", shift: true, action: "newline" },
];

export const InputBar = ({ onSubmit, disabled = false }: Props) => {
  const textareaRef = useRef<TextareaRenderable>(null);
  const onSubmitRef = useRef<() => void>(() => {});
  const renderer = useRenderer();

  const {
    showCommandMenu,
    commandQuery,
    selectedIndex,
    scrollRef,
    handleContentChnage,
    resolveCommand,
    setSelectedIndex,
  } = useUserCommandMenu();

  const handleCommandExecute = useCallback((index: number) => {
    const command = resolveCommand(index);
    handleCommand(command as Commands | undefined);
  }, []);

  const handleTextareaContentChange = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    handleContentChnage(textarea.plainText);
  }, []);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.setText("");

    const text = textarea.plainText.trim();
    if (text.length === 0) return;

    onSubmit(text);
    textarea.setText("");
  }, [disabled, onSubmit]);

  const handleCommand = useCallback(
    (command: Commands | undefined) => {
      const textarea = textareaRef.current;
      if (!textarea || !command) return;

      textarea.setText("");

      if (command.action) {
        command.action({
          exit: () => renderer.destroy(),
        });
      } else {
        textarea.insertText(command.value + " ");
      }
    },
    [renderer],
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.onSubmit = () => {
      onSubmitRef.current();
    };
  }, []);

  onSubmitRef.current = () => {
    if (disabled) return;
    if (showCommandMenu) {
      const command = resolveCommand(selectedIndex);
      handleCommand(command ?? undefined);
      return;
    }

    handleSubmit();
  };

  return (
    <box width="100%" alignItems="center">
      <box
        // TODO: add left border
        border={["left"]}
        borderColor="cyan"
        customBorderChars={{
          ...EmptyBorder,
          vertical: "||",
          bottomLeft: "└",
          bottomRight: "┐",
        }}
        width="90%"
      >
        <box
          position="relative"
          justifyContent="center"
          paddingX={2}
          paddingY={1}
          backgroundColor="#1A1A24"
          width="100%"
          gap={1}
        >
          {showCommandMenu && (
            <box
              position="absolute"
              bottom="100%"
              left={0}
              width="100%"
              backgroundColor="#1A1A24"
              zIndex={10}
            >
              <CommandMenu
                query={commandQuery}
                selectedIndex={selectedIndex}
                scrollRef={scrollRef as RefObject<ScrollBoxRenderable>}
                onSelect={setSelectedIndex}
                onExecute={handleCommandExecute}
              />
            </box>
          )}
          <textarea
            ref={textareaRef}
            focused={!disabled}
            keyBindings={TEXTAREA_KEY_BINDINGD}
            onContentChange={handleTextareaContentChange}
            placeholder="Type your message here.. to make things happen"
            width="90%"
          />
          <StatusBar />
        </box>
      </box>
    </box>
  );
};
