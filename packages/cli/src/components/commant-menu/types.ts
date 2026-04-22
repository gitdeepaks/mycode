export type CommandContext = {
  exit: () => void;
};

export type Commands = {
  name: string;
  description: string;
  value: string;
  action?: (ctx: CommandContext) => void | Promise<void>;
};
