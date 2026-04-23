import { ThemeDialogContent } from "../dialogs";
import type { CommandContext, Commands } from "./types";

export const COMMANDS: Commands[] = [
  {
    name: "new",
    description: "Start a new conversation",
    value: "/new",
    action: (ctx) => {
      ctx.toast.show({
        messages: "Starting new conversation",
      });
    },
  },

  {
    name: "usage",
    description: "Show usage and help",
    value: "/usage",
    action: (ctx) => {
      ctx.toast.show({
        messages: "Showing usage and help",
      });
    },
  },

  {
    name: "upgrade",
    description: "Upgrade by adding more credits",
    value: "/upgrade",
    action: (ctx) => {
      ctx.toast.show({
        messages: "Upgrading your account",
      });
    },
  },

  {
    name: "login",
    description: "Sign in to your account",
    value: "/login",
    action: (ctx) => {
      ctx.toast.show({
        messages:
          "Signing in to your account opening the login page on your browser",
      });
    },
  },

  {
    name: "logout",
    description: "Sign out of your account",
    value: "/logout",
    action: (ctx) => {
      ctx.toast.show({
        messages: "Signing out of your account",
      });
    },
  },

  {
    name: "themes",
    description: "Browse and switch themes",
    value: "/themes",
    action: (ctx) => {
      ctx.dialog.open({
        title: "Browse and switch themes",
        children: <ThemeDialogContent />,
      });
    },
  },

  {
    name: "models",
    description: "Browse and switch models",
    value: "/models",
    action: (ctx) => {
      ctx.dialog.open({
        title: "Switching models",
        children: <text>Models are coming soon...</text>,
      });
    },
  },

  {
    name: "agents",
    description: "Browse and switch agents",
    value: "/agents",
    action: (ctx) => {
      ctx.dialog.open({
        title: "Switching agents",
        children: <text>Agents are coming soon...</text>,
      });
    },
  },

  {
    name: "sessions",
    description: "Browse and switch sessions",
    value: "/sessions",
    action: (ctx) => {
      ctx.toast.show({
        messages: "Browsing and switching sessions",
      });
    },
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
