import { useLayoutEffect } from 'react'

export function useProjectReveals(filter: string) {
  useLayoutEffect(() => {
    const cards = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    if (!('IntersectionObserver' in window)) return

    const reveal = (card: HTMLElement, animate = false) => {
      const pending = card.classList.contains('reveal-pending')
      card.classList.remove('reveal-pending')
      if (!animate) card.classList.remove('reveal-active')
      else if (pending) card.classList.add('reveal-active')
    }
    const prepare = (card: HTMLElement) => {
      card.classList.remove('reveal-active')
      card.classList.add('reveal-pending')
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const card = entry.target as HTMLElement
        if (card.contains(document.activeElement)) reveal(card)
        else if (entry.isIntersecting) reveal(card, true)
        // Re-arm below the entrance line, leaving cards above the viewport visible.
        else if (entry.boundingClientRect.top >= (entry.rootBounds?.bottom ?? window.innerHeight)) prepare(card)
        else reveal(card)
      })
    }, { threshold: 0, rootMargin: '0px 0px -64px 0px' })

    const observeCards = () => {
      observer.disconnect()
      cards.forEach(card => {
        // Prepare before paint, including direct navigation and newly filtered cards.
        if (card.getBoundingClientRect().bottom > 0 && !card.contains(document.activeElement)) prepare(card)
        else reveal(card)
        observer.observe(card)
      })
    }
    observeCards()
    const onFocus = (event: FocusEvent) => {
      const card = (event.target as HTMLElement).closest<HTMLElement>('[data-reveal]')
      if (card) reveal(card)
    }
    document.addEventListener('focusin', onFocus)
    return () => {
      observer.disconnect()
      cards.forEach(card => reveal(card))
      document.removeEventListener('focusin', onFocus)
    }
  }, [filter])
}
