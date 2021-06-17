export const catched = async <T>(callback: () => Promise<T>): Promise<[Error | null, T | null]> => {
  try {
    const r = await callback()
    return [null, r]
  } catch (error) {
    return [error, null]
  }
}