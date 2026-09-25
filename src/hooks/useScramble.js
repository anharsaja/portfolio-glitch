import { useEffect, useState } from 'react'

const CHARS = '!<>-_\\/[]{}=+*^?#%$&01'
const rand = (str) => str[Math.floor(Math.random() * str.length)]

/**
 * Menampilkan daftar kata secara bergantian dengan efek teks acak (scramble).
 * @param {string[]} words daftar kata
 * @param {number} hold jeda tampil penuh sebelum ganti kata (ms)
 */
export default function useScramble(words, hold = 2200) {
  const [text, setText] = useState(words[0] || '')

  useEffect(() => {
    if (!words.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let index = 0
    let frame = 0
    let raf = 0
    let timer = 0
    let queue = []
    let alive = true

    const render = () => {
      let output = ''
      let done = 0

      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end, char } = queue[i]
        if (frame >= end) {
          done++
          output += to
        } else if (frame >= start) {
          if (!queue[i].char || Math.random() < 0.28) queue[i].char = rand(CHARS)
          output += queue[i].char
        } else {
          output += from
        }
      }

      setText(output)

      if (done === queue.length) {
        timer = setTimeout(next, hold)
        return
      }
      frame++
      raf = requestAnimationFrame(render)
    }

    const setWord = (from, to) => {
      const length = Math.max(from.length, to.length)
      queue = []
      for (let i = 0; i < length; i++) {
        const start = Math.floor(Math.random() * 22)
        queue.push({
          from: from[i] || '',
          to: to[i] || '',
          start,
          end: start + Math.floor(Math.random() * 22) + 8,
          char: '',
        })
      }
      frame = 0
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(render)
    }

    const next = () => {
      if (!alive) return
      const from = words[index]
      index = (index + 1) % words.length
      setWord(from, words[index])
    }

    timer = setTimeout(next, hold)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [words, hold])

  return text
}
