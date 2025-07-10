import mongoose from "mongoose";

const slideShowSchema = mongoose.Schema({
    title: { type: String, require: true, default: 'empty' },
    description: { type: String, require: true, default: 'empty' },
    category: { type: String, require: true, default: 'empty' },
    imgSrc: { type: String, require: true, default: 'empty' },
    videoSrc: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },

});

export const SlideShowModel = mongoose.model('slideshow', slideShowSchema);