import type { CommandContext, Commands } from "./types";

export const COMMANDS: Commands[] = [
  {
    name: "new",
    description: "Start a new conversation",
    value: "/new",
  },

  {
    name: "usage",
    description: "Show usage and help",
    value: "/usage",
  },

  {
    name: "upgrade",
    description: "Upgrade by adding more credits",
    value: "/upgrade",
  },

  {
    name: "login",
    description: "Sign in to your account",
    value: "/login",
  },

  {
    name: "logout",
    description: "Sign out of your account",
    value: "/logout",
  },

  {
    name: "themes",
    description: "Browse and switch themes",
    value: "/themes",
  },

  {
    name: "models",
    description: "Browse and switch models",
    value: "/models",
  },

  {
    name: "agents",
    description: "Browse and switch agents",
    value: "/agents",
  },

  {
    name: "sessions",
    description: "Browse and switch sessions",
    value: "/sessions",
  },

  {
    name: "exit",
    description: "Exit the application",
    value: "/exit",
    action: (ctx) => {
      ctx.exit();
    },
  },
];
