import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Box } from './Box';

const meta = {
  component: Box,
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    as: 'div',
    children: <p>Children</p>
  }
};