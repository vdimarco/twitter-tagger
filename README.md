twitter-tagger
==============
http://twitter-tagger.nodejitsu.com/

Using the Twitter firehose, NLTK, the Yhat streaming API to tag tweets in real-time.

## Go baby go
```bash
# set twitter API
export consumer_key="abcd1234"
export consumer_secret="efgh5678"
export access_token_key="ijkl91011"
export access_token_secret="mnop12131415"

$ npm install .
# will default to putin, obama, ukraine
$ node app.js
# can specify your own
$ node app.js baseball yankees "new york"
```


