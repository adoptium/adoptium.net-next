import React, { RefObject, useRef } from "react"
import { render } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { useOnScreen } from "../useOnScreen"

describe("useOnScreen", () => {
  const intersectionObserverOriginal = window.IntersectionObserver
  const OnScreenRenderer: React.FC<{ observeOnce?: boolean }> = ({
    observeOnce = false,
  }) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const isVisible = useOnScreen(ref as RefObject<Element>, observeOnce)

    return <div ref={ref}>{isVisible ? <>true</> : <>false</>}</div>
  }

  afterEach(() => {
    window.IntersectionObserver = intersectionObserverOriginal
  })

  it("should observe ref for appearing on screen", () => {
    const observeMock = vi.fn()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.IntersectionObserver = vi.fn(() => {
      return {
        disconnect: vi.fn,
        observe: observeMock,
      }
    })

    render(<OnScreenRenderer />)
    expect(observeMock).toHaveBeenCalledTimes(1)
  })

  it("should disconnect on first intersection with observeOnce option", () => {
    const disconnectMock = vi.fn()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.IntersectionObserver = vi.fn(cb => {
      return {
        disconnect: disconnectMock,
        observe: () => {
          cb(
            [
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              {
                isIntersecting: true,
              },
            ],
            vi.fn() as unknown as IntersectionObserver,
          )
        },
      }
    })

    const { unmount } = render(<OnScreenRenderer observeOnce />)
    // unmount component in order to fire useEffect return function
    unmount()

    expect(disconnectMock).toHaveBeenCalledTimes(2)
  })

  it("should not disconnect on first intersection with observeOnce=false option", () => {
    const disconnectMock = vi.fn()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.IntersectionObserver = vi.fn(cb => {
      return {
        disconnect: disconnectMock,
        observe: () => {
          cb(
            [
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              {
                isIntersecting: true,
              },
            ],
            vi.fn() as unknown as IntersectionObserver,
          )
        },
      }
    })

    render(<OnScreenRenderer observeOnce={false} />)
    expect(disconnectMock).toHaveBeenCalledTimes(0)
  })
})
