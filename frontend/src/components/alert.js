import React from "react"
import Typography from "@material-ui/core/Typography"

const getSeverity = (severity) => {
  switch (severity) {
    case "warning":
      return "#F1C40F"
    case "success":
      return "#27AE60"
    default:
      return "#E74C3C"
  }
}

function Alert({ severity, label }) {
  const color = getSeverity(severity)

  return (
    <div
      style={{
        padding: 16,
        border: `2px solid ${color}`,
        background: color,
        color: "white",
        fontWeight: "bold",
        borderRadius: 6,
        marginTop: 6,
        marginBottom: 6,
      }}
    >
      <Typography>{label}</Typography>
    </div>
  )
}

export default Alert
