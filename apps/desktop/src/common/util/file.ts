/**
 * Get File Extension
 * @param filename
 * @param opts
 */
export function fileExtension(filename: string, opts: any) {
  if (!opts) opts = {};
  if (!filename) return '';
  const ext = (/[^./\\]*$/.exec(filename) || [''])[0];
  return opts.preserveCase ? ext : ext.toLowerCase();
}

/**
 * 字节数转换为大小字符串
 *
 * @param bytes
 * @returns
 */
export function bytesToSizeString(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.ceil(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}
