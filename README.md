# mediafire-folder-links

Recursively collect all links from a Mediafire folder into a list. With a metadata.

It's a browser's console script.

You need to open the browser console on Mediafire folder site (The location URL looks like this: `https://www.mediafire.com/folder/abcd/`).
Then verify the script and paste it in the console to run it.

The result is the logged lists of single file Mediafire downloads with a metadata after a URL hash as a JSON string.

The example output:
```
https://www.mediafire.com/file/qwe123/a.mp4/file#{"filename":"a.mp4","path":["Shared videos"],"created_utc":"2021-12-22T10:00:00Z","size":123456,"quickkey":"qwe123","hash":"sha256abc123"}
https://www.mediafire.com/file/asd453/b.mp4/file#{"filename":"b.mp4","path":["Shared videos","New"],"created_utc":"2021-12-31T10:00:00Z","size":234567,"quickkey":"asd453","hash":"256sha123abc"}
```

The global variables with the different representation of the same result are `urlsText`, `urls`, `urlsJson`, `urlsArray`.

### Note
- The script works only if you are not logged in. [#1](https://github.com/AlttiRi/mediafire-folder-links/issues/1)
- The script uses Mediafire API v1.4.
