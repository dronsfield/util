// nb: I changed these to be the same strings
// as react-query uses
export const LoadStatus = {
  PENDING: "loading",
  SUCCESS: "success",
  FAIL: "error",
  IDLE: "idle"
} as const

// Useful if you need the results of multiple requests
// to display a view. Outputs a single status.
// Eg:
// SUCCESS + SUCCESS = SUCCESS
// SUCCESS + PENDING = PENDING
// SUCCESS + FAIL = FAIL
// PENDING + FAIL = PENDING
// SUCCESS + PENDING + FAIL = PENDING
// etc
export function getCombinedStatus(
  statuses: Array<LoadStatusType | undefined>
): LoadStatusType {
  const counts: Partial<Record<LoadStatusType, number>> = {}
  statuses.forEach((status) => {
    if (status) counts[status] = (counts[status] || 0) + 1
  })
  if ((counts[LoadStatus.SUCCESS] || 0) === statuses.length) {
    return LoadStatus.SUCCESS
  } else if (counts[LoadStatus.PENDING]) {
    return LoadStatus.PENDING
  } else if (counts[LoadStatus.FAIL]) {
    return LoadStatus.FAIL
  } else {
    return LoadStatus.PENDING
  }
}

export type LoadStatusType = typeof LoadStatus[keyof typeof LoadStatus]

export default LoadStatus
