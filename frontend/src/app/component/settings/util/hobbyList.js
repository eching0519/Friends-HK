import React, { useState } from 'react'
import $ from 'jquery';

const HobbyList = (props) => {
    let hobbyListData = {"Hiking": 0, "Backpacking": 0, "Camping": 0, "Hunting": 0, "Fishing": 0, "Archery": 0, "Canoeing": 0, "Kayaking": 0, "Running": 0, "Geocaching": 0, "Growing Vegetables": 0, "Composting": 0, "Metal Detecting": 0, "Bird Watching": 0, "Beekeeping": 0, "LARPing": 0, "Parkour": 0, "Astronomy": 0, "Meteorology": 0, "Kite Flying": 0, "Sand Castle Making": 0, "Hobby Horsing": 0, "Antiquing": 0, "Rock Tumbling": 0, "Cooking": 0, "Baking": 0, "Home Brewing": 0, "Wine Making": 0, "Mixology": 0, "Bread Making": 0, "Cheese Making": 0, "Sewing": 0, "Painting": 0, "Drawing": 0, "Origami": 0, "Photography": 0, "Scrapbooking": 0, "Calligraphy": 0, "Quilting": 0, "Crocheting": 0, "Knitting": 0, "Embroidery": 0, "Weaving": 0, "Designing Clothes": 0, "Making Clothes": 0, "Jewelry Making": 0, "Pottery": 0, "Metal Working": 0, "Wood Carving": 0, "Welding": 0, "Leather Tooling": 0, "Cobbling": 0, "Model Railroads": 0, "Furniture Building": 0, "Home Improvement": 0, "Model Building": 0, "LEGO": 0, "Trivia": 0, "Video Games": 0, "Board Games": 0, "Card Games": 0, "Chess": 0, "Puzzles": 0, "Juggling": 0, "Table Tennis": 0, "Billiards": 0, "Genealogy": 0, "Language Learning": 0, "Journaling": 0, "Creative Writing": 0, "Book Club": 0, "Home Science Experiments": 0, "Wikipedia Editing": 0, "Volunteering": 0, "Piano": 0, "Guitar": 0, "Violin": 0, "Drums": 0, "Saxophone": 0, "Flute": 0, "Cello": 0, "Clarinet": 0, "Trumpet": 0, "Harp": 0, "Podcast Hosting": 0, "Amateur Radio": 0, "Thrifting": 0, "Makeup": 0, "Dancing": 0, "Hula Hooping": 0, "Aquarium Keeping": 0, "Computer Programming": 0, "Working on Cars": 0, "Travel": 0, "Cosplaying": 0, "Survivalist Prepping": 0, "Scuba Diving": 0, "Mountain Biking": 0, "Coffee Roasting": 0, "Anime": 0, "Comics": 0};
    
    if (props.hobbies != null)
        for (let i = 0; i < props.hobbies.length; i++) {
            let hobby = props.hobbies[i]
            hobbyListData[hobby] = 1
        }

    return (
        <>
            {Object.keys(hobbyListData).map((key) => (hobbyListData[key]===1)? (<option value={key} selected>{key}</option>) : (<option value={key}>{key}</option>) )}
        </>
    )
}

export default HobbyList;