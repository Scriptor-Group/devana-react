"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const Conversation_1 = require("./Conversation");
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: "Devana/Conversation",
    component: Conversation_1.Conversation,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
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
            description: "The welcome message to display at the beginning of the conversation",
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
};
exports.default = meta;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
exports.Primary = {
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
