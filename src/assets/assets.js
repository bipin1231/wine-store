import black_label from "./black_label.jpeg"
import red_label from "./red_label.jpeg"
import jp_chenet from "./jp_chenet.jpeg"

import red_wine from "./red_wine.jpeg"
import white_wine from "./white_wine.jpeg"
import whisky from "./whisky.jpg"
import beer from "./beer.jpg"
import rum from "./rum.jpeg"
import vodka from "./vodka.jpg"

export const products=[
  {
      id:"1",
      name:"Black Label",
      description:"lkdasdkasdalk",
      price:1000,
      image:[black_label],
      type:"Whisky",
      origin:"Imported"

},
  {
      id:"2",
      name:"Red Label",
      description:"lkdasdkasdalk",
      price:1000,
      image:[red_label],
      type:"Whisky",
      origin:"Imported"
},
  {
      id:"3",
      name:"JP Chenet",
      description:"lkddasasdkasdalk",
      price:1900,
      image:[jp_chenet],
      type:"Red Wine",
      origin:"Imported"
},
]

export const collection=[
  { id: 1, name: "Red Wines", description: "Bold and robust flavors", image: red_wine, count: 45 },
  { id: 2, name: "White Wines", description: "Crisp and refreshing varieties", image: white_wine, count: 38 },
  { id:3,name:"Whisky",description:"Smooth and Creamy",image:whisky,count:21},
  { id:4,name:"Vodka",description:"Smooth and Creamy",image:vodka,count:21},
  { id:5,name:"Rum",description:"Smooth and Creamy",image:rum,count:21},
  { id:6,name:"Beer",description:"Smooth and Creamy",image:beer,count:21},
]

export const categories=[
  {
    id:1,
    name:"Wine",
    subCategories:["Red Wine","White Wine","Imported","Domestic"]
  },
  {
    id:2,
    name:"Whisky",
    subCategories:["Imported","Domestic"]
  },
  {
    id:2,
    name:"Beer",
    subCategories:["Imported","Domestic"]
  },
]