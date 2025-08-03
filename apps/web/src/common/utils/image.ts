import ColorThief from 'colorthief';

const imageMimeTypes = ['image/gif', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

export interface ImageInfo {
  palette: string[];
  width: number;
  height: number;
}

/**
 * 检测是否是图片
 */
export function isImage(mimetype: string) {
  if (mimetype.match(/image.*/) && imageMimeTypes.indexOf(mimetype) >= 0) {
    return true;
  }

  return false;
}

/**
 * 获取图片的调色板
 * @param file
 * @returns [颜色列表, 宽度，长度]
 */
export async function getImageInfo(file: File): Promise<ImageInfo | null> {
  if (file.type.match(/image.*/)) {
    const info: any = await new Promise<ImageInfo>((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function (event) {
          const image = new Image();
          image.src = this.result as string;

          image.onload = function () {
            const colorThief = new ColorThief();
            const colors = colorThief.getPalette(image);
            const hexPalette: string[] = colors.map((rgb: number[]) => {
              const [r, g, b] = rgb;
              return rgbToHex(r, g, b);
            });

            resolve({ palette: hexPalette, width: image.width, height: image.height });
          };
        };
      } catch (e) {
        reject(null);
      }
    });

    return info;
  }

  return null;
}

/**
 * 把RGB颜色转换为hex颜色
 * @param r
 * @param g
 * @param b
 */
export const rgbToHex = (r: number, g: number, b: number) =>
  '#' +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');

/**
 * 获取图片的base64字符串
 */
export function getImageBase64String(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function (event) {
        resolve(event.target?.result as string);
      };
    } catch (e) {
      reject(null);
    }
  });
}
