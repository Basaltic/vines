/**
 * 素材存储、上传的要求的的credentail
 */
export interface AssetAccessCredential {
  accessKeyId: string;
  accessKeySecret: string;
  securityToken: string;
  expiration: string;
  region: string;
  bucket: string;
}

/**
 * 直传凭证对象
 */
export interface AssetCreationStartInfo {
  isDone: boolean;
  accessKeyId: string;
  signature: string;
  policy: string;
  key: string;
  url: string;
  id: string;
}

/**
 * 数字资产接口返回的对象
 */
export interface AssetItem {
  id: string;
  hash: string;
  type: string;
  name: string;
  size: number;
  ext: string;
  color?: string;
  width?: number;
  height?: number;
  state: number;
  ctime: number;
  utime: number;
  dtime: number;
}
