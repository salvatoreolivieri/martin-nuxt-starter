export function useCapitalize(value: string) {
  if (!value || !value.length)
    return ""

  return value[0]?.toUpperCase() + value.slice(1)
};
