import type { Component } from 'vue'
import { vi } from 'vitest'
import { defineComponent, h } from 'vue'

export function stubPanel() {
  const panel = {
    // Answers the fallback, like a Panel without the backend's strings.
    t: (key: string, _data?: Record<string, unknown>, fallback?: string) => fallback ?? key,
    notification: { error: vi.fn() },
  }

  vi.stubGlobal('panel', panel)

  return panel
}

// Stand-ins for Kirby's global components: their props fall through as
// attributes, so a test can query them.
function stub(tag: string): Component {
  return defineComponent({
    setup: (_, { slots }) => () => h(tag, slots.default?.()),
  })
}

export const kirbyComponents = {
  'k-button': stub('button'),
  'k-button-group': stub('div'),
  'k-dropdown-item': stub('button'),
}
