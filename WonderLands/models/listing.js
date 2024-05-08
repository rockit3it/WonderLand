const mongoose = require("mongoose");
const Review = require("./review");
const User = require("./user");
const { Schema } = mongoose;

const listingSchema = new Schema(
    {
        title : {
            type : String,
            required : true
        },
        description : String,
        image : {
            filename : {
                type : String,
                default : "listing image"
            },
           url : {
            type : String,
            default : "https://www.wallpapers13.com/wp-content/uploads/2015/12/Nature-Lake-Bled.-Desktop-background-image-1680x1050.jpg",
            set : 
            (v) => v === "" ? "https://www.wallpapers13.com/wp-content/uploads/2015/12/Nature-Lake-Bled.-Desktop-background-image-1680x1050.jpg" : v,
           },
        },
        price : Number,
        location : String,
        country : String,
        reviews:[
            {
                type : Schema.Types.ObjectId,
                ref : "Review",
            }
        ],
        owner : {
            type: Schema.Types.ObjectId,
            ref : "User",
        }
    }
)
listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;