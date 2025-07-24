# mediafire-folder-links

Recursively collect all links from a Mediafire folder into a list. With a metadata.

It's a browser's console script.

You need to open the browser console on Mediafire folder site (The location URL looks like this: `https://www.mediafire.com/folder/abcd123qwe/`).
Then verify the script and paste it in the console to run it.

The result is the logged lists of single file Mediafire downloads with a metadata after a URL hash as a JSON string.

The example output:
```
https://www.mediafire.com/file/qwe123/a.mp4/file#{"filename":"a.mp4","path":["Shared videos"],"created_utc":"2021-12-22T10:00:00Z","size":123456,"quickkey":"qwe123","hash":"sha256abc123"}
https://www.mediafire.com/file/asd453/b.mp4/file#{"filename":"b.mp4","path":["Shared videos","New"],"created_utc":"2021-12-31T10:00:00Z","size":234567,"quickkey":"asd453","hash":"256sha123abc"}
```

The global variables with the different representation of the same result are `urlsText`, `urls`, `urlsJson`, `urlsArray`.

### Notes
- The script uses Mediafire API v1.4, which works only on `www.mediafire.com`, not `app.mediafire.com` (it requires to use API v1.5).
- To fetch the links for your owned folder, you need to open the shared folder in an incognito tab (or just log out) to prevent redirecting from `www.mediafire.com` to `app.mediafire.com`.
- If you want to interrupt the script just close the browser's tab.
- It's recommended to use this script when you logged out. Just in case.
