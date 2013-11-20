import nltk
import pprint as pp
import time
import sys
from yhat import BaseModel, Yhat


def parse_tweet(tweet):
    trees = nltk.ne_chunk(nltk.pos_tag(nltk.word_tokenize(tweet)))

    for tree in trees.subtrees():
        etype = None
        if tree.node=="PERSON":
            etype = "PERSON"
        elif tree.node=="GPE":
            etype = "PLACE"
        if etype is not None:
            ne = " ".join([leaf[0] for leaf in tree.leaves()])
            tweet = tweet.replace(ne, "<" + etype + ">" + ne + "</" + etype + ">")

    return tweet

if __name__=="__main__":
    if sys.argv[1]=="demo":
        while True:
            print parse_tweet(raw_input(">"))

    elif sys.argv[1]=="deploy":
        class Tagger(BaseModel):
            def transform(self, raw):
                return raw['tweet']
            def predict(self, tweet):
                tagged = parse_tweet(tweet)
                return {"raw": tweet, "tagged": tagged}

        tg = Tagger(udfs=[parse_tweet])
        yh = Yhat("greg", "demoaccount", "http://enterprise-demo.yhathq.com/deployer/")
        print yh.deploy("NamedEntityTagger", tg)


