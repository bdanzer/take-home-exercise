import React from "react"

function SimpleSkeleton({ width, height }) {
  return (
    <div
      style={{
        width: width ? width : "100%",
        height,
        background: "lightgrey",
        borderRadius: 4,
      }}
    ></div>
  )
}

export default SimpleSkeleton
