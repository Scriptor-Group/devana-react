import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Conversation } from "./Conversation";

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
  },
};

// export const Secondary: Story = {
//   args: {
//     label: "Conversation",
//   },
// };

// export const Large: Story = {
//   args: {
//     size: "large",
//     label: "Conversation",
//   },
// };

// export const Small: Story = {
//   args: {
//     size: "small",
//     label: "Conversation",
//   },
// };
