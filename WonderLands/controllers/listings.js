 // this controllers comes under mvc that is model, view, controller
 
 const Listing = require("../models/listing");
module.exports.index = async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.create = async (req,res)=>{
    res.render("listings/addListing.ejs");
 };

module.exports.show = async (req,res)=>{
    const {id} = req.params;
    const idData = await Listing.findById(id)
    .populate({path : "reviews",
    populate : {
        path : "author"
    },
})

.populate("owner");
    if(!idData){
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/listings");
    }
    console.log(idData);
    res.render("listings/show.ejs",{listing : idData});
};


module.exports.save = async (req, res, next)=>{
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user.id;
    await newListing.save();
    req.flash("success", "New Listing Created");
     res.redirect("/listings");
 };

module.exports.destroy = async(req, res)=>{
    const {id} = req.params;
    await Listing.findOneAndDelete({ _id: id}).then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect("/listings");
};

module.exports.edit = async(req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
};

module.exports.update = async(req,res, next)=>{
    let {id} = req.params;
    const listing = await Listing.findById()
    const data = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect("/listings");
};