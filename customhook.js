// useFocusTimeout.test.ts

import React from 'react';
import { render, act } from '@testing-library/react';
import useFocusTimeout from './useFocusTimeout';

jest.useFakeTimers();

const TestComponent: React.FC<{ delay: number }> = ({ delay }) => {
  const elementRef = useFocusTimeout(delay);

  return <div ref={elementRef}>Test Component</div>;
};

test('useFocusTimeout hook in TypeScript', () => {
  const delay = 1000;

  const { getByText } = render(<TestComponent delay={delay} />);

  // Ensure the component is rendered
  const element = getByText('Test Component');

  // Fast-forward time by 1000 milliseconds
  act(() => {
    jest.advanceTimersByTime(delay);
  });

  // Check if the element has focus after the timeout
  expect(document.activeElement).toBe(element);
});

afterAll(() => {
  jest.useRealTimers();
});


-_---------+


// useFindAndFocusWithTimeout.test.tsx

import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import useFindAndFocusWithTimeout from './useFindAndFocusWithTimeout';

jest.useFakeTimers();

const TestComponent: React.FC<{ selector: string; delay: number }> = ({ selector, delay }) => {
  const elementRef = useFindAndFocusWithTimeout(selector, delay);

  return <div ref={elementRef}>Test Component</div>;
};

test('useFindAndFocusWithTimeout hook in TypeScript', () => {
  const selector = '.example-class';
  const delay = 1000;

  const { getByText } = render(<TestComponent selector={selector} delay={delay} />);

  // Ensure the component is rendered
  const element = getByText('Test Component');

  // Fast-forward time by 1000 milliseconds
  act(() => {
    jest.advanceTimersByTime(delay);
  });

  // Check if the element has focus after the timeout
  expect(document.activeElement).toBe(element);

  // Check if the element was focused programmatically
  fireEvent.focus(element);
  expect(document.activeElement).toBe(element);
});

afterAll(() => {
  jest.useRealTimers();
});
