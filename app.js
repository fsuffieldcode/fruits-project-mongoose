const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true })

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified"],
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit ({
//     rating: 34,
//     review: "Pretty solid as a fruit"
// });

// fruit.save();

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

// const plum = new Fruit ({
//     name: "Plum",
//     score: 10,
//     review: "Amazing fruit."
// });

// plum.save();

Person.updateOne({ name: 'John' }, { favouriteFruit: plum }, function(err){
    if(err) {
        console.log(err);
    } else {
        console.log("Successfully updated entry");
    }
});

  const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Find some documents
    collection.find({}).toArray(function(err, fruits) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(fruits)
      callback(fruits);
    });
  }

  Fruit.find(function(err, fruits){
      if (err) {
          console.log(err);
      } else {

        mongoose.connection.close();

        fruits.forEach(function(el) {
            console.log(el.name);
        });
      }
  });


// Person.deleteMany({name: "John"}, function(err) {
//     if(err) {
//         console.log(err)
//     } else {
//         console.log("Successfully deleted");
//     }
// });