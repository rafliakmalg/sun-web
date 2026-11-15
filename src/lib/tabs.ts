const channel = new BroadcastChannel('wms')

export function announceSaved(message?: string) {
  channel.postMessage({ type: 'saved', message })
}

export function onSavedElsewhere(handler: (message?: string) => void) {
  const listener = (event: MessageEvent) => {
    if (event.data?.type === 'saved') {
      handler(event.data.message)
    }
  }

  channel.addEventListener('message', listener)

  return () => channel.removeEventListener('message', listener)
}
