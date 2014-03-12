import nltk
import pprint as pp
import time
import sys
from yhat import Yhat, YhatModel, preprocess


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


class Tagger(YhatModel):
    @preprocess(in_type=dict, out_type=dict)
    def execute(self, raw):
        tweet = raw['text']
        tagged = parse_tweet(tweet)
        raw['tagged'] = tagged
        return raw

tg = Tagger()

yh = Yhat("greg", "fCVZiLJhS95cnxOrsp5e2VSkk0GfypZqeRCntTD1nHA", "http://sandbox.yhathq.com/")
for i in range(5):
    print yh.deploy("NamedEntityTagger" + str(i), Tagger, globals())

#if __name__=="__main__":
   # if sys.argv[1]=="demo":
        #while True:
            #print parse_tweet(raw_input(">"))

    #elif sys.argv[1]=="deploy":
       # print tg.execute({"tweet": "RT @BGSU_Hockey: Kevin Dufour named Pizza Hut Athlete of the Week http://t.co/IWxLNRn6Zf"})


