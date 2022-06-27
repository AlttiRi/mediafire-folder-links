(async function main(rootId) {
    /**
     * @param {String} folderId
     * @param {"files"|"folders"} type
     * @param {number} chunk
     * @return {Promise<
     * {created_utc: String, folderkey: String, file_count: String, folder_count: String, name: String}[] |
     * {created_utc: String, filename: String, hash: String, links: {normal_download: String}, quickkey: String, size: String}[]>}
     */
    async function fetchContentInfo(folderId, type, chunk = 1) {
        const url =
            `https://www.mediafire.com/api/1.4/folder/get_content.php?` +
            `content_type=${type}&filter=all&order_by=name&order_direction=asc&chunk=${chunk}&version=1.5&` +
            `folder_key=${folderId}&response_format=json`;
        const resp = await fetch(url, {
            headers: {
                "Cache-Control": "no-cache",
                "Accept": "*/*",
                "X-Requested-With": "XMLHttpRequest"
            }
        });
        const json = await resp.json();
        if (json.response?.result !== "Success") {
            throw "Error";
        }
        let result = json.response.folder_content[type];

        if (result.length === Number(json.response.folder_content.chunk_size)) {
            const nextChuck = await fetchContentInfo(folderId, type, chunk + 1);
            return [...result, ...nextChuck];
        }
        return result;
    }
    /**
     * @param {String[]} folderIds
     * @return {Promise<
     * {created_utc: String, folderkey: String, file_count: String, folder_count: String, name: String, owner_name: String}[]
     * >}
     */
    async function fetchFolderInfo(folderIds) {
        const url = "https://www.mediafire.com/api/1.4/folder/get_info.php" + "?r=" + getRandomAZWord();

        const resp = await fetch(url, {
            headers: {
                "Cache-Control": "no-cache",
                "Accept": "*/*",
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: `folder_key=${encodeURIComponent(folderIds.join(","))}&details=yes&response_format=json`,
            method: "POST",
        });
        const json = await resp.json();
        if (json.response?.result !== "Success") {
            throw "Error";
        }
        if (folderIds.length === 1) {
            return [json.response.folder_info];
        }
        return json.response.folder_infos;
    }


    rootId = rootId || location.href.match(/(?<=www.mediafire.com\/folder\/)[^\/]+/)[0];
    const [rootFolder] = await fetchFolderInfo([rootId]);

    let urls = [];
    let size = 0;

    async function fetchFiles(folderId, path) {
        for (const file of await fetchContentInfo(folderId, "files")) {
            const meta = {
                filename: file.filename,
                path,
                created_utc: file.created_utc,
                size: parseInt(file.size),
                quickkey: file.quickkey,
                hash: file.hash,
            };
            size += meta.size;
            let url = file.links.normal_download + "#" + JSON.stringify(meta);
            urls.push(url);
        }
    }


    async function fetchAll(folderId, path) {
        console.log("Fetching", path.join("/"));
        await sleep(250);
        await fetchFiles(folderId, path);
        await sleep(250);
        for (const folder of await fetchContentInfo(folderId, "folders")) {
            await fetchAll(folder.folderkey, [...path, folder.name]);
        }
    }

    await fetchAll(rootId, [rootFolder.name]);

    console.log(globalThis.urlsText = urls.join("\n"));
    console.log(globalThis.urls = urls);
    console.log(globalThis.urlsJson = JSON.stringify(urls));
    console.log("Total:", urls.length, "Size:", bytesToSizeWinLike(size), "(", size, ")");
    console.log("urlsText", "urls", "urlsJson");


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function getRandomAZWord(len = 4) {
        return new Array(len).fill(0).map(() => {
            return String.fromCharCode(Math.trunc(Math.random() * 26) + 0x61);
        }).join("");
    }
    // https://gist.github.com/AlttiRi/ee82de3728624f997b38e4fb90906914
    function bytesToSizeWinLike(t){if(t<1024)return t+" B";let n=Math.floor(Math.log(t)/Math.log(1024)),o=t/Math.pow(1024,n);return o>=1e3&&(n++,o/=1024),toTruncPrecision3(o)+" "+["B","KB","MB","GB","TB","PB","EB","ZB","YB"][n]}
    function toTruncPrecision3(t){let n;return t<10?n=Math.trunc(100*t)/100:t<100?n=Math.trunc(10*t)/10:t<1e3&&(n=Math.trunc(t)),t<.1?n.toPrecision(1):t<1?n.toPrecision(2):n.toPrecision(3)}
})();
