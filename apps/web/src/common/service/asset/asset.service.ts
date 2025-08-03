import HttpApi from '../http-api-service';
import type { AssetCreationStartInfo, AssetItem, AssetAccessCredential } from './asset.dto';
import axios from 'axios';

export class AssetService extends HttpApi {
    /**
     * 获取直传凭证后，直接调用这个接口上传文件
     */
    public uploadDirectly = (params: { file: File; key: string; policy: string; accessKeyId: string; signature: string; url: string }) => {
        const { file, key, policy, accessKeyId, signature, url } = params;
        const data = new FormData();
        data.append('name', 'test');
        data.append('key', key);
        data.append('policy', policy);
        data.append('OSSAccessKeyId', accessKeyId);
        data.append('success_action_status', '200');
        data.append('signature', signature);
        data.append('file', file, file.name);
        return axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } });
    };

    /**
     * 获取临时凭证
     */
    public getTempCredential = this.post<{}, AssetAccessCredential>('/asset/cret');

    /**
     * 获取原始素材的临时签名url
     */
    public getSignatureUrl = this.post<{}, { id: string }>('/asset/o/url');

    /**
     * 开始创建数字资产，获取直传凭证
     */
    public createStart = this.post<
        {
            name: string;
            hash: string;
            type: string;
            size: number;
            ext?: string;
            width?: number;
            height?: number;
            color?: string;
        },
        AssetCreationStartInfo
    >('/asset/creation/start');

    /**
     * 创建数字资产结束，上传后调用
     */
    public createEnd = this.post<{ id: string; hash: string }, boolean>('/asset/creation/end');

    /**
     * 获取数字资产的列表数据
     */
    public list = this.post<{ pageNumber: number; pageSize: number }, { count: number; list: AssetItem[] }>('/asset/list');
}
