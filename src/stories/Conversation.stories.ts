import type { Meta, StoryObj } from "@storybook/react";
import { Conversation } from "../Components/Conversation";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Devana/Conversation",
  component: Conversation,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    // max-width of the Canvas in pixels

    // background image apple
    backgrounds: {
      default: "apple",
      values: [
        {
          name: "apple",
          value:
            "url(./assets/bg-storybook.avif) center center / cover no-repeat",
        },
      ],
    },
    // padding
    controls: { expanded: true },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    publicKey: {
      description: "The public key to use for the conversation",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    welcomeMessage: {
      description:
        "The welcome message to display at the beginning of the conversation",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    assistantBackgroundColor: {
      description: "The background color of the assistant messages",
      table: {
        type: {
          summary: "color",
        },
      },
    },
    assistantTextColor: {
      description: "The text color of the assistant messages",
      table: {
        type: {
          summary: "color",
        },
      },
    },
    userBackgroundColor: {
      description: "The background color of the user messages",
      table: {
        type: {
          summary: "color",
        },
      },
    },
    userTextColor: {
      description: "The text color of the user messages",
      table: {
        type: {
          summary: "color",
        },
      },
    },
    chatBackgroundColor: {
      description: "The background color of the chat area",
      table: {
        type: {
          summary: "color",
        },
      },
    },
    chatBackgroundSecondaryColor: {
      description: "The secondary background color of the chat area",
      table: {
        type: {
          summary: "color",
        },
      },
    },
    onEvent: {
      description: "Event handler for chat events",
      table: {
        type: {
          summary: "function",
        },
      },
    },
    scrollHeightChat: {
      description: "The height of the chat area",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    classes: {
      description: "The classes to apply to the component",
      table: {
        type: {
          summary: "object",
        },
      },
    },
    displayTools: {
      description: "Whether to display the tools in streaming response",
      table: {
        type: {
          summary: "boolean",
        },
      },
      defaultValue: false,
    },

    displayActions: {
      description: "Whether to display the actions (noting response)",
      table: {
        type: {
          summary: "boolean",
        },
      },
      defaultValue: false,
    },
    theme: {
      description: "The theme of the component",
      table: {
        type: {
          summary: "light | dark",
        },
      },
    },
    fontFamilyMarkdown: {
      description: "The font family of the markdown content",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof Conversation>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    publicKey: "",
    welcomeMessage: {
      fr: "Bonjour, je suis une IA conversationnelle",
      us: "Hello, I am a conversational AI",
    },
    displayActions: true,
    displayTools: true,
    scrollHeightChat: "80vh",
    themeOverrides: {
      "--bg-color-light": "yellow",
    },
  },
};

export const Secondary: Story = {
  args: {
    publicKey: "",
    welcomeMessage: {
      fr: "Bonjour, je suis une IA conversationnelle",
      us: "Hello, I am a conversational AI",
    },
    displayActions: true,
    displayTools: true,
    theme: "dark",
    scrollHeightChat: "600px",
  },
};
