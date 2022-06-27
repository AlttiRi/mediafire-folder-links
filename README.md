# mediafire-folder-links

Recursively collect all links from a Mediafire folder into a list. With a metadata.

It's a browser's console script.

The result is the list of single file Mediafire downloads with a metadata after a URL hash as a JSON string.

The example output:
```
https://www.mediafire.com/file/qwe123/a.mp4/file#{"filename":"a.mp4","path":["Videos"],"created_utc":"2021-12-22T10:00:00Z","size":123456,"quickkey":"qwe123","hash":"abc123"}
https://www.mediafire.com/file/asd453/b.mp4/file#{"filename":"b.mp4","path":["Videos"],"created_utc":"2021-12-31T10:00:00Z","size":234567,"quickkey":"asd453","hash":"123abc"}
```
