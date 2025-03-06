import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import KInput from './index.vue';

describe('KInput', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(KInput);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('renders with provided label', () => {
    const label = 'Test Label';
    const wrapper = mount(KInput, {
      props: { label }
    });
    expect(wrapper.find('label').text()).toContain(label);
  });

  it('applies error styling when error prop is provided', () => {
    const error = 'Error message';
    const wrapper = mount(KInput, {
      props: { errorMessage: error }
    });

    console.log(wrapper.html());

    // TODO: improve this test
    expect(wrapper.find('.error-message').text()).toBe(error);
    // expect(wrapper.find('input').classes()).toContain('has-error');
  });

  it('emits update:modelValue event on input', async () => {
    const wrapper = mount(KInput);
    const input = wrapper.find('input');
    await input.setValue('test value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['test value']);
  });

  it('respects disabled prop', async () => {
    const wrapper = mount(KInput, {
      props: { disabled: true }
    });
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  it('applies correct type attribute', () => {
    const wrapper = mount(KInput, {
      props: { type: 'password' }
    });
    expect(wrapper.find('input').attributes('type')).toBe('password');
  });

  it('handles placeholder correctly', () => {
    const placeholder = 'Enter value...';
    const wrapper = mount(KInput, {
      props: { placeholder }
    });
    expect(wrapper.find('input').attributes('placeholder')).toBe(placeholder);
  });

  it('applies proper value from v-model', () => {
    const modelValue = 'test model value';
    const wrapper = mount(KInput, {
      props: { modelValue }
    });
    expect(wrapper.find('input').element.value).toBe(modelValue);
  });
});