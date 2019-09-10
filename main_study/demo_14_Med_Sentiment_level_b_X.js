new Vue({
    el: '#app',
    data() {

        review = {
            title: "Good Location",
            sentences: [
                {
                    text: "I stayed at this hotel on a business trip. The ",
                    aspect: null,
                    sentiment_marked: null,
                    sentiment: null,
                },
                {
                    text: "rooms",
                    aspect: "Room",
                    sentiment_marked: null,
                    sentiment: "NEG",
                },
                {
                    text: " are small and not suited to working in the room; there was no desk to set up my computer and work so I had to use the lobby lounge area, not ideal. " +
                    "Breakfast was very good. Location is just 5 minutes walk downhill to Circular Quay and Rocks area. Almost impossible to try to get a taxi outside; there is no stopping for any vehicles so you need to go up the hill or around to another street. However, it is not expensive and if you are out all day then it's good to stay here. Staff very friendly and helpful.\n",
                    aspect: null,
                    sentiment_marked: null,
                    sentiment: null,
                },
                {
                    text: "The ",
                    aspect: null,
                    sentiment_marked: null,
                    sentiment: null,
                },
                {
                    text: " view ",
                    aspect: "View",
                    sentiment_marked: "POS",
                    sentiment: "POS",
                },
                {
                    text: " was a total shit as well \n period! ",
                    aspect: null,
                    sentiment_marked: null,
                    sentiment: null,
                },


            ]
        };

reviews_ext = 	{
	   "aspects": [
	      {
	         "aspect": "Location",
	         "sentiment": "POS"
	      },
	      {
	         "aspect": "Room",
	         "sentiment": "POS"
	      },
	      {
	         "aspect": "Staff",
	         "sentiment": "NEG"
	      },
	      {
	         "aspect": "Breakfast",
	         "sentiment": "POS"
	      },
	      {
	         "aspect": "Staff",
	         "sentiment": "POS"
	      },
	      {
	         "aspect": "Amenities",
	         "sentiment": "NEG"
	      },
	      {
	         "aspect": "Location",
	         "sentiment": "NEG"
	      },
	      {
	         "aspect": "Noise Level",
	         "sentiment": "POS"
	      },
	      {
	         "aspect": "Noise Level",
	         "sentiment": "NEG"
	      }
	   ],
	   "aspects_detailed": [
	      {
	         "name": "All",
	         "mentions": 24,
	         "mentions_pos": 15,
	         "mentions_neg": 9
	      },
	      {
	         "name": "Room",
	         "mentions": 3,
	         "mentions_pos": 3,
	         "mentions_neg": 0
	      },
	      {
	         "name": "Amenities",
	         "mentions": 5,
	         "mentions_pos": 0,
	         "mentions_neg": 5
	      },
	      {
	         "name": "Breakfast",
	         "mentions": 2,
	         "mentions_pos": 2,
	         "mentions_neg": 0
	      },
	      {
	         "name": "Staff",
	         "mentions": 6,
	         "mentions_pos": 4,
	         "mentions_neg": 2
	      },
	      {
	         "name": "Location",
	         "mentions": 5,
	         "mentions_pos": 4,
	         "mentions_neg": 1
	      },
	      {
	         "name": "Noise Level",
	         "mentions": 3,
	         "mentions_pos": 2,
	         "mentions_neg": 1
	      }
	   ],
	   "reviews": [
	      {
	         "title": "Central Sydney Location",
	         "sentences": [
	            {
	               "text": "I stayed at this hotel on a business trip.\n            The \n\t\t\t\n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "rooms",
	               "sentiment": "POS",
	               "sentiment_marked": "POS",
	               "aspect": "Room"
	            },
	            {
	               "text": " are small and not suited to working in the room; there was no \n\t\t\t\n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "desk",
	               "sentiment": "NEG",
	               "sentiment_marked": "NEG",
	               "aspect": "Amenities"
	            },
	            {
	               "text": " to set up my computer and work\n            so I had to use the lobby lounge area, not ideal.\n            \n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "Breakfast",
	               "sentiment": "POS",
	               "sentiment_marked": "POS",
	               "aspect": "Breakfast"
	            },
	            {
	               "text": " was very good. Location is just 5 minutes walk downhill to Circular Quay and Rocks area.\n            Almost impossible to try to get a taxi outside; there is no stopping for any vehicles\n            so you need to go up the hill or around to another street.\n            \n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "Staff",
	               "sentiment": "POS",
	               "sentiment_marked": "POS",
	               "aspect": "Staff"
	            },
	            {
	               "text": " very friendly and helpful.\n\t\t\t\n\t\t\t\n\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            }
	         ]
	      },
	      {
	         "title": "One Night in Sydney",
	         "sentences": [
	            {
	               "text": "\n            Great \n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "location",
	               "sentiment": "POS",
	               "sentiment_marked": "POS",
	               "aspect": "Location"
	            },
	            {
	               "text": ", nice staff just a\n            lot of construction going on around this area at the moment so a bit of loud \n\t\t\t\t\n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "noise",
	               "sentiment": "NEG",
	               "sentiment_marked": "NEG",
	               "aspect": "Noise Level"
	            },
	            {
	               "text": " at night while trying to sleep.\n            Book front rooms might help with the noise. :-) :-)\n\t\t\t\n\t\t\t\n\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            }
	         ]
	      },
	      {
	         "title": "Great service",
	         "sentences": [
	            {
	               "text": "\n            Great \n\t\t\t\t\n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "breakfast",
	               "sentiment": "POS",
	               "sentiment_marked": "POS",
	               "aspect": "Breakfast"
	            },
	            {
	               "text": " and friendly \n\t\t\t\t\n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "staff",
	               "sentiment": "POS",
	               "sentiment_marked": "POS",
	               "aspect": "Staff"
	            },
	            {
	               "text": ".\n            Guest noise easily heard from inside room n the \n\t\t\t\t\n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "lifts",
	               "sentiment": "NEG",
	               "sentiment_marked": "NEG",
	               "aspect": "Amenities"
	            },
	            {
	               "text": " were a little slow.\n            But overall great experience and convenient \n\t\t\t\t\n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "spot to stay",
	               "sentiment": "POS",
	               "sentiment_marked": "POS",
	               "aspect": "Location"
	            },
	            {
	               "text": ", close to \n\t\t\t\t\n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "shopping",
	               "sentiment": "NEG",
	               "sentiment_marked": "NEG",
	               "aspect": "Location"
	            },
	            {
	               "text": ".\n            Would highly recommend!\n\t\t\t\n\t\t\t\n\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            }
	         ]
	      },
	      {
	         "title": "Paying for location",
	         "sentences": [
	            {
	               "text": null,
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "Location",
	               "sentiment": "POS",
	               "sentiment_marked": "POS",
	               "aspect": "Location"
	            },
	            {
	               "text": " good.\n            Nice to have fridge. If you are insistent you can get a \n\t\t\t\t\n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "quiet",
	               "sentiment": "POS",
	               "sentiment_marked": "POS",
	               "aspect": "Noise Level"
	            },
	            {
	               "text": " room but be prepared to lug your bags up a flight of steps.\n            \n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "Housekeeping",
	               "sentiment": "NEG",
	               "sentiment_marked": "NEG",
	               "aspect": "Staff"
	            },
	            {
	               "text": " is nonexistent and the \n\t\t\t\t\n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "staff",
	               "sentiment": "NEG",
	               "sentiment_marked": "NEG",
	               "aspect": "Staff"
	            },
	            {
	               "text": " at front desk were slower than molasses.\n            \n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "Elevator",
	               "sentiment": "NEG",
	               "sentiment_marked": "NEG",
	               "aspect": "Amenities"
	            },
	            {
	               "text": " is very slow.\n            \n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "Mattress",
	               "sentiment": "NEG",
	               "sentiment_marked": "NEG",
	               "aspect": "Amenities"
	            },
	            {
	               "text": " was shot, but \n\t\t\t\t\n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "towels",
	               "sentiment": "NEG",
	               "sentiment_marked": "NEG",
	               "aspect": "Amenities"
	            },
	            {
	               "text": " were decent.\n\t\t\t\n\t\t\t\n\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            }
	         ]
	      },
	      {
	         "title": "Good experience!",
	         "sentences": [
	            {
	               "text": "\n            Part business /part family & friends trip. Very convenient location & very enjoyable \n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "rooms",
	               "sentiment": "POS",
	               "sentiment_marked": "POS",
	               "aspect": "Room"
	            },
	            {
	               "text": " to stay.\n            Should be even better when renovations completed.\n            Very courteous \n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "staff",
	               "sentiment": "POS",
	               "sentiment_marked": "POS",
	               "aspect": "Staff"
	            },
	            {
	               "text": "!\n\t\t\t\n\t\t\t\n\t\t\t\n\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            }
	         ]
	      },
	      {
	         "title": "Noise",
	         "sentences": [
	            {
	               "text": "\n            Hotel in v.good \n\t\t\t\t\n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "location",
	               "sentiment": "POS",
	               "sentiment_marked": "POS",
	               "aspect": "Location"
	            },
	            {
	               "text": ".\n            Clean basic \n\t\t\t\t\n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "room",
	               "sentiment": "POS",
	               "sentiment_marked": "POS",
	               "aspect": "Room"
	            },
	            {
	               "text": ".\n            Friendly \n\t\t\t\t\n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "staff",
	               "sentiment": "POS",
	               "sentiment_marked": "POS",
	               "aspect": "Staff"
	            },
	            {
	               "text": ".\n            Unfortunately v. \n\t\t\t\t\n\t\t\t\t\n\t\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            },
	            {
	               "text": "noisy",
	               "sentiment": "POS",
	               "sentiment_marked": "POS",
	               "aspect": "Noise Level"
	            },
	            {
	               "text": " room.\n            Very simple breakfast (not to the 4* standard)\n\t\t\t\n\t\t\t\n\t\t\t",
	               "sentiment": null,
	               "sentiment_marked": null,
	               "aspect": null
	            }
	         ]
	      }
	   ]
	};
        return reviews_ext;

    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        //this.fetchData();
        this.reset();
    },

    methods: {
        fetchData: function () {
            var that = this;
            fetch("./reviews_annotated_gt.json")
                .then(res => res.json())
                .then(function (response) {
                    console.log(response);
                    that.reviews = response.reviews;
                    that.aspects = response.aspects;
                    that.aspects_detailed = response.aspects_detailed.sort(function (a, b) {
                        if (a.mentions > b.mentions) {
                            return -1;
                        }
                        else if (a.mentions === b.mentions) {
                            return 0;
                        }
                        else if (a.mentions < b.mentions) {
                            return 1;
                        }

                    });
                });
            that.$forceUpdate()
        },
        filter: function (aspect, sentiment) {
            console.log(aspect, sentiment);
            this.reviews.forEach(function (review) {
                review.sentences.forEach(function (el) {

                    if (sentiment === 'All') {
                        if (aspect === 'All') {
                            el.sentiment_marked = el.sentiment;
                        }
                        else if (aspect === el.aspect) {
                            el.sentiment_marked = el.sentiment;
                        }
                    }

                    if (aspect === 'All' && sentiment === el.sentiment) {
                        el.sentiment_marked = el.sentiment;
                    }
                    else if (aspect === el.aspect && sentiment === el.sentiment) el.sentiment_marked = el.sentiment;
                });
            });
            this.$forceUpdate()
        },
        reset: function () {
            this.reviews.forEach(function (review) {
                review.sentences.forEach(function (el) {
                    el.sentiment_marked = null;
                });
            });
            this.$forceUpdate()
        }
    }
});
