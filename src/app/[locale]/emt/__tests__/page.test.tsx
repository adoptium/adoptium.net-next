import React from "react"
import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import EMT from "../page"

describe("EMT page", () => {
  it("renders correctly", () => {
    const { container } = render(<EMT />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<EMT />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
