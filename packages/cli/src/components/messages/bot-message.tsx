import { useTheme } from "../../providers/theme";
import { EmptyBorder } from "../border";

type Props = {
  content: string;
  model: string;
};

export const BotMessage = ({ content, model }: Props) => {
  const { colors } = useTheme();
  return (
    <box width="100%" alignItems="center">
      <box paddingY={1} width={"100%"}>
        <box paddingY={3} width={"100%"}>
          <text>{content}</text>
        </box>
      </box>
      <box paddingX={3} paddingBottom={1} gap={1} width={"100%"}>
        <box flexDirection="row" gap={2}>
          <text fg={colors.primary}>{String.fromCodePoint(0x1f441)}</text>
          <text fg={colors.dimSeparator}>{model}</text>
        </box>
      </box>
    </box>
  );
};
