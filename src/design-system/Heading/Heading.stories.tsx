import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Heading } from './Heading';

const meta = {
  component: Heading,
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    as: 'h1',
    children: 'Heading H1'
  }
};