import SparkMD5 from 'spark-md5';

const CHUNK_SIZE = 1024 * 1024;

/**
 *
 * @param file
 * @param chunkSize
 */
export function hashFileIncrementally(file: File, chunkSize: number = CHUNK_SIZE) {
    const promise = new Promise<string>((resolve, reject) => {
        const blobSlice = File.prototype.slice;
        const chunks = Math.ceil(file.size / chunkSize);
        const spark = new SparkMD5.ArrayBuffer();
        const fileReader = new FileReader();

        let currentChunk = 0;

        fileReader.onload = (e) => {
            // Append array buffer
            spark.append(e.target?.result as any);
            currentChunk++;

            if (currentChunk < chunks) {
                loadNext();
            } else {
                const hash = spark.end();
                resolve(hash);
            }
        };

        fileReader.onerror = () => {
            console.warn('oops, something went wrong.');
            reject(false);
        };

        function loadNext() {
            const start = currentChunk * chunkSize;
            const end = start + chunkSize >= file.size ? file.size : start + chunkSize;

            fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        }

        loadNext();
    });

    return promise;
}
