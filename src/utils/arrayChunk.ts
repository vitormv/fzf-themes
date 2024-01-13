export function arrayChunk(arr: any[], chunkSize: number) {
  if (chunkSize <= 0) throw 'Invalid chunk size';

  const chunks = [];

  for (let i = 0, len = arr.length; i < len; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }

  return chunks;
}
