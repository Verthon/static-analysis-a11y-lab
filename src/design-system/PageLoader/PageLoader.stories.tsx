import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { PageLoader } from './PageLoader';

const meta = {
  component: PageLoader,
} satisfies Meta<typeof PageLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};